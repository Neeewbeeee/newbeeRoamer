import * as Three from 'three';
import * as Cesium from 'cesium';
import { Cartesian3 } from "cesium";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import "/node_modules/cesium/Build/Cesium/Widgets/widgets.css";
import * as jQuery from 'jquery';
import { Ellipsoid, Entity, JulianDate } from "cesium";
(window as any).CESIUM_BASE_URL = 'cesium/Build/Cesium/';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzU2N2VmNC03YTBlLTQ1N2MtYmVjMS02NTIwY2VkYmYxNzUiLCJpZCI6ODczNDcsImlhdCI6MTY1Mjg3ODExOH0.6Vb1a1qh6qoVcJpWzcQe2Bd63HLtyrlmUkILApbH4mI';

export function useRoamer() {

    return {
        init: (threeContainerId: string, cesiumContainerId: string) => {


            //创建`Cesium`显示器（地球组件）
            const viewer = new Cesium.Viewer(cesiumContainerId, {
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                }),
                baseLayerPicker: false,
                shouldAnimate: true,
                timeline: false,
                animation: false,

            });

            // viewer.camera.setView({
            //     // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
            //     // fromDegrees()方法，将经纬度和高程转换为世界坐标
            //     destination: Cesium.Cartesian3.fromDegrees(112.962475, 28.195802, 1500)
            //
            // });
            const cesiumCamera = viewer.camera;



            // begin ===========================ThreeJS与Cesium相机同步部分===============================

            //创建three.js显示器
            const scene3js = new Three.Scene();
            const camera3js = new Three.PerspectiveCamera(50, 1, 1, 1e8);
            const renderer3js = new Three.WebGLRenderer({
                alpha: true,
                canvas: document.getElementById(threeContainerId),
            });

            const resizeHanlder = () => {
                const threeContainerElem = document.getElementById(threeContainerId);
                const parentElem = threeContainerElem.parentElement;
                renderer3js.setSize(parentElem.offsetWidth, parentElem.offsetHeight);

                camera3js.fov = camera3js.aspect >= 1 ? 60 / (0.95 * camera3js.aspect) : 60;
            };

            window.addEventListener('resize', resizeHanlder);

            resizeHanlder();

            const threeContainer = document.getElementById(threeContainerId);
            // threeContainer.style.width = '800px';
            // threeContainer.style.height = '800px';

            //添加坐标轴辅助线
            scene3js.add(new Three.AxesHelper(1e10));
            // 旋转世界坐标系
            const toRad = (deg: number) => deg / 180 * 3.1415926535;
            const rotationMatrix = new Three.Matrix4().makeRotationFromEuler(new Three.Euler(toRad(90), 0, toRad(90), "ZYX")).invert();
            scene3js.applyMatrix4(rotationMatrix);

            //添加光源
            const light = new Three.PointLight(0xffffff, 1, 1e8, 1);
            // document.getElementById('light').oninput = (ev) => {
            //     light.position.y = (ev.target as any).value;
            // };
            camera3js.add(light);
            scene3js.add(camera3js);

            // FOV  测试
            // document.getElementById('fov').oninput = (ev) => {
            //     camera3js.fov = (ev.target as any).value;
            //     camera3js.updateProjectionMatrix();
            // }

            // 创建世界变换矩阵，设置整个three.js场景在地球上的位置、旋转、缩放等参数。
            // 这里将用武汉的坐标作为演示与测试
            const origin = Cesium.Cartesian3.fromDegrees(114.61667932721321, 30.81667546115, 0);
            // 这里不用eastNorthUpToFixedFrame是因为three.js场景默认y轴朝上
            const modelMatrix = Cesium.Transforms.northUpEastToFixedFrame(origin);

            const origin2 = Cesium.Cartesian3.fromDegrees(114.71667932721321, 30.9, 0);
            // 这里不用eastNorthUpToFixedFrame是因为three.js场景默认y轴朝上
            const modelMatrix2 = Cesium.Transforms.northUpEastToFixedFrame(origin2);


            // 使用世界变换矩阵构建局部坐标系
            const referenceFrame = {
                /**
                 * 从three.js相机到`Cesium`相机转换时使用
                 */
                matrix: modelMatrix,
                /**
                 * 从`Cesium`相机到three.js相机转换时使用。
                 * 如果modelMatrix不变，则逆矩阵可以不给定；modelMatrix变化时需要同时更新逆矩阵
                 */
                inverseMatrix: Cesium.Matrix4.inverseTransformation(modelMatrix, new Cesium.Matrix4())
            };

            // end ===========================ThreeJS与Cesium相机同步部分===============================


            // 加载模型，将模型定位到目标位置（模型变换）
            // const geometry = new Three.TorusKnotBufferGeometry(1e4, 320, 128);
            // const material = new Three.MeshStandardMaterial({
            //     color: 'gray'
            // });
            // geometry.computeBoundingSphere();
            // const mesh = new Three.Mesh(geometry, material);
            // mesh.applyMatrix4(convertMatrix2Three(modelMatrix));
            // scene3js.add(mesh);


            // begin =========================ThreeJS室内导航部分=======================================

            // 测试加载一个正方体，位置不会发生改变
            // 这里用来控制视角
            const geometry = new Three.BoxGeometry(1000, 1000, 1000);
            const material = new Three.MeshStandardMaterial({
                color: 'red'
            });
            geometry.computeBoundingSphere();
            const mesh = new Three.Mesh(geometry, material);
            mesh.visible = false
            mesh.applyMatrix4(convertMatrix2Three(modelMatrix));
            scene3js.add(mesh);


            const material_line = new Three.LineBasicMaterial({ color: 'red', linewidth: 50 });

            //这里用这个构造
            const geometry_line = new Three.BufferGeometry()
            const pointsArray: Three.Vector3[] = [];

            const scale_control = new Three.Vector3(50, 50, 50)

            // 红色是x,绿色是y,蓝色是z

            const point1 = new Three.Vector3(12 * scale_control.x, 1 * scale_control.y, -2.5 * scale_control.z)
            const point2 = new Three.Vector3(4 * scale_control.x, 1 * scale_control.x, -2.5 * scale_control.x)
            const point3 = new Three.Vector3(4 * scale_control.x, 1 * scale_control.x, -4 * scale_control.x)
            const point4 = new Three.Vector3(1 * scale_control.x, 2.5 * scale_control.x, -4 * scale_control.x)
            const point5 = new Three.Vector3(1 * scale_control.x, 2.5 * scale_control.x, -2.7 * scale_control.x)
            const point6 = new Three.Vector3(5.5 * scale_control.x, 4 * scale_control.x, -2.7 * scale_control.x)
            const point7 = new Three.Vector3(5.5 * scale_control.x, 4 * scale_control.x, -5 * scale_control.x)
            const point8 = new Three.Vector3(7.5 * scale_control.x, 4 * scale_control.x, -5 * scale_control.x)
            const point9 = new Three.Vector3(7.5 * scale_control.x, 4 * scale_control.x, -3 * scale_control.x)
            const point10 = new Three.Vector3(9.5 * scale_control.x, 4 * scale_control.x, -3 * scale_control.x)

            pointsArray.push(point1)
            pointsArray.push(point2)
            pointsArray.push(point3)
            pointsArray.push(point4)
            pointsArray.push(point5)
            pointsArray.push(point6)
            pointsArray.push(point7)
            pointsArray.push(point8)
            pointsArray.push(point9)
            pointsArray.push(point10)





            //用这个api传入顶点数组
            geometry_line.setFromPoints(pointsArray)
            const line = new Three.Line(geometry_line, material_line);
            line.applyMatrix4(convertMatrix2Three(modelMatrix))
            scene3js.add(line);


            //加载三维模型
            new GLTFLoader().load(require('../assets/house3/out.gltf'), (glb) => {
                glb.scene.scale.set(scale_control.x, scale_control.y, scale_control.z)

                const scene = glb.scene;

                // console.log(glb)
                scene.applyMatrix4(convertMatrix2Three(modelMatrix));
                // console.log(glb)
                scene3js.add(glb.scene);
            }, undefined, (event) => {
                console.log(event);
            });

            new GLTFLoader().load(require('../assets/house2/house2.glb'), (glb2) => {
                glb2.scene.scale.set(0.02, 0.02, 0.02)

                const scene = glb2.scene;

                // console.log(glb)
                scene.applyMatrix4(convertMatrix2Three(modelMatrix2));
                // console.log(glb)
                scene3js.add(glb2.scene);
            }, undefined, (event) => {
                console.log(event);
            });




            function transformPoint(transformMatrix: Cesium.Matrix4, point: number[]) {
                return Cesium.Matrix4.multiplyByPoint(transformMatrix, new Cesium.Cartesian3(...point), new Cesium.Cartesian3());
            }

            function convertMatrix2Three(cesiumMat: Cesium.Matrix4) {
                return new Three.Matrix4().fromArray(Cesium.Matrix4.toArray(cesiumMat));
            }

            function convertMatrix2Cesium(threeMat: Three.Matrix4) {
                return Cesium.Matrix4.fromArray(threeMat.toArray());
            }


            function getHeading(pointA: Cesium.Cartesian3, pointB: Cesium.Cartesian3): number {
                //建立以点A为原点，X轴为east,Y轴为north,Z轴朝上的坐标系
                const transform = Cesium.Transforms.eastNorthUpToFixedFrame(pointA);
                //向量AB
                const positionvector = Cesium.Cartesian3.subtract(pointB, pointA, new Cesium.Cartesian3());
                //因transform是将A为原点的eastNorthUp坐标系中的点转换到世界坐标系的矩阵
                //AB为世界坐标中的向量
                //因此将AB向量转换为A原点坐标系中的向量，需乘以transform的逆矩阵。
                const vector = Cesium.Matrix4.multiplyByPointAsVector(Cesium.Matrix4.inverse(transform, new Cesium.Matrix4()), positionvector, new Cesium.Cartesian3());
                //归一化
                const direction = Cesium.Cartesian3.normalize(vector, new Cesium.Cartesian3());
                //heading
                const heading = Math.atan2(direction.y, direction.x) - Cesium.Math.PI_OVER_TWO;
                return Cesium.Math.TWO_PI - Cesium.Math.zeroToTwoPi(heading);
            }

            function getPitch(pointA: Cesium.Cartesian3, pointB: Cesium.Cartesian3): number {
                let transfrom = Cesium.Transforms.eastNorthUpToFixedFrame(pointA);
                const vector = Cesium.Cartesian3.subtract(pointB, pointA, new Cesium.Cartesian3());
                let direction = Cesium.Matrix4.multiplyByPointAsVector(Cesium.Matrix4.inverse(transfrom, transfrom), vector, vector);
                Cesium.Cartesian3.normalize(direction, direction);
                //因为direction已归一化，斜边长度等于1，所以余弦函数等于direction.z
                return Cesium.Math.PI_OVER_TWO - Cesium.Math.acosClamped(direction.z);
            }

            const virtualEntity = [
                {
                    "id": "document",
                    "name": "CZML Path",
                    "version": "1.0",
                    "clock": {
                        "interval": "2020-08-04T10:00:00Z/2020-08-04T10:01:40Z",
                        "currentTime": "2020-08-04T10:00:00Z",
                        "multiplier": 3
                    }
                },
                {
                    billboard: {
                        image:
                            "data:image/png;base64,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",
                        scale: 100,
                    }
                },
                {
                    "id": "path",
                    "name": "path with GPS flight data",
                    "position": {
                        "epoch": "2020-08-04T10:00:00Z",
                        "cartographicDegrees": [
                            0
                        ]
                    }
                },
            ]




            let flyEntity: Entity
            let step = 0

            function setRoamView() {

                if (flyEntity) {
                    console.log(flyEntity)

                    const center = flyEntity.position.getValue(viewer.clock.currentTime)
                    console.log(viewer.clock.currentTime)
                    const tobelook = new JulianDate()
                    Cesium.JulianDate.addSeconds(viewer.clock.currentTime, 3, tobelook)
                    console.log(tobelook)

                    const target = flyEntity.position.getValue(tobelook)
                    if (viewer.clock.shouldAnimate) {
                        if (center) {
                            console.log(center)
                            console.log(target)
                            const vector = new Cesium.Cartesian3(center.x - target.x, center.y - target.y, center.z - target.z)
                            console.log(typeof (getHeading(target, center)))
                            viewer.camera.setView({
                                destination: center,
                                orientation: {
                                    heading: getHeading(center, target), // east, default value is 0.0 (north)
                                    pitch: getPitch(center, target),    // default value (looking down)
                                    roll: 0.0                             // default value
                                }
                            })
                        }
                    }
                }
            }


            function CameraRoamer() {
                viewer.dataSources.add(Cesium.CzmlDataSource.load(virtualEntity)).then((ds) => {
                    flyEntity = ds.entities.getById('path')
                })
            }

            function loadPathData(pointset: any) {

                const Cposition = cesiumCamera.position
                const trans_camera = Cesium.Cartographic.fromCartesian(Cposition, Ellipsoid.WGS84)
                let cartesianTolng = Cesium.Math.toDegrees(trans_camera.longitude)
                let cartesianTolat = Cesium.Math.toDegrees(trans_camera.latitude)
                virtualEntity[2].position.cartographicDegrees.push(cartesianTolng)
                virtualEntity[2].position.cartographicDegrees.push(cartesianTolat)
                virtualEntity[2].position.cartographicDegrees.push(trans_camera.height)

                for (let i = 0; i < pointset.length; i++) {
                    virtualEntity[2].position.cartographicDegrees.push((i + 1) * 10)
                    const controlpoint1 = pointset[i];
                    const trans1 = transformPoint(modelMatrix, controlpoint1)
                    const trans_latlon1 = Cesium.Cartographic.fromCartesian(trans1, Ellipsoid.WGS84)
                    let cartesianTolng = Cesium.Math.toDegrees(trans_latlon1.longitude)
                    let cartesianTolat = Cesium.Math.toDegrees(trans_latlon1.latitude)
                    virtualEntity[2].position.cartographicDegrees.push(cartesianTolng)
                    virtualEntity[2].position.cartographicDegrees.push(cartesianTolat)
                    virtualEntity[2].position.cartographicDegrees.push(trans_latlon1.height)
                }
                const lastpoint = pointset[pointset.length - 2]
                const endpoint = pointset[pointset.length - 1]
                const add_x = endpoint.x - lastpoint.x
                const add_y = endpoint.y - lastpoint.y
                const add_z = endpoint.z - lastpoint.z
                const temp = new Three.Vector3(endpoint.x + add_x, endpoint.y + add_y, endpoint.z + add_z)
                pointsArray.push(temp)
                const controlpoint1 = pointset[pointset.length - 1]
                const trans1 = transformPoint(modelMatrix, controlpoint1)
                const trans_latlon1 = Cesium.Cartographic.fromCartesian(trans1, Ellipsoid.WGS84)
                let cartesianTolngtem = Cesium.Math.toDegrees(trans_latlon1.longitude)
                let cartesianTolagtem = Cesium.Math.toDegrees(trans_latlon1.latitude)
                virtualEntity[2].position.cartographicDegrees.push(pointset.length * 10)
                virtualEntity[2].position.cartographicDegrees.push(cartesianTolngtem)
                virtualEntity[2].position.cartographicDegrees.push(cartesianTolagtem)
                virtualEntity[2].position.cartographicDegrees.push(trans_latlon1.height)
                console.log(virtualEntity[1])
            }




            // 绘制本地坐标系的坐标轴线
            function computeCircle(radius: number) {
                const positions = [];
                for (let i = 0; i < 360; i++) {
                    const radians = Cesium.Math.toRadians(i);
                    positions.push(
                        new Cesium.Cartesian2(
                            radius * Math.cos(radians),
                            radius * Math.sin(radians)
                        )
                    );
                }
                return positions;
            }
            // viewer.entities.add({
            // 	name: 'x',
            // 	position: Cesium.Cartesian3.fromDegrees(0, 0, 0),
            // 	cylinder: {
            // 		material: Cesium.Color.RED.withAlpha(0.5),
            // 		length: 1e7,
            // 		topRadius: 1e5,
            // 		bottomRadius: 1e5
            // 	}
            // })
            // viewer.entities.add({
            // 	name: 'y',
            // 	position: Cesium.Cartesian3.fromDegrees(90, 0, 0),
            // 	cylinder: {
            // 		material: Cesium.Color.GREEN.withAlpha(0.5),
            // 		length: 1e7,
            // 		topRadius: 1e5,
            // 		bottomRadius: 1e5
            // 	}
            // })
            // viewer.entities.add({
            // 	name: 'z',
            // 	position: Cesium.Cartesian3.fromDegrees(0, 90, 0),
            // 	cylinder: {
            // 		material: Cesium.Color.BLUE.withAlpha(0.5),
            // 		length: 1e7,
            // 		topRadius: 1e5,
            // 		bottomRadius: 1e5
            // 	}
            // });
            //
            //
            // // 绘制本地坐标系的坐标轴线
            // viewer.entities.add({
            // 	name: 'x',
            // 	polylineVolume: {
            // 		positions: [transformPoint(modelMatrix, [0, 0, 0]), transformPoint(modelMatrix, [1e5, 0, 0])],
            // 		cornerType: Cesium.CornerType.BEVELED,
            // 		material: Cesium.Color.RED.withAlpha(0.5),
            // 		shape: computeCircle(100),
            // 	}
            // })
            // viewer.entities.add({
            // 	name: 'y',
            // 	polylineVolume: {
            // 		positions: [transformPoint(modelMatrix, [0, 0, 0]), transformPoint(modelMatrix, [0, 1e5, 0])],
            // 		cornerType: Cesium.CornerType.BEVELED,
            // 		material: Cesium.Color.GREEN.withAlpha(0.5),
            //
            // 		shape: computeCircle(100)
            // 	}
            // })
            // viewer.entities.add({
            // 	name: 'z',
            // 	polylineVolume: {
            // 		positions: [transformPoint(modelMatrix, [0, 0, 0]), transformPoint(modelMatrix, [0, 0, 1e5])],
            // 		cornerType: Cesium.CornerType.BEVELED,
            // 		material: Cesium.Color.BLUE.withAlpha(0.5),
            // 		shape: computeCircle(100)
            // 	}
            // })



            function syncThreejsCamera2Cesium() {
                // 同步视图矩阵
                // 获取相机视图矩阵
                const cvm = convertMatrix2Three(cesiumCamera.inverseViewMatrix);
                // 设置相机平移和旋转参数
                camera3js.position.setFromMatrixPosition(cvm);
                camera3js.rotation.setFromRotationMatrix(cvm);
            }


            let lastTime = 0;
            viewer.scene.preRender.addEventListener(() => {
                syncThreejsCamera2Cesium();

                if (Date.now() - lastTime > 2 * 1000) {
                    lastTime = Date.now();

                    // console.log("3js aspect:", camera3js.aspect);
                    //
                    // console.log("3js fov:", camera3js.fov);
                }


                threeContainer.style.width = `${window.innerWidth}px`;
                threeContainer.style.height = `${window.innerHeight}px`;
                camera3js.aspect = (cesiumCamera.frustum as any).aspectRatio;
                camera3js.fov = camera3js.aspect >= 1 ? 60 / (0.95 * camera3js.aspect) : 60;
                camera3js.updateProjectionMatrix();

                //执行three.js场景渲染
                renderer3js.render(scene3js, camera3js);
            })

            document.addEventListener('keydown', (ev) => {
                const moveSpeed = cesiumCamera.positionCartographic.height * 0.05;
                console.log(moveSpeed);
                console.log(ev.key)
                switch (ev.key) {
                    case 'w':
                    case 'W':
                        cesiumCamera.moveForward(moveSpeed);
                        break;

                    case 'a':
                    case 'A':
                        cesiumCamera.moveLeft(moveSpeed);
                        break;

                    case 's':
                    case 'S':
                        cesiumCamera.moveBackward(moveSpeed);
                        break;

                    case 'd':
                    case 'D':
                        cesiumCamera.moveRight(moveSpeed);
                        break;
                    case "m":
                    case "M":
                        console.log(cesiumCamera.position)
                        loadPathData(pointsArray)
                        CameraRoamer()
                        viewer.scene.preUpdate.addEventListener(setRoamView)
                        // step = step+1;
                        break;
                    case "q":
                    case "Q":
                        cesiumCamera.lookLeft()
                        break;
                    case "e":
                    case "E":
                        cesiumCamera.lookRight()
                        break;
                    case "z":
                    case "Z":
                        cesiumCamera.lookDown()
                        break;
                    case "x":
                    case "X":
                        cesiumCamera.lookUp()
                        break;
                    case "c":
                    case "C":
                        viewer.clock.shouldAnimate = !viewer.clock.shouldAnimate

                        break;
                    case "n":
                    case "N":
                        viewer.trackedEntity = null
                        viewer.scene.preUpdate.removeEventListener(setRoamView)

                        // virtualEntity
                        break;
                    // case "q":
                    // case "Q":
                    // 	console.log(viewer.clock.currentTime)
                    // 	break;
                }
            });

            viewer.scene.screenSpaceCameraController.enableLook = true;


            //将`Cesium`相机定位到three.js场景
            const boundingSphere = Cesium.BoundingSphere.clone(geometry.boundingSphere as any);
            Cesium.Matrix4.multiplyByPoint(modelMatrix, boundingSphere.center, boundingSphere.center);
            viewer.camera.flyToBoundingSphere(boundingSphere, {
                duration: 0.2
            })

            // viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(0, 0, 100000), duration: 0.1 })

            // 测试代码 可去
            // let btn = document.getElementById("roamerstarter")
            // btn.addEventListener('click',()=>{
            // 	const controlpoint1 = pointsArray[1];
            // 	const trans1 = transformPoint(modelMatrix,controlpoint1)
            // 	const controlpoint2 = pointsArray[2];
            // 	const trans2 = transformPoint(modelMatrix,controlpoint2)
            // 	cesiumCamera.flyTo({destination:trans1,
            // 		orientation : {
            // 			direction :trans2,
            //
            // 		}})
            // 	console.log(cesiumCamera.position)
            // })

            function sleep(delay: any) {
                let start = new Date().getTime();
                while (new Date().getTime() < start + delay);
            }
            //usage
            //wait for 3 seconds



            // begin ===================Cesium室外导航部分================================

            //坐标转换==================================
            let x_PI = 3.14159265358 * 3000.0 / 180.0;
            let PI = 3.1415926535;
            let a = 6378245.0;
            let ee = 0.0066934216;
            function transformWD(lng: any, lat: any) {
                let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
                ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
                ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
                ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
                return ret;
            }
            function transformJD(lng: any, lat: any) {
                let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
                ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
                ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
                ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
                return ret;
            }
            function wgs2gcj(arrdata: any) {
                let lng = Number(arrdata[0]);
                let lat = Number(arrdata[1]);
                let dlat = transformWD(lng - 105.0, lat - 35.0);
                let dlng = transformJD(lng - 105.0, lat - 35.0);
                let radlat = lat / 180.0 * PI;
                let magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                let sqrtmagic = Math.sqrt(magic);
                dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
                dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
                let mglat = lat + dlat;
                let mglng = lng + dlng;

                mglng = Number(mglng.toFixed(6));
                mglat = Number(mglat.toFixed(6));
                return [mglng, mglat];

            }
            function gcj2wgs(arrdata: any) {
                let lng = Number(arrdata[0]);
                let lat = Number(arrdata[1]);
                let dlat = transformWD(lng - 105.0, lat - 35.0);
                let dlng = transformJD(lng - 105.0, lat - 35.0);
                let radlat = lat / 180.0 * PI;
                let magic = Math.sin(radlat);
                magic = 1 - ee * magic * magic;
                let sqrtmagic = Math.sqrt(magic);
                dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
                dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);

                let mglat = lat + dlat;
                let mglng = lng + dlng;

                let jd = lng * 2 - mglng;
                let wd = lat * 2 - mglat;

                jd = Number(jd.toFixed(6));
                wd = Number(wd.toFixed(6));
                return [jd, wd];

            }
            function getCatesian3FromPX(px: any, entity: any) {
                let pick = viewer.scene.pick(px);
                let cartesian;
                let drillPick = viewer.scene.drillPick(px);
                let truePick = null;
                if (entity) {
                    for (let i = 0; i < drillPick.length; i++) {
                        if (drillPick[i].id._id != entity.id) {
                            truePick = drillPick[i].id;
                            break;
                        }
                    }
                } else {
                    truePick = pick;
                }
                if (viewer.scene.pickPositionSupported && Cesium.defined(truePick)) {
                    cartesian = viewer.scene.pickPosition(px);
                } else {
                    let ray = viewer.camera.getPickRay(px);
                    if (!ray) return;
                    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                }
                return cartesian;
            }

            function cartesianToLnglat(cartesian: any, isToWgs84: any) {
                if (!cartesian) return;
                let ellipsoid = viewer.scene.globe.ellipsoid;
                let lnglat = ellipsoid.cartesianToCartographic(cartesian);
                //let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                if (isToWgs84) {
                    let lat = Cesium.Math.toDegrees(lnglat.latitude);
                    let lng = Cesium.Math.toDegrees(lnglat.longitude);
                    let hei = lnglat.height;
                    return [lng, lat, hei];
                } else {
                    return [lnglat.longitude, lnglat.latitude, lnglat.height];
                }

            }

            // 经纬度转世界坐标 [101,40]
            function lnglatToCartesian(lnglat: any) {
                if (!lnglat) return null;
                return Cesium.Cartesian3.fromDegrees(lnglat[0], lnglat[1], lnglat[2] || 0);
            }

            function lnglatArrToCartesianArr(lnglatArr: any) {
                if (!lnglatArr) return [];
                let arr = [];
                for (let i = 0; i < lnglatArr.length; i++) {
                    arr.push(lnglatToCartesian(lnglatArr[i]));
                }
                return arr;
            }

            // 坐标处理
            class searchRoute {
                startP: any
                endP: any
                constructor(startp: any, endp: any) {
                    this.startP = startp;
                    this.endP = endp;
                }
                start(opt: any) {
                    let startP = wgs2gcj(this.startP);
                    let endP = wgs2gcj(this.endP);
                    console.log(startP)
                    console.log(endP)
                    jQuery.ajax({
                        // url: "http://restapi.amap.com/v3/direction/driving",
                        // type: "GET",
                        // dataType: "jsonp",
                        // timeout: "5000",
                        // contentType: "application/json;utf-8",
                        // data: {
                        // 	"output": "json",
                        // 	"extensions": "all",
                        // 	"key": "230e1d4baa0020039c7dbec6f2863700",  // https://lbs.amap.com/api/webservice/guide/api/direction
                        // 	"origin": startP[0] + "," + startP[1],
                        // 	"destination": endP[0] + "," + endP[1],
                        // 	"strategy": opt.strategy || 10
                        // },
                        type: "GET",
                        url: "http://restapi.amap.com/v3/direction/driving?output=JSON&origin=" + startP[0] + "," + startP[1] + "&destination=" + endP[0] + "," + endP[1] + "&key=" + "230e1d4baa0020039c7dbec6f2863700",
                        success: function (json: any) {
                            // 由于线涉及坐标较多 此处返回的坐标 未转为wgs84
                            let data = "";

                            if (!json || !json.route || !json.route.paths) {
                                data = "0";
                            }
                            else {
                                data = json.route.paths;
                            }
                            opt.callback(data);
                        },
                        error: function (data: any) { }
                    });
                }
            }

            // 处理用户输入事件。可以添加自定义功能以在以下位置执行当用户输入输入时。
            let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas); // viewer.scene.canvas => 用于为其创建场景的HTML canvas元素。
            let isClickAgain = false;
            let Start: any = null;
            let End: any = null;

            // 鼠标左键单击开始绘制
            handler.setInputAction(function (evt) {
                // 返回具有' primitive'属性的对象，该对象包含场景中的第一个（顶部）基本体在特定的窗口坐标处；
                let pick = viewer.scene.pick(evt.position);
                let cartesian = getCatesian3FromPX(evt.position, viewer);
                if (!isClickAgain) {
                    isClickAgain = true;
                    Start = viewer.entities.add({ // 起始点
                        name: "图标点",
                        position: cartesian,
                        billboard: {
                            image: require('../assets/qidian.svg'),
                            scale: 0.3,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                    return;
                }
                if (isClickAgain) {
                    End = viewer.entities.add({ // 结束点
                        name: "图标点",
                        position: cartesian,
                        billboard: {
                            image: require('../assets/zhongdian.svg'),
                            scale: 0.3,
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        }
                    });
                    showRes(Start.position._value, End.position._value);
                    handler.destroy();
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // 访问高德接口
            function showRes(start: any, end: any) {
                if (!start || !end) return;
                console.log(start)
                let startp = cartesianToLnglat(start, true);
                let endP = cartesianToLnglat(end, true);
                let search = new searchRoute([startp[0], startp[1]], [endP[0], endP[1]]);
                search.start({
                    strategy: 11,
                    callback: function (data: any) {
                        addRouteLine(data[0]);
                    }
                })


            }

            function addRouteLine(res: any) {
                let arr = [];
                let steps = res.steps;
                for (let i = 0; i < steps.length; i++) {
                    let item = steps[i];
                    let positionStr = item.polyline;
                    let strArr = positionStr.split(";");
                    for (let z = 0; z < strArr.length; z++) {
                        let item2 = strArr[z];
                        let strArr2 = item2.split(",");
                        let p = gcj2wgs(strArr2);
                        arr.push(p);
                    }
                }
                let cartesians = lnglatArrToCartesianArr(arr);
                let line = viewer.entities.add({
                    polyline: {
                        positions: cartesians,
                        clampToGround: true,
                        material: Cesium.Color.RED.withAlpha(1),
                        width: 3
                    }
                });
                moveOnRoute(line);

            }
            //汽车移动=========================
            let qicheModel: Cesium.Entity = null;
            function moveOnRoute(lineEntity: any) {
                if (!lineEntity) return;
                let positions = lineEntity.polyline.positions.getValue();
                if (!positions) return;
                let allDis = 0;
                for (let index = 0; index < positions.length - 1; index++) {
                    let dis = Cesium.Cartesian3.distance(positions[index], positions[index + 1]);
                    allDis += dis;
                }
                let playTime = 10;
                let v = allDis / playTime;
                let startTime = viewer.clock.currentTime;
                let endTime = Cesium.JulianDate.addSeconds(startTime, playTime, new Cesium.JulianDate());
                let property = new Cesium.SampledPositionProperty();
                let t = 0;
                for (let i = 1; i < positions.length; i++) {
                    if (i == 1) {
                        property.addSample(startTime, positions[0]);
                    }
                    let dis = Cesium.Cartesian3.distance(positions[i], positions[i - 1]);
                    let time = dis / v + t;
                    let julianDate = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
                    property.addSample(julianDate, positions[i]);
                    t += dis / v;
                }

                if (qicheModel) {
                    viewer.entities.remove(qicheModel);
                    qicheModel = null;
                }
                qicheModel = viewer.entities.add({
                    // billboard: {
                    // 	eyeOffset: new Cesium.Cartesian3(20000, 200000, 20000),
                    // },
                    position: property,
                    orientation: new Cesium.VelocityOrientationProperty(property),
                    model: {
                        uri: require('../assets/taxi.glb'),
                        scale: 100
                    }
                });



                viewer.clock.currentTime = startTime;
                console.log(endTime)
                console.log(viewer.clock.currentTime)
                viewer.clock.multiplier = 1;
                viewer.clock.shouldAnimate = true;
                viewer.clock.stopTime = endTime;
                setTimeout(() => {
                    console.log('nihao')
                    console.log(cesiumCamera.position)
                    viewer.trackedEntity = null
                    loadPathData(pointsArray)
                    CameraRoamer()
                    viewer.scene.preUpdate.addEventListener(setRoamView)

                }, (playTime + 1) * 1000)

            }
            let s = 0
            let btn = document.getElementById("btncallapp");
            let tipinput = null
            let tipinput2 = null
            let tipinputloacation: any = null
            let tipinputloacation2: any = null
            btn.onclick = function () {
                tipinput = (document.getElementById('tipinput') as HTMLInputElement).value
                tipinput2 = (document.getElementById('tipinput2') as HTMLInputElement).value
                jQuery.when(
                    jQuery.ajax({
                        type: "GET",
                        url: "https://restapi.amap.com/v3/place/text?keywords=" + tipinput + "&key=" + "230e1d4baa0020039c7dbec6f2863700",
                        success: function (json: any) {

                            if (!json || !json.pois) {
                                tipinputloacation = "0";
                            }
                            else {
                                tipinputloacation = json.pois[0].location;
                                console.log(tipinputloacation)
                            }
                        },
                        error: function (data: any) { }
                    }),
                    jQuery.ajax({
                        type: "GET",
                        url: "https://restapi.amap.com/v3/place/text?keywords=" + tipinput2 + "&key=" + "230e1d4baa0020039c7dbec6f2863700",
                        success: function (json: any) {

                            if (!json || !json.pois) {
                                tipinputloacation2 = "0";
                            }
                            else {
                                tipinputloacation2 = json.pois[0].location;
                            }
                        },
                        error: function (data: any) { }
                    })
                ).done(function () {
                    console.log(tipinputloacation)
                    let result1 = tipinputloacation.split(',')
                    let result2 = tipinputloacation2.split(',')
                    console.log(result1[0])
                    let search = new searchRoute([result1[0], result1[1]], [result2[0], result2[1]]);
                    search.start({
                        strategy: 11,
                        callback: function (data: any) {
                            addRouteLine(data[0]);
                        }
                    })
                    handler.destroy();

                })
            }



            // end ============================Cesium室外导航部分================================

            window.onresize = (ev) => {
            };

            window.onresize(null);
        }
    }
}

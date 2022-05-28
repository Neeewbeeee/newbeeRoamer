import { Application } from "../types";

export const appsMock: Application[] = [
    {
        descrip: '为公司临时会议参会人员提供室内外导航服务',
        id: '1',
        imgUrl: require('../assets/placeholder.png'),
        name: "天鹅路197号A座导航",
        status: 'active',
        views: 32
    },
    {
        descrip: '疫情宅家用户在线游览东湖公园',
        id: '2',
        imgUrl: require('../assets/placeholder.png'),
        name: "东湖公园在线游览",
        status: 'active',
        views: 109
    },
    {
        descrip: '购房客户导航、在线评估',
        id: '3',
        imgUrl: require('../assets/placeholder.png'),
        name: "美艺苑小区B幢2单元201房体模型",
        status: 'inactive',
        views: 66
    },
]
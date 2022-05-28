import React, { } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import AppList from './pages/AppList';
import AppManagement from './pages/AppManagement';
import Apps from './pages/Apps';
import GeoNavEditor from './pages/GeoNavEditor';
import IndoorNavEditor from './pages/IndoorNavEditor';
import Main from './pages/Main';
import ModelEditor from './pages/ModelEditor';
import Register from './pages/Register';

const App: React.FC = () => {

    return (
        <div className='app'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signup' element={<Register />} />
                    <Route path='/apps' element={<Apps />}>
                        <Route index element={<AppList />} />
                    </Route>
                    <Route path='/apps/:appId' element={<AppManagement />} />
                    <Route path='/model-editor/:appId' element={<ModelEditor />} />
                    <Route path='/geo-nav-editor/:appId' element={<GeoNavEditor />} />
                    <Route path='/indoor-nav-editor/:appId' element={<IndoorNavEditor />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </HashRouter>

        </div>
    )
};

export default App;
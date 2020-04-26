import React from 'react';
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont"
import routes from './routes/index.js';
import store from "./store/idnex";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle/>
                <IconStyle/>
                { renderRoutes(routes) }
            </HashRouter>
        </Provider>
    );
}

export default App;

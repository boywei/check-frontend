import "./monaco-setup.js";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/index.jsx'
import {RouterProvider} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import router from './router'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

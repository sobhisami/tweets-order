import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login'
import { BrowserRouter} from "react-router-dom";
import Routers from './Routers/Routers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <Routers/>
   </BrowserRouter>
);


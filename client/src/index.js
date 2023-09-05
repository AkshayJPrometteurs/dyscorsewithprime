import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import Router from './components/Router';
import { ServiceContext } from './context/ServiceContext';
import "./assets/css/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ServiceContext>
        <RouterProvider router={Router}/>
    </ServiceContext>
);
reportWebVitals();

import { createContext, useContext, useEffect, useState } from "react";
import AxiosAdmin from "../components/AxiosAdmin";

const ContextData = createContext({
    adminAuth : {},
    setAdminAuth : () => {},
    adminToken : null,
    setAdminToken : () => {},
    APP_NAME : null,
    CLIENT_URL : null,
    SERVER_URL : null
});

export const ServiceContext = ({children}) => {
    const [adminAuth, setAdminAuth] = useState([]);
    const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_ACCESS_TOKEN'));
    const APP_NAME = 'DYSCORSE ADMIN : ';
    const CLIENT_URL = 'http://localhost:3000/';
    const SERVER_URL = 'http://localhost:8000/';
    const setAdminToken = (token) =>{
        if(token){localStorage.setItem('ADMIN_ACCESS_TOKEN',token);
        }else{localStorage.removeItem('ADMIN_ACCESS_TOKEN');}
        _setAdminToken(token)
    }
    useEffect(()=>{
        if(adminToken){
            AxiosAdmin.get('admin/user')
            .then(({data})=>{setAdminAuth(data)})
            .catch(()=>{setAdminAuth(null);setAdminToken(null)})
        }
    },[adminToken])
    return(
        <ContextData.Provider value={{ 
            adminAuth,setAdminAuth,adminToken,setAdminToken,APP_NAME,CLIENT_URL,SERVER_URL
         }}>
            {children}
        </ContextData.Provider>
    )
}

export const useServiceContext = () => useContext(ContextData);
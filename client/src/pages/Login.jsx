import React, { Fragment, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useServiceContext } from '../context/ServiceContext';
import { Divider } from 'primereact/divider';
import AxiosAdmin from '../components/AxiosAdmin';
import ValidationError from '../components/ValidationError';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookie from 'js-cookie';
import CryptoJS from 'crypto-js';

const Login = () => {
    const { APP_NAME,setAdminAuth,setAdminToken,adminToken, CLIENT_URL } = useServiceContext();
    document.title = APP_NAME+"LOGIN";
    const [formInfo, setFormInfo] = useState({email : '',password : ''})
    const [rememberMe, setRememberMe] = useState(Cookie.get('01982') ? true : false);
    const handleChange = (e) => {setFormInfo({...formInfo,[e.target.name]:e.target.value})}
    const [loader, setLoader] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        const formData = new FormData();
        formData.append('email',formInfo.email)
        formData.append('password',formInfo.password)
        formData.append('rememberMe',rememberMe)
        AxiosAdmin.post('admin/login', formData)
        .then(({data})=>{
            setLoader(false);
            setAdminAuth(data.data.user);
            setAdminToken(data.data.token);
            if(rememberMe){
                Cookie.set('01982',CryptoJS.AES.encrypt(formInfo.email, '12345').toString());
                Cookie.set('928347',CryptoJS.AES.encrypt(formInfo.password, '123456').toString());
            }else{
                Cookie.remove('01982');
                Cookie.remove('928347');
            }
            navigate('/');
            Swal.fire({icon: 'success',title: data.message,showConfirmButton: false,timer: 1500});
        })
        .catch(({response})=>{
            setLoader(false);
            setValidationErrors(response.data.errors);
        })
    }
    useEffect(()=>{
        setFormInfo({...formInfo , 
            email: Cookie.get('01982') ? CryptoJS.AES.decrypt(Cookie.get('01982'), '12345').toString(CryptoJS.enc.Utf8) : '', 
            password : Cookie.get('928347') ? CryptoJS.AES.decrypt(Cookie.get('928347'), '123456').toString(CryptoJS.enc.Utf8) : ''
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    if(adminToken){return(<Navigate to={'/'}/>)}
    return (
        <Fragment>
            <div className='flex flex-col justify-center items-center h-screen relative'>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center md:max-w-5xl bg-white p-6 md:py-12 md:px-14 rounded-xl shadow-xl absolute z-50">
                    <img src={`${CLIENT_URL}/assets/images/login.png`} alt="login" className='hidden md:block h-96'/>
                    <form onSubmit={handleSubmit}>
                        <div className="text-900 text-2xl md:text-3xl font-bold tracking-wider mb-5 text-center">Welcome To Dyscorse Admin</div>
                        <Divider className='border border-primaryColor'/>
                        <div className='mt-6 mb-3'>
                            <label htmlFor="email" className="block text-900 font-medium mb-1">Email Address</label>
                            <InputText keyfilter="email" id="email" type="text" className={`w-full ${validationErrors.email && 'p-invalid'}`} name='email' value={formInfo.email} onChange={handleChange} autoComplete="off"/>
                            <ValidationError error={validationErrors.email}/>
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="password" className="block text-900 font-medium mb-1">Password</label>
                            <Password toggleMask className={`w-full prime-pass ${validationErrors.password && 'p-invalid'}`} name='password' value={formInfo.password} onChange={handleChange} feedback={false} />
                            <ValidationError error={validationErrors.password}/>
                        </div>
                        <div className="flex items-center mb-6">
                            <Checkbox onChange={e => setRememberMe(e.checked)} checked={rememberMe} id="rememberme" className="mr-2 -mt-0.5" />
                            <label htmlFor="rememberme" className='-mt-0.5'>Remember me</label>
                        </div>
                        <Button label={loader ? 'Please Wait' : 'Login Now'} icon="pi pi-unlock" loading={loader} className="w-full" loadingIcon={'pi pi-sync pi-spin'} />
                    </form>
                </div>
                <img src={`${CLIENT_URL}/assets/images/login1.svg`} alt="login" className='absolute bottom-0 w-full'/>
            </div>
        </Fragment>
    )
}

export default Login
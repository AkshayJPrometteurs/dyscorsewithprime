import React, { Fragment, useState } from 'react'
import { useServiceContext } from '../context/ServiceContext'
import { Navigate } from 'react-router-dom'
import Loader from '../pages/comman/Loader'
import AxiosAdmin from '../components/AxiosAdmin';
import Swal from 'sweetalert2';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Sidebar from '../pages/comman/Sidebar'
import { Button } from 'primereact/button'

const MainLayout = ({children,loading}) => {
    const { setAdminAuth,setAdminToken,adminToken,adminAuth } = useServiceContext();
    const [loader,setLoader] = useState(false)
    const logout = () => {
        const accept = () => {
            setLoader(true)
            AxiosAdmin.delete('admin/logout')
            .then(({data})=>{
                setLoader(false)
                setAdminAuth(null)
                setAdminToken(null)
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        }
        confirmDialog({
            message: 'Do you want to logout now?',
            header: 'Logout Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-primary',
            headerClassName:'logout-header',
            accept
        });
    }
    const [menuToggle, setMenuToggle] = useState(false)
    const handleMenusToggle = () => {setMenuToggle(current => !current);}
    if(!adminToken){return(<Navigate to={'/login'}/>)}
    return (
        <Fragment>
            {(loading || loader) ? (<Loader/>) : (
                <Fragment>
                    <section className='flex items-center justify-between px-5 py-3 shadow-md bg-white'>
                        <div className='flex gap-6 items-center'>
                            <i className='pi pi-bars cursor-pointer' style={{ fontSize : '1.5rem' }} onClick={handleMenusToggle}></i>
                            <h1 className='text-xl font-bold uppercase tracking-wider'>Dyscorse</h1>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='text-lg font-bold'>{adminAuth && adminAuth.first_name}</p>
                            <Button onClick={logout} className='p-button p-component p-button-danger' style={{ fontSize : '0.8rem' }}><i className='pi pi-power-off'></i></Button>
                        </div>
                    </section>
                    <section className='flex relative'>
                        <aside className={`bg-white shadow-lg p-2 ${menuToggle ? 'block fixed top-[3.7rem] h-full w-1/2 md:hidden' : 'hidden md:block md:w-[15%] mt-[1px] h-[91.5vh]'}`}><Sidebar/></aside>
                        <main className={`p-4 ${menuToggle ? 'w-full' : 'w-full md:w-[85%]'}`}>{children}</main>
                    </section>
                    <ConfirmDialog draggable={false}/>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MainLayout
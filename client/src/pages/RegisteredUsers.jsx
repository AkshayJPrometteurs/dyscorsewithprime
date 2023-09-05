import React, { Fragment, useEffect, useRef, useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import AxiosAdmin from '../components/AxiosAdmin'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useServiceContext } from '../context/ServiceContext';
import { Button } from 'primereact/button';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

const RegisteredUsers = () => {
    const { CLIENT_URL, APP_NAME } = useServiceContext();
    document.title = APP_NAME+("Users List").toUpperCase();
    const toast = useRef(null);
    const dt = useRef(null);
    const [loader,setLoader] = useState(false);
    const [users, setUsers] = useState([]);
    const [viewDialogVisiblilty, setViewDialogVisiblilty] = useState(false);
    const getRegisteredUsersList = () => {
        setLoader(true)
        AxiosAdmin.get('registered_users').then(({data})=>{setLoader(false);setUsers(data.data.users);})
    }
    const [filters, setFilters] = useState({global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const exportCSV = () => {dt.current.exportCSV();};
    const renderHeader = () => {
        return (
            <div className="flex justify-between gap-4">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} size="small" onChange={onGlobalFilterChange} className='text-sm' placeholder="Keyword Search" />
                </span>
                <Button label="Export CSV" icon="pi pi-upload" className='text-sm' onClick={exportCSV} />
            </div>
        );
    };
    const header = renderHeader();
    const deleteConfirmation = (id) => {
        confirmDialog({
            message : "Are you sure you want to delete this?",
            header : "Confirmation",
            icon : "pi pi-ban",
            headerClassName : 'delete_confirmation',
            acceptClassName : 'text-sm p-button-primary',
            rejectClassName : 'text-sm p-button-danger',
            accept : () => {toast.current.show({ severity: 'success', summary: 'Confirmed'+id, life: 2000 });}
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getRegisteredUsersList()},[])
    return (
        <MainLayout loading={loader}>
            <Toast ref={toast} />
            <Card title="Registered Users List" >
                <DataTable ref={dt} value={users} className='text-sm' filters={filters} sortMode="multiple" paginatorClassName='text-sm' paginator rows={6} rowsPerPageOptions={[6, 12, 24, 50]} tableStyle={{ minWidth: '50rem' }} header={header} emptyMessage="No Data Found.">
                    <Column sortable header="Sr. No." field={'user_id'} body={(data)=>(users.indexOf(data)+1)}></Column>
                    <Column header="Profile Image" body={
                        <Image src={users.profile_image ? `https://primefaces.org/cdn/primereact/images/product/${users.profile_image}` :`${CLIENT_URL}/assets/images/user_avatar.png`} zoomSrc={users.profile_image ? `https://primefaces.org/cdn/primereact/images/product/${users.profile_image}` :`${CLIENT_URL}/assets/images/user_avatar.png`} alt={users.profile_image} className="w-10 h-10 rounded-full" preview />
                    }></Column>
                    <Column field='auth_type' sortable className='capitalize' header="Login Type"></Column>
                    <Column field='name' sortable className='capitalize' header="Name"></Column>
                    <Column field='email' sortable header="Email-ID"></Column>
                    <Column field='privacy' sortable className='capitalize' header="Privacy"></Column>
                    <Column className='capitalize' header="Actions" body={(data)=>(
                        <Fragment>
                            <div className='flex items-center gap-3'>
                                <Button severity="primary" className='text-xl' style={{ borderRadius : '100%', padding : '0.2rem 0.5rem' }} icon={AiFillEye} onClick={() => setViewDialogVisiblilty(true)}></Button>
                                <Link to={`/user/edit-user/${data.user_id}`}><Button severity="warning" className='text-xl' style={{ borderRadius : '100%', padding : '0.2rem 0.5rem' }} icon={AiFillEdit}></Button></Link>
                                <Button onClick={()=>deleteConfirmation(data.user_id)} severity="danger" className='text-xl' style={{ borderRadius : '100%', padding : '0.2rem 0.5rem' }} icon={AiFillDelete}></Button>
                            </div>
                        </Fragment>
                    )}></Column>
                </DataTable>
                <Dialog draggable={false} header="Header" visible={viewDialogVisiblilty} onHide={() => setViewDialogVisiblilty(false)}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>
            </Card>
        </MainLayout>
    )
}

export default RegisteredUsers
import React, { Fragment, useRef, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { InputText } from 'primereact/inputtext'
import ValidationError from '../../components/ValidationError'
import { Tooltip } from 'primereact/tooltip'
import { FileUpload } from 'primereact/fileupload'
import { ProgressBar } from 'primereact/progressbar'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Link } from 'react-router-dom'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { Divider } from 'primereact/divider'

const EditUser = () => {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    const onTemplateSelect = (e) => {
        let files = e.files;
        files.length !== 0 ? setTotalSize(files[0].size) : setTotalSize(0);
    };

    const onTemplateRemove = (callback) => {
        setTotalSize(0);
        callback();
    };

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                <div className="flex items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex items-center flex-wrap justify-between">
                <div className="flex items-center text-base" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} className='h-20 w-20' />
                    <span className="flex flex-col text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex items-center gap-4">
                <i className="pi pi-image p-4" style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span className='text-base'>Drag and Drop Image Here</span>
            </div>
        );
    };
    const chooseOptions = { icon: 'pi pi-fw pi-images', className: 'p-button-sm p-button-rounded p-button-outlined', label : 'Upload Image' };
    return (
        <MainLayout>
            <Card cl header={
                <Fragment>
                    <div className='flex justify-between items-center px-4 pt-3 pb-0'>
                        <h1 className='font-bold text-xl'>Edit User</h1>
                        <Link to={'/users'}><Button className='text-sm flex items-center gap-2' icon={<RiArrowGoBackLine/>}>Back To List</Button></Link>
                    </div>
                    <Divider className='border-gray-800' />
                </Fragment>
            }>
                <form>
                    <div className='mb-3'>
                        <label htmlFor="profile_image" className="block text-900 font-medium mb-1">Profile Image</label>
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <FileUpload ref={fileUploadRef} id='profile_image' name="profile_image" accept="image/*" maxFileSize={1000000} onSelect={onTemplateSelect} headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className="block text-900 font-medium mb-1">Email Address</label>
                        <InputText keyfilter="email" id="email" type="text" className={`w-full`} name='email' autoComplete="off"/>
                        <ValidationError/>
                    </div>
                </form>
            </Card>
        </MainLayout>
    )
}

export default EditUser
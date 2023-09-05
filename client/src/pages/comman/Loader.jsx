import React, { Fragment } from 'react'
import { useServiceContext } from '../../context/ServiceContext'

const Loader = () => {
    const { CLIENT_URL } = useServiceContext();
    return (
        <Fragment>
            <div className='h-screen bg-white flex justify-center items-center absolute w-full top-0 left-0'>
                <div className='text-center'>
                    <img src={CLIENT_URL+'assets/images/loader.gif'} alt="loader" />
                    <h3 className='text-2xl font-bold uppercase tracking-wider'>PLEASE WAIT</h3>
                </div>
            </div>
        </Fragment>
    )
}

export default Loader
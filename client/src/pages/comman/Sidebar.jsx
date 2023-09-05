import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { FaGaugeHigh, FaUserGroup } from 'react-icons/fa6'

const Sidebar = () => {
    const sideMenus = [
        { path : '/', icon : <FaGaugeHigh className='text-[20px]'/>, title : 'Dashboard' },
        { path : '/users', icon : <FaUserGroup className='text-[20px]'/>, title : 'Registered Users' },
    ];
    return (
        <Fragment>
            <div className='grid gap-2'>
                {sideMenus.map((data,id)=>{
                    return(<Fragment key={id}>
                        <NavLink to={data.path} className={({ isActive }) => (isActive ? 'bg-primaryColor text-white' : 'hover:bg-primaryColor hover:text-white')+' px-3 py-2 rounded flex gap-2 items-center tracking-wide text-[14px]'}>
                            {data.icon}
                            <span>{data.title}</span>
                        </NavLink>
                    </Fragment>)
                })}
            </div>
        </Fragment>
    )
}

export default Sidebar
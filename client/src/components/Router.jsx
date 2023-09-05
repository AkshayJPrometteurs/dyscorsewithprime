import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import RegisteredUsers from '../pages/RegisteredUsers'
import EditUser from '../pages/users/EditUser'

const Router = createBrowserRouter([
    { path : '/', element : <Dashboard/> },
    { path :'/login', element : <Login/> },
    { path : '/users', element : <RegisteredUsers/>},
    { path : '/user/edit-user/:user_id', element : <EditUser/> }
])

export default Router
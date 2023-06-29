import React from 'react'
import { isLoggedIn } from '../services/Helper'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    return isLoggedIn()?<Outlet/>:<Navigate to={"/login"}/>
}

export default PrivateRoute
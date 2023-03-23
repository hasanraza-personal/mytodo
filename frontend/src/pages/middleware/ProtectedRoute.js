import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// After login
export const AuthRoutes = () => {
    if (localStorage.getItem('userObject')){
        return <Outlet /> 
    }else{
        return <Navigate to='/' />
    }
    
}

// Before login
export const GeneralRoutes = () => {
    if (!localStorage.getItem('userObject')){
        return <Outlet /> 
    }else{
        return <Navigate to='/todo' />
    }
}
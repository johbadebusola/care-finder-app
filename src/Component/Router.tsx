import React from 'react'
import { Route,Routes } from 'react-router'
import { Search } from './Search'
import Users from './User'
import Home from './Home'
import { Login } from './Login'
import { Signup } from './Signup'
import { Error404 } from './Error404'


export const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}  />
            <Route path='/search'  element={<Search />} /> 
            <Route path='/users'  element={<Users />} /> 
            <Route path='/login'  element={<Login/>} /> 
            <Route path='/signup'  element={<Signup/>} /> 
            <Route path='*'  element={<Error404/>} /> 
        </Routes>
    </div>
  )
}

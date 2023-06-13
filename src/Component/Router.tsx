import React from 'react'
import { Route,Routes } from 'react-router'
import { Search } from './Search'
import Users from './User'
import Home from './Home'


export const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />}  />
            <Route path='/search'  element={<Search />} /> 
            <Route path='/users'  element={<Users />} /> 
        </Routes>
    </div>
  )
}

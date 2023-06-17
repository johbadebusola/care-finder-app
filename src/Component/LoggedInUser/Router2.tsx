import React from 'react'
import { Route,Routes } from 'react-router'
import { Search } from '../Search'
import { Account } from './Account'
import { Library } from './Library'

export const Router2 = () => {
  return (
    <div>
       <Routes>
            <Route path='/' element={<Account />}  />
            <Route path='/search'  element={<Search />} /> 
            <Route path='/library'  element={<Library />} /> 
        </Routes>
    </div>
  )
}


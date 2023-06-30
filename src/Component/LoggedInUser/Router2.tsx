import React from 'react'
import { Route,Routes } from 'react-router'
import Search  from '../Search'
import { Account } from './Account'
import { Library } from './Library'
import Feeds from './Feeds'
import Post from './Post'

export const Router2 = () => {
  return (
    <div>
       <Routes>
            <Route path='/*' element={<Account />}  />
            <Route path='/search'  element={<Search />} /> 
            <Route path='/library'  element={<Library />} /> 
            <Route path='/feeds'  element={<Feeds />} /> 
            <Route path='/post'  element={<Post />} /> 
        </Routes>
    </div>
  )
}




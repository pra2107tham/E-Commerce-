import React from 'react'
import Header from './Components/headers/Header'
import Pages from './Components/mainpages/Pages'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import {DataProvider}  from './GlobalState'


const App = () => {
  return (
    <DataProvider>
    <BrowserRouter>
    <div className='App'>
      <Header />
      <Pages />
    </div>
    </BrowserRouter>
    </DataProvider>
  )
}

export default App
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../homepage-components/Homepage'

function Connections() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Homepage/>} />
        </Routes>
    </>
  )
}

export default Connections
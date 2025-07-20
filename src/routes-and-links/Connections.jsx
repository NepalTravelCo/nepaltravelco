import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../homepage-components/Homepage'
import ExploreValley from '../inner-components/ExploreValley'

function Connections() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/explore-valley' element={<ExploreValley />} />
            {/* Add more routes as needed */}
        </Routes>
    </>
  )
}

export default Connections
import React from 'react'
import Connections from './routes-and-links/Connections'
import FooterSection from './footer-components/FooterSection'
import Navigation from './header-component/Navigation'

function App() {
  return (
    <>
      <Navigation />
        <Connections />
      <FooterSection />
    </>
  )
}

export default App
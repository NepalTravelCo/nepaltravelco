import React from 'react'
import Connections from './routes-and-links/Connections'
import FooterSection from './footer-components/FooterSection'
import Navigation from './header-component/Navigation'
import CopyrightSection from './footer-components/CopyrightSection'

function App() {
  return (
    <>
      <Navigation />
        <Connections />
      <FooterSection />
      <CopyrightSection/>
    </>
  )
}

export default App
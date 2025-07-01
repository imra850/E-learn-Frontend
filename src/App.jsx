import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CustNavbar from './Component/Navbar'
import HeroSection from './Component/Home/HeroSection'
import Keyfeatures from './Component/Home/Keyfeatures'
import CoursesSection from './Component/Home/CoursesSection'
import BenefitSection from './Component/Home/BenefitSection'
import Footer from './Component/Home/Footer'

function App() {
  return (
    <>
    <div>
      <HeroSection/>
      <Keyfeatures/>
     
      <BenefitSection/>
      <Footer/>
    </div>
      
      
    </>
  )
}

export default App

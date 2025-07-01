import React from 'react'
import AboutIntroduction from '../Component/About/AboutIntroduction'
import MissionSection from '../Component/About/MissionSection'
import KeyFeatures from '../Component/About/KeyFeatures'
import CalltoActionSection from '../Component/About/CalltoActionSection'
import ContactInfo from '../Component/About/ContactInfo'

const About = () => {
  return (
    <div>
      <AboutIntroduction/>
      <MissionSection/>
      <KeyFeatures/>
      <CalltoActionSection/>
      <ContactInfo/>
    </div>
  )
}

export default About
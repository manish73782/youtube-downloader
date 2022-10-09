import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import InfoCard from '../components/InfoCard'
import InstructionCard from '../components/InstructionCard'
import MainCard from '../components/MainCard'
import PlatformSupport from '../components/PlatformSupport'

function Home() {
  return (
    <>
      <Header />
      <MainCard />
      <PlatformSupport />
      <InstructionCard />
      <InfoCard />
      <Footer />
    </>
  )
}

export default Home
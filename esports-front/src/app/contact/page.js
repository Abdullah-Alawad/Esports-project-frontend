"use client"
import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const contact = () => {
  

  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat font-custom pt-7">
      <NavBar />
      <div className='flex flex-col items-center mb-10'>
        <div className='font-extrabold text-6xl'>Contact us</div>
      </div>
      <Footer />
    </div>
  )
}

export default contact
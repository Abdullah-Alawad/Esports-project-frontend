"use client"
import Link from 'next/link'
import React from 'react'
import logo from '../../../public/logo-t.png'
import Image from 'next/image'
import { TokenContext } from "../layout";
import { useContext, useState } from 'react';

const NavBar = () => {
  const {haveToken, setHaveToken} = useContext(TokenContext)
  return (
    <div className="flex ">
         <div className="bg-[url('../../public/bg1.png')] bg-repeat rounded-full ml-5 px-1 py-1 max-w-[170px] z-10 border-y-8 border-l-8 border-r-8 border-violet-900/25 shadow-2xl" >
          <Link href={"/"}><Image src={logo} width={160} className='transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300'/></Link>
         </div>
         
         <div className="flex flex-row justify-between -mx-10 text-yellow-300/90 mt-10 pl-12 pb-16 pt-4 min-w-[1800px] max-h-[50px] bg-[url('../../public/bg1.png')] bg-repeat rounded-e-full border-8 border-violet-900/50 shadow-2xl" >
          <div className='flex gap-8 font-extrabold text-4xl '>
            <Link href={"/"} className=' hover:text-slate-200'>Home</Link>
            <Link href={"/tournaments"} className=' hover:text-slate-200'>Tournaments</Link>
            <Link href={"/about"} className=' hover:text-slate-200'>About us</Link>
            <Link href={"/contact"} className=' hover:text-slate-200'>Contact us</Link>
          </div>

          {/* make this conditional rendering based on if user signed in */}
          <div className='flex gap-8 font-extrabold text-3xl mr-10 text-black'>
            {haveToken &&<Link href={"/profile"} className=' hover:text-slate-200'>Profile</Link>}
            {!haveToken &&<Link href={"/signUpIn"} className=' hover:text-slate-200'>Sign in</Link>}
            {haveToken &&<Link href={"/"} onClick={()=>{localStorage.removeItem("token"); setHaveToken(false)}} className=' hover:text-slate-200'>Sign Out</Link>}
          </div>
         </div>
    </div>
  )
}

export default NavBar
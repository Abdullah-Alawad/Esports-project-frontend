"use client"
import Link from 'next/link'
import React from 'react'
import logo from '../../../public/logo-t.png'
import profile from '../../../public/profile.png'
import signout from '../../../public/logout1.png'
import signin from '../../../public/login.png'
import home from '../../../public/Home.png'
import about from '../../../public/about.png'
import contact from '../../../public/contact1.png'
import tournament from '../../../public/tournament.png'
import Image from 'next/image'
import { TokenContext } from "../layout";
import { useContext, useState } from 'react';

const NavBar = () => {
  const {haveToken, setHaveToken} = useContext(TokenContext)
  const [hovered, setHovered] = useState(false);
  const [hoveredSignout, setHoveredSignout] = useState(false);
  const [hoveredSignin, setHoveredSignin] = useState(false);
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredTournament, setHoveredTournament] = useState(false);
  const [hoveredAbout, setHoveredAbout] = useState(false);
  const [hoveredContact, setHoveredContact] = useState(false);


  return (
    <div className="flex ">
         <div className="bg-[url('../../public/bg1.png')] bg-repeat rounded-full ml-5 px-1 py-1 max-w-[170px] z-10 border-y-8 border-l-8 border-r-8 border-violet-900/25 shadow-2xl" >
          <Link href={"/"}><Image src={logo} width={160} className='transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300'/></Link>
         </div>
         
         <div className="flex flex-row justify-between -mx-10 text-yellow-300/90 mt-10 pl-12 pb-16 pt-4 min-w-[1800px] max-h-[50px] bg-[url('../../public/bg1.png')] bg-repeat rounded-e-full border-8 border-violet-900/50 shadow-2xl" >
          <div className='flex gap-11 font-extrabold text-4xl '>
            <Link href={"/"} onMouseEnter={() => setHoveredHome(true)} onMouseLeave={() => setHoveredHome(false)} className=' hover:text-slate-200'>
              <div className='ml-3'>
                <Image src={home} alt='Home' width={70} height={70} className='-translate-y-2'/>
              </div>
              <div className={` ml-4 ${hoveredHome ? 'opacity-100 translate-x-16 transition duration-1000 mr-3' : 'opacity-0'} -translate-y-16`}>
                Home
              </div>
            </Link>
            <div className={`flex gap-5  ${hoveredHome? 'translate-x-14 transition duration-1000 ' : '-translate-x-8'}`}>
              <Link href={"/tournaments"} onMouseEnter={() => setHoveredTournament(true)} onMouseLeave={() => setHoveredTournament(false)} className=' hover:text-slate-200'>
                <div >
                  <Image src={tournament} alt='Tournamnent' width={75} height={75} className='-translate-y-2'/>
                </div>
                <div className={` ml-4 ${hoveredTournament ? 'opacity-100 translate-x-16 transition duration-1000 mr-3' : 'opacity-0'} -translate-y-16`}>
                  Tournaments
                </div>
              </Link>
              <div className={`flex gap-5  ${hoveredTournament? 'translate-x-14 transition duration-1000 ' : '-translate-x-36'}`}>
                <Link href={"/about"} onMouseEnter={() => setHoveredAbout(true)} onMouseLeave={() => setHoveredAbout(false)} className=' hover:text-slate-200'>
                  <div>
                    <Image src={about} alt='about us' width={75} height={75} className='-translate-y-2'/>
                  </div>
                  <div className={` ml-4 ${hoveredAbout ? 'opacity-100 translate-x-16 transition duration-1000 mr-3' : 'opacity-0'} -translate-y-16`}>
                    About Us
                  </div>
                </Link>
                <div className={`flex gap-5  ${hoveredAbout? 'translate-x-14 transition duration-1000 ' : '-translate-x-28'}`}>
                  <Link href={"/contact"} onMouseEnter={() => setHoveredContact(true)} onMouseLeave={() => setHoveredContact(false)} className=' hover:text-slate-200'>
                    <Image src={contact} alt='Contact us' width={75} height={75} className='-translate-y-2 ml-8'/>
                  </Link>
                  <div className={` text-slate-200 ${hoveredContact ? 'opacity-100 translate-x-3 transition duration-1000 mr-3 -ml-3' : 'opacity-0'} translate-y-2`}>
                    Contact Us
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* make this conditional rendering based on if user signed in */}
          <div className='flex gap-8 font-extrabold text-3xl mr-10 text-black'>
            {haveToken &&<Link href={"/profile"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}  className=' hover:text-slate-200'>
              <div className={`transition-transform duration-1000 ${hovered ? '-translate-x-12' : 'translate-x-24'} ${hoveredSignout ? '-translate-x-14' : ''}`}>
                <Image src={profile} alt="Profile" title='Profile' width={50} height={50}/>
              </div>
              <div className={`transition-opacity duration-1000 ml-2 ${hovered ? 'opacity-100' : 'opacity-0'} -translate-y-11`}>
                Profile
              </div>
            </Link>}

            {!haveToken &&<Link href={"/signUpIn"} onMouseEnter={() => setHoveredSignin(true)} onMouseLeave={() => setHoveredSignin(false)} className=' hover:text-slate-200'>
              <div className={`transition-transform duration-1000 ${hoveredSignin ? '-translate-x-12' : 'translate-x-10'}`}>
                <Image src={signin} alt="signin" title='sign in' width={50} height={50}/>
              </div>
              <div className={`transition-opacity duration-1000 ml-2 ${hoveredSignin ? 'opacity-100' : 'opacity-0'} -translate-y-11`}>
                Sign in
              </div>
            </Link>}
            
            {haveToken &&<Link href={"/"} onMouseEnter={() => setHoveredSignout(true)} onMouseLeave={() => setHoveredSignout(false)} onClick={()=>{localStorage.removeItem("token"); setHaveToken(false)}} className=' hover:text-slate-200'>
              <div className={`transition-transform duration-1000 ${hoveredSignout ? '-translate-x-12' : 'translate-x-12'}`}>
                <Image src={signout} alt="signout" width={80} height={80} className='-translate-y-3 mr-2'/>
              </div>
              <div className={`transition-opacity duration-1000 ml-6 ${hoveredSignout ? 'opacity-100' : 'opacity-0'} -translate-y-16 text-red-800`}>
                Sign out
              </div>
            </Link>}
          </div>
         </div>
    </div>
  )
}

export default NavBar
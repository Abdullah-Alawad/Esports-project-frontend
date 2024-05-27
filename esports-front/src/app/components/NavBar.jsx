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
import { useContext, useState, useEffect } from 'react';

const NavBar = () => {
  const {haveToken, setHaveToken} = useContext(TokenContext)
  const [hovered, setHovered] = useState(false);
  const [hoveredSignout, setHoveredSignout] = useState(false);
  const [hoveredSignin, setHoveredSignin] = useState(false);
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredTournament, setHoveredTournament] = useState(false);
  const [hoveredAbout, setHoveredAbout] = useState(false);
  const [hoveredContact, setHoveredContact] = useState(false);

  const [tournaments, setTournaments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTournaments, setFilteredTournaments] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredTournaments([]);
    } else {
      // Filter tournaments based on search query
      const filtered = tournaments.filter(tournament =>
        tournament.game.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  };
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
    const tournamentResponse = await fetch("https://esports-project-backend-production.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournaments(tournamentData);
    //setFilteredTournaments(tournamentData);
    }
    catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };
  fetchTournaments();
}, []);

  return (
    <div className="flex justify-center z-50">
         <div className=" selection:bg-violet-700/70 bg-[url('../../public/bg1.png')] bg-repeat rounded-full ml-5 px-1 py-1 max-w-[170px] z-10 border-y-8 border-l-8 border-r-8 border-violet-900/25 shadow-2xl" >
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

          <div>
            <input
              type="text"
              placeholder="Search for game..."
              className="bg-[url('../../public/bg2.png')] bg-repeat py-3 pl-2 shadow-2xl rounded-2xl text-xl font-bold placeholder-slate-200"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <ul className='z-50'>
            {filteredTournaments.map(tournament => (
            <Link href={"/tournaments"} >
            <li className="flex z-50 my-3 border-4 bg-yellow-300/70 border-violet-400 shadow-2xl hover:bg-[url('../../public/bg1.png')] hover:bg-repeat m-2 rounded-2xl" key={tournament.id}>
              <img className='rounded-2xl mr-2' src={tournament.image} width={60} height={120} alt='img' />
              <div>
                <h2 className='text-black font-bold text-xl'>{tournament.game}</h2>
                <div className='text-black font-bold text-lg'>{tournament.StartDate.substring(0,10)}</div>
              </div>
            </li>
            </Link>
            ))}
            </ul>
          </div>

          {/* make this conditional rendering based on if user signed in */}
          <div className='flex gap-8 font-extrabold text-3xl mr-10 text-black'>
            {haveToken &&<Link href={"/profile"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}  className=' hover:text-slate-200'>
              <div className={`transition-transform duration-1000 ${hovered ? '-translate-x-12' : 'translate-x-24'} ${hoveredSignout ? '-translate-x-16' : ''}`}>
                <Image src={profile} alt="Profile" title='Profile' width={50} height={50}/>
              </div>
              <div className={`transition-opacity duration-1000 ml-2 ${hovered ? 'opacity-100' : 'opacity-0'}  -translate-y-11`}>
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
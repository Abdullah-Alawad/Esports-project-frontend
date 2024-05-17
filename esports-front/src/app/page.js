"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";
import intro from "../../public/intro.gif"
import logo from "../../public/logo-t.png"

export default function Home() {

    const [tournamentsData, setTournamentsData] = useState([]);

    useEffect(()=>{
      getTournamentsData();
    },[])
    
   const tournamentsCards = tournamentsData && tournamentsData.map(tournament=>{
    return <div key ={tournament._id} className="rounded-xl bg-[url('../../public/bg1.png')] bg-repeat p-3 ">
      <img src={tournament.image} className="w-36 h-56 rounded-xl m-auto shadow-2xl mb-2" />
      <h1 className="text-2xl font-bold text-center">{tournament.game}</h1>
      <h1 className="text-xl font-semibold">Prize: <span className="font-bold">{tournament.prize}</span></h1>
      <h1 className="text-xl font-semibold">Duration: <span className="font-bold">{tournament.duration}</span></h1>
    </div>
   }) 

  return (
   <div className="font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10 flex flex-col justify-center items-center ">
    <NavBar />
      <h1 className="bg-[url('../../public/bg1.png')] bg-repeat font-extrabold text-6xl text-center mb-5 px-8 py-5 rounded-xl text-yellow-300/90 shadow-2xl border-8 border-violet-600/50">WELCOME TO EplayJO</h1>
      <div className="relative ">
        <Image src={intro} alt="intro" className="rounded-2xl shadow-2xl absolute z-10 min-w-[1400px] min-h-[790px] top-5 -left-[480px]"/>
        <Image src={logo} alt="logo" className="relative z-20 max-h-[440px] max-w-[440px] top-[199px] left-[2px]"/>
      </div>
    {/* ongoing tournaments */}
      <div className="mt-[450px] flex flex-col items-center">
        <div className="bg-[url('../../public/bg1.png')] bg-repeat font-extrabold text-6xl text-center mb-5 px-8 py-5 rounded-xl text-yellow-300/90 shadow-2xl border-8 border-violet-600/50 ">Join Tournaments TODAY!</div>
        <div className="mb-20">
          <div className="flex m-8 p-3 flex-wrap gap-10">
            {tournamentsCards}
          </div>
              <Link href={"/tournaments"} className="font-bold text-2xl text-yellow-300 border-4 border-violet-600/50 hover:border-violet-700 shadow-2xl rounded-full bg-[url('../../public/bg1.png')] bg-repeat p-5 w-52">See more tournaments</Link>
          </div>
      </div>
      <Footer /> 
    </div>
  );


  async function getTournamentsData(){
    const tournamentResponse = await fetch("https://selfless-charisma-production.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournamentsData(tournamentData);
  }
}

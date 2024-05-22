"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";
import intro from "../../public/intro.gif";
import logo from "../../public/logo-t.png";
import icon1 from "../../public/mini3-t.png";
import icon2 from "../../public/mini4-t.png";
import icon3 from "../../public/mini8-t.png";
import icon4 from "../../public/mini9-t.png";
import icon5 from "../../public/mini27.png";
import arena from "../../public/esports.png";

export default function Home() {

    const [tournamentsData, setTournamentsData] = useState([]);

    useEffect(()=>{
      getTournamentsData();
    },[])
    
   const tournamentsCards = tournamentsData && tournamentsData.map(tournament=>{
    return <div key ={tournament._id} className="pb-3 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 text-slate-200 rounded-xl bg-[url('../../public/bg1.png')] bg-repeat px-3 flex flex-col justify-center max-w-[300px]">
    <img src={tournament.image} className="w-52 h-80 rounded-xl m-auto shadow-2xl mb-2 mt-7" />
    <h1 className="text-2xl font-bold text-center text-yellow-300">{tournament.game}</h1>
    <h1 className="text-xl font-semibold">Prize: {tournament.prize? <span className="font-bold">{tournament.prize}$</span>: <span>FREE</span>}</h1>
    <h1 className="text-xl font-semibold">Duration: <span className="font-bold">{tournament.duration}</span></h1>
    {/* show more info about tournament */}
    </div>
   }) 

  return (
   <div className="font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10 flex flex-col justify-center items-center ">
    <NavBar />
      <div className="flex flex-row bg-[url('../../public/bg1.png')] bg-repeat font-extrabold text-center mb-5 px-8 py-5 rounded-xl text-slate-200 shadow-2xl border-8 border-violet-600/50">
        <Image src={icon1} alt="icon" width={100} height={70} />
        <div className=" text-6xl translate-y-5">WELCOME TO EplayJO</div>
        <Image src={icon2} alt="icon" width={100} height={70} />
      </div>
      <div className="relative ">
        <Image src={icon3} alt="icon" className="absolute z-30 -translate-x-[90px] -translate-y-[40px] -rotate-45"/>
        <Image src={intro} alt="intro" unoptimized className="  min-w-[1400px] min-h-[790px] top-5 -left-[480px] border-8 border-violet-600/50"/>
        <Image src={logo} alt="logo" className="absolute z-20 max-h-[440px] max-w-[440px] top-[180px] translate-x-[480px]"/>
      </div>
    {/* ongoing tournaments */}
      <div className="mt-[450px] flex flex-col items-center -translate-y-[400px] -mb-56">
        <div className="flex bg-[url('../../public/bg1.png')] bg-repeat font-extrabold text-6xl text-center mb-5 px-8 py-5 rounded-xl text-slate-200 shadow-2xl border-8 border-violet-600/50 ">
          <Image src={icon4} alt="icon" width={130} height={100} className="mr-2" />
          <div className="translate-y-5">Join Tournaments TODAY!</div>
        </div>
        <div className="mb-20 flex flex-col items-center">
          <div className="flex justify-center m-8 p-3 flex-wrap gap-10">
            {tournamentsCards}
          </div>
              <Link href={"/tournaments"} className="font-bold text-2xl text-yellow-300 border-4 border-violet-600/50 hover:border-violet-700 shadow-2xl rounded-full bg-[url('../../public/bg1.png')] bg-repeat  w-96 py-3 text-center transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300">See more tournaments</Link>
          </div>
          <div className=" ">
            <div className=" flex justify-center bg-[url('../../public/bg1.png')] bg-repeat font-extrabold text-4xl text-center mb-5 px-8 py-5 rounded-xl text-slate-200 shadow-2xl border-8 border-violet-600/50">
              <Image src={icon5} alt="icon" width={80} height={60} className="mr-2" />
              <div className="translate-y-6">And Make Your Way to the Biggest Arenas</div>
            </div>
            <Image src={arena} alt="arena" className="w-[1292px] h-[794px] rounded-2xl shadow-2xl  z-10 border-8 border-violet-600/50" />
          </div>
      </div>
      <Footer />
    </div>
  );


  async function getTournamentsData(){
    const tournamentResponse = await fetch("https://esports-project-backend-production.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournamentsData(tournamentData);
  }
}

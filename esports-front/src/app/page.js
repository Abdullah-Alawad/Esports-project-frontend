"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Link from "next/link";

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
   <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10">
    <NavBar />
      <h1>Hello every one</h1>

    {/* ongoing tournaments */}
      <div>
        <div className="flex m-8 p-3 flex-wrap gap-10">
          {tournamentsCards}
        </div>
            <Link href={"/tournaments"} className="rounded-full bg-teal-400 p-5 w-52">See more tournaments</Link>
      </div>
    </div>
  );


  async function getTournamentsData(){
    const tournamentResponse = await fetch("https://selfless-charisma-production.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournamentsData(tournamentData);
  }
}

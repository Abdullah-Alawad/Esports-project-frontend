"use client";
import { useEffect, useState } from "react";
import React from 'react'
import Link from "next/link";

const Tournament = () => {
  const [tournamentsData, setTournamentsData] = useState([]);

    useEffect(()=>{
      getTournamentsData();
    },[])

    const tournamentsCards = tournamentsData && tournamentsData.map(tournament=>{
      return <div key ={tournament._id} className="rounded-xl bg-teal-400">
        <img src={tournament.image} className="w-28 h-56 rounded-xl" />
        <h1>{tournament.game}</h1>
        <h1>Prize: {tournament.prize}</h1>
        <h1>Duration: {tournament.duration}</h1>
      </div>
     }) 

  return (
    <div>
    <div>Tournament</div>
     <div>
        <div className="flex m-8 p-3 flex-wrap gap-10">
          {tournamentsCards}
        </div>
      </div>
    </div>
  )






  async function getTournamentsData(){
    const tournamentResponse = await fetch("https://esports-project-backend-production-d825.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournamentsData(tournamentData);
  }
}

export default Tournament
"use client"
import React from 'react'
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const JoinTournament = () => {
    const [tournamentData, setTournamentData]= useState({});
    useEffect(()=>{
        getTournamentsData();
    },[])

    const teamsCards = tournamentData && tournamentData.teams.map(team=>{
        return(
        <div key ={team._id} className='felx flex-col justify-center'>
            <div>{team.maxPlayer}</div>
        </div>)


    })


  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10">
        <NavBar />
        
        {/* show teams here */}
    </div>
  )

  async function getTournamentsData(){
    const tournamentResponse = await fetch(`https://selfless-charisma-production.up.railway.app/tournament/tournament/${window.location.href.split("=")[1]}`);
    const tournamentData = await tournamentResponse.json();
    console.log(tournamentData);
    setTournamentData(tournamentData);
  }
}

export default JoinTournament
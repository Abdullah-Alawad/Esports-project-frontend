"use client";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../layout";
import React from 'react'
import NavBar from "../components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Tournament = () => {
  const router = useRouter();
  const [tournamentsData, setTournamentsData] = useState([]);
  const {haveToken} = useContext(TokenContext)
    useEffect(()=>{
      getTournamentsData();
    },[])
  
    async function handleJoinTournament(tournamentId){
      const token =localStorage.getItem("token");
      const options={
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "access-control-allow-origin" : "*",
          authorization:token
        },
        body: JSON.stringify({
        tournamentId:tournamentId
      })
      }
      try{  
      const joinResponse = await fetch("https://selfless-charisma-production.up.railway.app/user/joinTournament",options);
      const joinData = await joinResponse.json();
      alert(joinData.message)
      }catch(err){
        alert(err);
      }
    }

    const tournamentsCards = tournamentsData && tournamentsData.map(tournament=>{
      return <div key ={tournament._id} className="rounded-xl bg-[url('../../public/bg1.png')] bg-repeat p-3 flex flex-col justify-center ">
        <img src={tournament.image} className="w-36 h-56 rounded-xl m-auto shadow-2xl mb-2" />
        <h1 className="text-2xl font-bold text-center">{tournament.game}</h1>
        <h1 className="text-xl font-semibold">Prize: <span className="font-bold">{tournament.prize}</span></h1>
        <h1 className="text-xl font-semibold">Duration: <span className="font-bold">{tournament.duration}</span></h1>
        {/* show more info about tournament */}
        
        {/* change stat based on have token and duration and time */}
        {
          tournament.status==="ongoing"?
            <div>Playing</div>
          :
            tournament.status==="upcoming"?
              tournament.isTeamMatch?
                tournament.numberOfTeams!==tournament.teams.length?
                  haveToken?
                  // send tournament id
                    <Link href={{
                      pathname: '/tournaments/joinTournamentTeam',
                      query: { tournamentId: tournament._id },
                    }}>Join now</Link>
                  :
                  <Link href={"/signUpIn"}>Join now</Link>
                :
                <div>tournament is full </div>
              :
              tournament.numberOfPlayers!==tournament.players.length?
              haveToken?
              // send tournament id
                <button onClick={()=>{handleJoinTournament(tournament._id)}}>Join now</button>
              :
              <Link href={"/signUpIn"}>Join now</Link>
              :
                <div>tournament is full</div>
            :
            <></>
        }
      </div>
     }) 

  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10">
    <NavBar />
        <div className="flex m-8 p-3 flex-wrap gap-10">
          {tournamentsCards}
        </div>
    </div>
  )

  async function getTournamentsData(){
    const tournamentResponse = await fetch("https://selfless-charisma-production.up.railway.app/tournament/tournaments");
    const tournamentData = await tournamentResponse.json();
    setTournamentsData(tournamentData);
  }
}

export default Tournament
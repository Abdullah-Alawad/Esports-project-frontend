"use client"
import React from 'react'
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from '@/app/components/Footer';

const JoinTournament = () => {
    const [tournamentData, setTournamentData]= useState({});
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [teamName, setTeamName] = useState("");
    useEffect(()=>{
      const tournamentId =window.location.href.split("=")[1];
      getTournamentsData(tournamentId);
    },[])

    const teamsCards = tournamentData.teams && tournamentData.teams.map(team=>{
        return(
        <div key ={team._id} className='felx flex-col gap-6 justify-center p-5 bg-cyan-500 rounded-xl'>
            <div>{team.name}</div>
            <div>Players {team.players.length}/{team.maxPlayers}</div>
            {team.players.length < team.maxPlayers && <button onClick={()=>handleJoinTeamClick(team._id)}>join team</button>}
        </div>)
    })


  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10 font-custom">
        <NavBar />
        {!showAddTeam?
        //tournaments forms
        <div><div className='flex gap-5'>
          {teamsCards}
        </div>
        {<button className='rounded-xl p-3 bg-cyan-700' onClick={()=>setShowAddTeam(true)}>Add Team</button>}
        </div>:
        // add tournament form here
        <div className='flex flex-col gap-8'> 
          <form onSubmit={handleAddTeamForm}>
            <div className='flex gap-5'>
              <label>Team name</label>
              <input type='text' value = {teamName} onChange={handleTeamNameChange}/>
            </div>
            <input className='cursor-pointer p-5 rounded-xl bg-cyan-600' type='Submit' value={"Add Team"} />
          </form>
        </div>
        }
        <Footer />
    </div>
  )

  async function getTournamentsData(tournamentId){
    const tournamentResponse = await fetch(`https://esports-project-backend-production.up.railway.app/tournament/tournament/${tournamentId}`)
    const tournamentData = await tournamentResponse.json();
    console.log(tournamentData.teams);
    setTournamentData(tournamentData);
  }

  function handleTeamNameChange(e){
    const name = e.target.value;
    setTeamName(name);
  }

  async function handleAddTeamForm(e){
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      const options = {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          authorization : token
        },
        body:JSON.stringify({
          tournamentId:tournamentData._id,
          name: teamName,
          maxPlayers: tournamentData.teamSize
        })
      }
      const addTeamResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/addTeam",options);
      const addTeamData = await addTeamResponse.json();
      alert("team created successfully");
      setShowAddTeam(false);
    }catch(err){
      console.log(err.message);
    }
  }

  async function handleJoinTeamClick(teamId){
    try{
      const token = localStorage.getItem("token");
      const options = {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          authorization : token
        },
        body:JSON.stringify({
          teamId,
          password: "",
        })
      }
      const joinTeamResponse= await fetch("https://esports-project-backend-production.up.railway.app/user/joinTeam",options);
      const joinTeamData = await joinTeamResponse.json();
      alert(joinTeamData.message);
    }catch(err){
      console.log(err.message);
    }
  
  }

}

export default JoinTournament
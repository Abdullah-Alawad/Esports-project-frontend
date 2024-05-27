"use client"
import React from 'react'
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from '@/app/components/Footer';
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import Image from 'next/image';
import icon1 from "../../../../public/mini3-t.png"
import icon2 from "../../../../public/mini4-t.png"
import icon3 from "../../../../public/mini20.png"
import icon4 from "../../../../public/mini21.png"
import icon5 from "../../../../public/tournament.png"

const JoinTournament = () => {
  const alertSuccess = (message) => toast.success(message);

    const [tournamentData, setTournamentData]= useState({});
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [teamName, setTeamName] = useState("");
    useEffect(()=>{
      const tournamentId =window.location.href.split("=")[1];
      getTournamentsData(tournamentId);
    },[])

    const teamsCards = tournamentData.teams && tournamentData.teams.map(team=>{
        return(
        <div key ={team._id} className="felx flex-col gap-6 mb-10 justify-center p-5 bg-[url('../../public/bg1.png')] bg-repeat rounded-xl border-8 border-violet-500 hover:border-violet-800">
            <div className='flex'>
              <Image src={icon5} width={55} height={55} className='mr-3 ' />
              <div className='font-extrabold text-4xl translate-y-2'>Team Card</div>
            </div>
            <div className='font-semibold text-2xl text-slate-200'>{team.name}</div>
            <div className='font-semibold text-xl text-yellow-200'>Players {team.players.length}/{team.maxPlayers}</div>
            {team.players.length < team.maxPlayers && <button className="px-6 py-1 mt-2 translate-x-12 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat  text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" onClick={()=>handleJoinTeamClick(team._id)}>join team</button>}
        </div>)
    })


  return (
    <div className="selection:bg-violet-700/70  bg-[url('../../public/bg2.png')] bg-repeat pt-10 font-custom">
        <NavBar />
        <div className='flex flex-row justify-center mb-10 m-auto text-center'>
          <Image src={icon1} alt="icon" width={70} height={50}/>
          <div className='font-extrabold text-6xl'>Add Teams</div>
          <Image src={icon2} alt="icon" width={70} height={50}/>
        </div>
        {!showAddTeam?
        //tournaments forms
        <div className='flex flex-col items-center justify-center mb-28'>
          <div className='flex gap-5'>
          {teamsCards}
          </div>
          {<button className="rounded-2xl text-xl border-8 border-violet-400 hover:border-violet-800 text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 font-bold p-3 bg-[url('../../public/bg1.png')] bg-repeat" onClick={()=>setShowAddTeam(true)}>Add Team</button>}
        </div>:
        // add tournament form here
        <div className='flex flex-col gap-8'> 
          <div className="text-slate-200 font-bold text-3xl mx-96 mt-10 mb-5 px-5 pt-5 leading-relaxed h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
            Add the team to create a new team
          </div>
          <form className='flex flex-col justify-start items-center' onSubmit={handleAddTeamForm}>
            <div className='flex gap-5 mb-8'>
              <label className='text-2xl font-bold'>Team name</label>
              <input type='text' className="p-1 font-semibold text-xl bg-[url('../../public/bg1.png')] bg-repeat rounded-lg text-slate-200" value = {teamName} onChange={handleTeamNameChange}/>
            </div>
            <input className="cursor-pointer mb-10 rounded-2xl text-xl border-8 border-violet-400 hover:border-violet-800 text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 font-bold p-3 bg-[url('../../public/bg1.png')] bg-repeat" type='Submit' value={"Add Team"} />
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
      alertSuccess("team created successfully");
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
      alertSuccess(joinTeamData.message);
    }catch(err){
      console.log(err.message);
    }
  
  }

}

export default JoinTournament
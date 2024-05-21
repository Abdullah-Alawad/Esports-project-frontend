"use client"
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'
import { useState, useEffect } from 'react';
import NavBar from '@/app/components/NavBar';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps  } from '@sportsgram/brackets';

const Tournament = () => {
  const [tournamentData,setTournamentData] = useState({});
  const [playerRole, setPlayerRole]= useState("");


  async function getTournamentData(){
    const tournamentResponse = await fetch(`https://esports-project-backend-production.up.railway.app/tournament/tournament/${window.location.href.split("=")[1]}`)
    const tournamentData = await tournamentResponse.json();
    console.log(tournamentData)
    setTournamentData(tournamentData);
  }

  async function getPlayerRole(){
    const token = localStorage.getItem("token");
    const options = {
      headers:{
        "Content-Type":"application/json",
        authorization:token
      }
    }

    const playerRoleResponse = await fetch(`https://esports-project-backend-production.up.railway.app/user/playerRole/${window.location.href.split("=")[1]}`,options)
    const playerRoleData = await playerRoleResponse.json();
    console.log(playerRoleData);
    if(!playerRoleData.role){
      //redirect
      alert("you shouldn't be here");
      setPlayerRole("hello");
    }
    setPlayerRole(playerRoleData.role);
  }

  async function handleCancelTournament(){
    tournamentData.status="canceled";
    try{
      const token = localStorage.getItem("token");
      const options = {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json",
          authorization: token
        },
        body: JSON.stringify(tournamentData)
      }
      const cancelTournamentResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/editTournament/",options)
      alert("canceled successfully");
      //redirect to tournaments page
    }catch(err){
      console.log(err);
    }
  }

  async function handleStartTournament(){
    if(tournamentData.isTeamMatch){
      for(let i=0;i< tournamentData.teams.length; i+=2){
        tournamentData.teamMatches.push({team1:tournamentData.teams[i], team2: tournamentData.teams[i+1]})
      }
  }
    else{
      for(let i=0;i< tournamentData.teams.length; i+=2){
        tournamentData.teamMatches.push({player1:tournamentData.players[i], player2: tournamentData.players[i+1]})
      }
    }
    try{
      const token = localStorage.getItem("token");
      const options = {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json",
          authorization: token
        },
        body: JSON.stringify(tournamentData)
      }
      const createMatchRespnose = await fetch("https://esports-project-backend-production.up.railway.app/user/editTournament/",options)
      alert("match created successfully successfully");
      //redirect to tournaments page
    }catch(err){
      console.log(err);
    }
  }

  async function handleNextRound(){
    try{
      const token = localStorage.getItem("token");
      const options = {
        method:"PUT",
        headers:{
          "Content-Type" : "application/json",
          authorization: token
        },
        body: JSON.stringify(tournamentData)
      }
      const nextRoundResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/editTournament/",options)
      alert("moving to the next round");
      //refresh page
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getTournamentData();
    getPlayerRole()
  },[])

  //players / teams
  const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}) => {
    return (
      <Seed mobileBreakpoint={breakpoint} >
        <SeedItem>
          <div>
            <span className='hover:text-red-500' onClick={()=>alert(seed.teams[0].name+ "loses")}><SeedTeam>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam></span>
            <span className='hover:text-red-500' onClick={()=>alert(seed.teams[1].name+ "loses")}><SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam></span>
          </div>
        </SeedItem>
      </Seed>
    );
  }
  let remainingTeamsCount = 8;
  // tournamentData && tournamentData.teams.foreach(team=>{
  //   if(team.status!=="lost")
  //     remainingTeamsCount++;
  // })

  //rounds
  const rounds=[];
  // if(Object.keys(tournamentData).length!==0)
  // for(let i = Math.log2(tournamentData && tournamentData.teams.length), currRound=1, currTeam=0; i>=1;i--,currRound++){
  //   rounds.push({title: `round ${currRound}`,seeds:[]});
  //     for(let j = 0 ;j< Math.pow(2,i)/2 ;j++,currTeam++){
  //       if(i>=Math.log2(remainingTeamsCount)){
  //           rounds[currRound-1].seeds.push(
  //             {
  //               id:i,
  //               date:new Date().toDateString(),
  //               teams:[{name:tournamentData.teams[currTeam].name},{name:tournamentData.teams[currTeam+1].name}]
  //             })
  //       }else{
  //           rounds[currRound-1].seeds.push(
  //           {
  //             id:i,
  //             date:new Date().toDateString(),
  //             teams:[{name:`----`},{name:`----`}]
  //           })
  //       }
  //     }
  // }

  if(Object.keys(tournamentData).length!==0)
    for(let i= Math.log2(tournamentData && tournamentData.teams.length), currRound=1 ; i>=1 ; i--,currRound++){
      rounds.push({title: `round ${currRound}`,seeds:[]});
      for (let j=0; j< Math.pow(2,i)/2; j++)
        if(i>=Math.log2(remainingTeamsCount)){
          rounds[currRound-1].seeds.push(
            {
              id:i,
              date:new Date().toDateString(),
              teams:[{name:tournamentData.teamMatches[i].team1},{name:tournamentData.teamMatches[i].team2}]
            })
      }else{
          rounds[currRound-1].seeds.push(
          {
            id:i,
            date:new Date().toDateString(),
            teams:[{name:`----`},{name:`----`}]
          })
      }
    }

  return (
    <div className="font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10 flex flex-col justify-center items-center ">
    <NavBar />
    {/* create cancel tournament button and it'll chagne the tournament status to canceled */}


    {/* tournament brackets */}
    <Bracket rounds={rounds} renderSeedComponent={CustomSeed}/>
    {playerRole==="admin" && 
    <div className='flex gap-10'>
      <button className='bg-green-600 p-3 rounded-xl' onClick={handleNextRound}>Next round</button>
      <button className='bg-red-600 p-3 rounded-xl' onClick={handleCancelTournament}>Cancel tournament</button>
      {tournamentData&&
        tournamentData.isTeamMatch?
          tournamentData.teamMatches.length===0 &&<button className='bg-blue-600 p-3 rounded-xl' onClick={handleStartTournament}>Start tournament</button>
          :tournamentData.playerMatches.length===0 &&<button className='bg-blue-600 p-3 rounded-xl' onClick={handleStartTournament}>Start tournament</button>
       }
    </div>}
    </div>
  )
}
export default Tournament
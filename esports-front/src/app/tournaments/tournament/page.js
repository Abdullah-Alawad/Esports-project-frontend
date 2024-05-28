"use client"
import { redirect } from 'next/dist/server/api-utils';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps  } from '@sportsgram/brackets';
import { useRouter } from 'next/navigation';

const Tournament = () => {
  const router = useRouter();
  const alertWarning = (message) => toast.warning(message);
  const alertSuccess = (message) => toast.warning(message);

  const [tournamentData,setTournamentData] = useState({});
  const [playerRole, setPlayerRole]= useState("");


  function getTournamentData() {
    return new Promise((resolve, reject) => {
      fetch(`https://esports-project-backend-production.up.railway.app/tournament/tournament/${window.location.href.split("=")[1]}`)
        .then(tournamentResponse => {
          if (!tournamentResponse.ok) {
            throw new Error('Failed to fetch tournament data');
          }
          return tournamentResponse.json();
        })
        .then(tournamentData => {
          console.log(tournamentData);
          // Assuming setTournamentData is defined elsewhere

          //add winning team
          // let remainingTeams = 0;
          // for(let i = 0; i < tournamentData.teams.length;i++){
          //   if(tournamentData.teams[i].status==="remaining")
          //     remainingTeams++;
          // }

          // if(remainingTeams===1){
          //   for(let i = 0; i < tournamentData.teams.length;i++){
          //     if(tournamentData.teams[i].status==="remaining")
          //       {
          //         tournamentData.winningTeam = teams[i];

          //       }
          //   }
          // }

          setTournamentData(tournamentData);
          resolve(tournamentData);
        })
        .catch(error => {
          console.error('Error fetching tournament data:', error);
          reject(error);
        });
    });
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
    if(!playerRoleData.role){
      router.push("/tournaments")
      alertWarning("You are not registered in this tournment");
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
      router.push("/tournaments")
      alertSuccess("canceled successfully");
      router.push("/")
    }catch(err){
      console.log(err);
    }
  }

  async function handleStartTournament(){
    try{
    if(tournamentData.isTeamMatch){
      for(let i=0;i< tournamentData.teams.length; i+=2){
        tournamentData.teamMatches.push({team1:tournamentData.teams[i], team2: tournamentData.teams[i+1]})
      }
  }
    else{
      for(let i=0;i< tournamentData.players.length; i+=2){
        tournamentData.playerMatches.push({player1:tournamentData.players[i].player, player2:tournamentData.players[i+1].player});
      }
    }
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
      router.push("/touurnaments")
      alertSuccess("match created successfully");
    }catch(err){
      console.log(err);
    }
  }

  async function makeTeamLose(teamId){
    const token = localStorage.getItem("token");
    const options = {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        authorization:token
      },
    }
    const teamLostResponse = await fetch(`https://esports-project-backend-production.up.railway.app/user/editTeam/${teamId}`,options);
    const teamLostData = await teamLostResponse.json();
    alertSuccess(teamLostData.message)
  }

  async function makePlayerLose(playerId){
    const token = localStorage.getItem("token");
    const tempTournamentData = tournamentData;
    try{
      tempTournamentData.players.map(player=>{
        if(player.player._id === playerId)
            player.status="lost";
      })

      console.log(tempTournamentData);
      const options = {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          authorization:token,
        },
        body:JSON.stringify(tempTournamentData)
      }
      
      const playerLostResponse = await fetch(`https://esports-project-backend-production.up.railway.app/user/editTournament`,options);
      const playerLostData = await playerLostResponse.json();
      console.log(playerLostData)
      alert("Player lost")
    }catch(err){
      alert(err.message);
    }
}

 function handleNextRound() {
  getTournamentData()
    .then(tournamentData => {
      if (tournamentData.isTeamMatch) {
        const remainingTeams = [];
        for (let i = 0; i < tournamentData.teams.length; i++) {
          if (tournamentData.teams[i].status === "remaining")
            remainingTeams.push(tournamentData.teams[i]);
        }

        for (let i = 0; i < remainingTeams.length; i += 2) {
          tournamentData.teamMatches.push({
            team1: remainingTeams[i],
            team2: remainingTeams[i + 1]
          });
        }
      } else {
        const remainingPlayers = [];
        for (let i = 0; i < tournamentData.players.length; i++) {
          if (tournamentData.players[i].status === "remaining")
            remainingPlayers.push(tournamentData.players[i]);
        }

        for (let i = 0; i < remainingPlayers.length; i += 2) {
          tournamentData.playerMatches.push({
            player1: remainingPlayers[i].player,
            player2: remainingPlayers[i + 1].player
          });
        }
      }

      const token = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify(tournamentData)
      };

      return fetch("https://esports-project-backend-production.up.railway.app/user/editTournament/", options);
    })
    .then(nextRoundResponse => {
      if (!nextRoundResponse.ok) {
        throw new Error('Failed to move to the next round');
      }
      alertSuccess("Moving to the next round");
      // Refresh page or perform any other actions as needed
    })
    .catch(error => {
      console.error('Error handling next round:', error);
    });
}

  useEffect(()=>{
    getTournamentData();
    getPlayerRole()
  },[])

  //players / teams
  let customSeed;
  if(tournamentData.isTeamMatch){
    customSeed = ({seed, breakpoint, roundIndex, seedIndex}) => {
    return (
      <Seed mobileBreakpoint={breakpoint} >
        <SeedItem>
          <div>
            <span className={`${playerRole==="admin"?'hover:text-red-500 ':'cursor-default'}${seed.teams[0].status==="lost"?'text-red-500 line-through':'cursor-default'}`} onClick={()=>playerRole==="admin" && makeTeamLose(seed.teams[0].id)}><SeedTeam>{seed.teams[0]?.name || 'NO TEAM '}</SeedTeam></span>
            <span className={`${playerRole==="admin"?'hover:text-red-500 ':'cursor-default'}${seed.teams[1].status==="lost"?'text-red-500 line-through':'cursor-default'}`} onClick={()=>playerRole==="admin" && makeTeamLose(seed.teams[1].id)}><SeedTeam>{seed.teams[1]?.name || 'NO TEAM '}</SeedTeam></span>
          </div>
        </SeedItem>
      </Seed>
    );
  }
}else{
   customSeed = ({seed, breakpoint, roundIndex, seedIndex}) => {
    return (
      <Seed mobileBreakpoint={breakpoint} >
        <SeedItem>
          <div>
            <span className={`${playerRole==="admin"?'hover:text-red-500 ':'cursor-default'}${seed.players[0].status==="lost"?'text-red-500 line-through':'cursor-default'}`} onClick={()=>playerRole==="admin" && makePlayerLose(seed.players[0].id)}><SeedTeam>{seed.players[0]?.name || 'NO Player '}</SeedTeam></span>
            <span className={`${playerRole==="admin"?'hover:text-red-500 ':'cursor-default'}${seed.players[1].status==="lost"?'text-red-500 line-through':'cursor-default'}`} onClick={()=>playerRole==="admin" && makePlayerLose(seed.players[1].id)}><SeedTeam>{seed.players[1]?.name || 'NO Player '}</SeedTeam></span>
          </div>
        </SeedItem>
      </Seed>
    );
  }
}
  
  const rounds=[];
  if(Object.keys(tournamentData).length!==0 )
    if(tournamentData.isTeamMatch){
      if(tournamentData.teamMatches.length!=0){

        let remainingTeamsCount=0;
        for(let i= 0;i <tournamentData.teams.length;i++)
          if(tournamentData.teams[i].status==="remaining")
            remainingTeamsCount++;

      for(let i= Math.log2(tournamentData && tournamentData.teams.length), currRound=1,currMatch=0 ; i>=1 ; i--,currRound++){
        rounds.push({title: `round ${currRound}`,seeds:[]});
        for (let j=0; j< Math.pow(2,i)/2; j++, currMatch++)
          if(i>=Math.log2(remainingTeamsCount)){
            rounds[currRound-1].seeds.push(
              {
                id:i,
                date:new Date().toDateString(),
                teams:[{name:tournamentData.teamMatches[currMatch].team1.name, status:tournamentData.teamMatches[currMatch].team1.status, id:tournamentData.teamMatches[currMatch].team1._id},
                        {name:tournamentData.teamMatches[currMatch].team2.name, status:tournamentData.teamMatches[currMatch].team2.status, id:tournamentData.teamMatches[currMatch].team2._id}]
              })
        }else if(i!==0){
            rounds[currRound-1].seeds.push(
            {
              id:i,
              date:new Date().toDateString(),
              teams:[{name:`----`},{name:`----`}]
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

        }
    }else{
      if(tournamentData.playerMatches.length!=0){

        let remainingPlayersCount=0;
        for(let i= 0;i <tournamentData.players.length;i++)
          if(tournamentData.players[i].status==="remaining")
            remainingPlayersCount++;

      for(let i= Math.log2(tournamentData && tournamentData.players.length), currRound=1,currMatch=0 ; i>=1 ; i--,currRound++){
        rounds.push({title: `round ${currRound}`,seeds:[]});
        for (let j=0; j< Math.pow(2,i)/2; j++, currMatch++)
          if(i>=Math.log2(remainingPlayersCount)){
            rounds[currRound-1].seeds.push(
              {
                id:i,
                date:new Date().toDateString(),
                players:[{name:tournamentData.playerMatches[currMatch].player1.username, status:getPlayerStatus(tournamentData.playerMatches[currMatch].player1._id), id:tournamentData.playerMatches[currMatch].player1._id},
                         {name:tournamentData.playerMatches[currMatch].player2.username, status:getPlayerStatus(tournamentData.playerMatches[currMatch].player2._id), id:tournamentData.playerMatches[currMatch].player2._id}]
              })
        }else if(i!==0){
            rounds[currRound-1].seeds.push(
            {
              id:i,
              date:new Date().toDateString(),
              players:[{name:`----`},{name:`----`}]
            })
        }else{
        rounds[currRound-1].seeds.push(
            {
              id:i,
              date:new Date().toDateString(),
              players:[{name:`----`},{name:`----`}]
            })
      }
    }

        }
    }

  return (
    <div className="selection:bg-violet-700/70 font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10 flex flex-col justify-center items-center ">
    <NavBar />
    {/* tournament brackets */}
    <div className="flex flex-row text-black ml-10 w-[1400px] justify-center bg-[url('../../public/bg1.png')] bg-repeat pt-3 rounded-2xl shadow-2xl ">
        <Bracket rounds={rounds}  roundTitleComponent={(title , roundIndex) => {
        return <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bolder', fontSize: '35px' }}>{title}</div>;
      }} renderSeedComponent={customSeed}/>
    </div>
    {playerRole==="admin" && 
    <div className='flex gap-10'>
      {<button className=" border-8 border-slate-200 hover:border-violet-700 shadow-2xl mt-4 mb-5 font-bold text-2xl text-yellow-300 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg1.png')] bg-repeat p-3 rounded-xl" onClick={handleNextRound}>Next round</button>}
      <button className="border-8 border-slate-200 hover:border-violet-700 shadow-2xl mt-4 mb-5 font-bold text-2xl text-red-800 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg1.png')] bg-repeat p-3 rounded-xl" onClick={handleCancelTournament}>Cancel tournament</button>
      {tournamentData&&
        tournamentData.isTeamMatch?
        tournamentData.teamMatches&&tournamentData.teamMatches.length===0 &&<button className=" border-8 border-slate-200 hover:border-violet-700 shadow-2xl mt-4 mb-5 font-bold text-2xl text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg1.png')] bg-repeat p-3 rounded-xl" onClick={handleStartTournament}>Start tournament</button>
          :tournamentData.playerMatches&&tournamentData.playerMatches.length===0 &&<button className=" border-8 border-slate-200 hover:border-violet-700 shadow-2xl mt-4 mb-5 font-bold text-2xl text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg1.png')] bg-repeat p-3 rounded-xl" onClick={handleStartTournament}>Start tournament</button>
       }
    </div>}
    <Footer />
    </div>
  )


  function getPlayerStatus(playerId){
    for(let i =0 ;i<tournamentData.players.length;i++){
      if(tournamentData.players[i].player._id.toString() === playerId.toString())
        return tournamentData.players[i].status;
    }
    return "remaining";
  }

}
export default Tournament
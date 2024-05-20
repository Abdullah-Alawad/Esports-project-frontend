"use client";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../layout";
import React from 'react'
import NavBar from "../components/NavBar";
import Link from "next/link";
const Tournament = () => {
  const [tournamentsData, setTournamentsData] = useState([]);
  const [showCreateTournament, setShowCreateTournament] = useState(false);
  const [newTournamentData, setNewTournamentData] = useState({
    game:"",
    StartDate:"",
    havePrize:false,
    duration:"",
    isTeamMatch:false,
    image:"",
  })
  const {haveToken} = useContext(TokenContext)
    useEffect(()=>{
      getTournamentsData();
    },[])

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
    
      // For radio inputs
      if (type === "radio") {
        setNewTournamentData((prevData) => ({
          ...prevData,
          [name]: value === "true" ? true : false,
        }));
      } else {
        // For other inputs
        setNewTournamentData((prevData) => ({
          ...prevData,
          [name]: type === "number" ? parseInt(value) : value,
        }));
      }
    };
  
    async function handleCreateTournamentSubmit(e){
      e.preventDefault();

      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      const startDate = new Date(newTournamentData.StartDate);

      if (startDate <= today) {
        alert("Start date must be greater than today's date.");
        return false;
      }

      if (parseInt(newTournamentData.duration) <= 0) {
        alert("Duration must be greater than 0.");
        return false;
      }

      if (!newTournamentData.image || !isURL(newTournamentData.image)) {
        alert("Image must be a non-empty string in URL format.");
        return false;
      }

      try{
        const token = localStorage.getItem("token");
        const options = {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*",
            authorization:token
          },
          body:JSON.stringify(newTournamentData),
        }
        const createTournamentResponse = await fetch("https://selfless-charisma-production.up.railway.app/user/createTournament",options)
        const createTournamentData = await createTournamentResponse.json();
        alert(createTournamentData.message);
      }catch(err){
        alert(err.message);
      }

    }
    
    const isURL = (url) => {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlPattern.test(url);
    };

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
      if(tournament.status!=="canceled")
      return <div key ={tournament._id} className="rounded-xl bg-[url('../../public/bg1.png')] bg-repeat p-3 flex flex-col justify-center ">
        <img src={tournament.image} className="w-36 h-56 rounded-xl m-auto shadow-2xl mb-2" />
        <h1 className="text-2xl font-bold text-center">{tournament.game}</h1>
        <h1 className="text-xl font-semibold">Prize: <span className="font-bold">{tournament.prize}</span></h1>
        <h1 className="text-xl font-semibold">Duration: <span className="font-bold">{tournament.duration}</span></h1>
        {/* show more info about tournament */}
        
        {/* change stat based on have token and duration and time */}
        {
          tournament.status==="ongoing"?
            <>
            <div>Playing</div>
            <Link href={{
                      pathname: '/tournaments/tournament',
                      query: { tournamentId: tournament._id },
                    }}>more details</Link>
            </>
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
        {!showCreateTournament? <><div className="m-10">
          <button className="rounded-xl p-4 bg-cyan-600" onClick={()=>setShowCreateTournament(true)}>Create Tournament</button>
        </div>
        <div className="flex m-8 p-3 flex-wrap gap-10">
          {tournamentsCards}
        </div></>:
        <div>
          <form className="flex flex-col gap-7" onSubmit={handleCreateTournamentSubmit}>
            <div className="flex gap-5">
              <label>Game</label>
              <select name="game" value={newTournamentData.game} onChange={handleInputChange}> 
                <option value={"League Of Legends"}>League Of Legends</option>
                <option value={"Dota 2"}>Dota 2</option>
                <option value={"Street Fighters"}>Street Fighters</option>
                <option value={"Overwatch 2"}>Overwatch 2</option>
              </select>
            </div>
            
            <div className="flex gap-5">
              <label>StartDate</label>
              <input name="StartDate" type="datetime-local" value={newTournamentData.StartDate} onChange={handleInputChange}/>
            </div>

            <div className="flex gap-5">
              <label>Prize ?</label>
              <input type="radio" checked={newTournamentData.havePrize} value={true} name="havePrize" onChange={handleInputChange} /> <label>Yes</label>
              <input type="radio" checked={!newTournamentData.havePrize} value={false} name="havePrize" onChange={handleInputChange}/> <label>No</label>
            </div>

            {newTournamentData.havePrize && <div className="flex gap-5">
              <label>Prize amount</label>
              <input type="number" min={5} max={500} value={newTournamentData.prize || 5} onChange={handleInputChange}/>
            </div>}

            <div className="flex gap-5">
              <label></label>
              <label>Team match ?</label>
              <input type="radio" checked={newTournamentData.isTeamMatch} value={true} name="isTeamMatch" onChange={handleInputChange}/> <label>Yes</label>
              <input type="radio" checked={!newTournamentData.isTeamMatch} value={false} name="isTeamMatch" onChange={handleInputChange}/> <label>No</label>
            </div>

            {newTournamentData.isTeamMatch &&
              <div className="flex gap-5">
                <label>Team Size</label>
                <input type="number" min={3} value={newTournamentData.teamSize || 3} name="teamSize" onChange={handleInputChange}/>
              </div>
            }

            {newTournamentData.isTeamMatch &&
              <div className="flex gap-5">
                <label>Number of teams: (must be a power of 2 number)</label>
                <input type="number" min={2} value={newTournamentData.numberOfTeams || 2}name="numberOfTeams" onChange={handleInputChange}/>
              </div>
            }

            {!newTournamentData.isTeamMatch &&
              <div className="flex gap-5">
                <label>Number of Players: (must be a power of 2 number)</label>
                <input type="number" min={2} value={newTournamentData.numberOfPlayers || 2}name="numberOfPlayers" onChange={handleInputChange}/>
              </div>
            }

            <div className="flex gap-5">
              <label>Duration</label>
              <input type="text" name="duration" value={newTournamentData.duration} onChange={handleInputChange}/>
            </div>

            <div className="flex gap-5">
              <label>Image</label>
              <input type="text" name="image" value={newTournamentData.image} onChange={handleInputChange}/>
            </div>

            <input type="submit" className="bg-cyan-600 p-5 rounded-xl cursor-pointer" />
          </form>
          <button className="rounded-xl p-4 bg-cyan-600" onClick={()=>setShowCreateTournament(false)}>Back to tournaments</button>
        </div>
        }
    </div>
  )

  async function getTournamentsData(){
    const tournamentResponse1 = await fetch("https://selfless-charisma-production.up.railway.app/tournament/tournaments");
    const tournamentData1 = await tournamentResponse1.json();
    //check tournaments dates
    for(let i = 0; i < tournamentData1.length;i++){
      if(new Date()>= new Date(tournamentData1[i].StartDate) &&(tournamentData1[i].status!=='canceled' && tournamentData1[i].status !=="finished")){
        await changeTournamentStatus(tournamentData1[i]);
      }
    }

    const tournamentResponse2 = await fetch("https://selfless-charisma-production.up.railway.app/tournament/tournaments");
    const tournamentData2 = await tournamentResponse2.json();
    setTournamentsData(tournamentData2);
  }

  async function changeTournamentStatus(tournament){
    const token = localStorage.getItem("token");
    tournament.status = "ongoing";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(tournament)
    };
    try {
      const updateTournamentResponse = await fetch(
        `https://selfless-charisma-production.up.railway.app/user/editTournament/`,
        options
      );
      if (!updateTournamentResponse.ok) {
        throw new Error("Failed to update tournament status");
      }
      const updateTournamentData = await updateTournamentResponse.json();
    } catch (error) {
      console.error("Error updating tournament status:", error.message);
    }
  }
 
}

export default Tournament
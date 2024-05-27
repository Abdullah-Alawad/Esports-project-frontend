"use client";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../layout";
import React from 'react'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import icon2 from "../../../public/mini4-t.png";
import icon1 from "../../../public/mini3-t.png";
import icon3 from "../../../public/tournament.png";



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
        const createTournamentResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/createTournament",options)
        const createTournamentData = await createTournamentResponse.json();
        console.log(createTournamentData.createdTournament);
        setTournamentsData([...tournamentsData, createTournamentData.createdTournament]);
        setShowCreateTournament(false);
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
      const joinResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/joinTournament",options);
      const joinData = await joinResponse.json();
      alert(joinData.message)
      }catch(err){
        alert(err);
      }
    }

    const tournamentsCards = tournamentsData && tournamentsData.map(tournament=>{
      if(tournament.status!=="canceled")
      return <div key ={tournament._id} className="transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 text-slate-200 rounded-xl bg-[url('../../public/bg1.png')] bg-repeat px-3 flex flex-col justify-center max-w-[300px]">
        <img src={tournament.image} className="w-52 h-80 rounded-xl m-auto shadow-2xl mb-2 mt-7" />
        <h1 className="text-2xl font-bold text-center text-yellow-300">{tournament.game}</h1>
        <h1 className="text-xl font-semibold">Prize: {tournament.prize? <span className="font-bold">{tournament.prize}$</span>: <span>FREE</span>}</h1>
        <h1 className="text-xl font-semibold">Duration: <span className="font-bold">{tournament.duration}</span></h1>
        {/* show more info about tournament */}
        
        {/* change stat based on have token and duration and time */}
        {
          tournament.status==="ongoing"?
            <>
            <div className=" font-bold text-xl text-center text-red-800">Tournament started</div>
            <Link className="w-48 m-auto transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat mb-5 mt-3 text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" href={{
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
                    <Link className="w-48 m-auto transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat mb-5 mt-3 text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" href={{
                      pathname: '/tournaments/joinTournamentTeam',
                      query: { tournamentId: tournament._id },
                    }}>Join now</Link>
                  :
                  <Link className="w-48 m-auto transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat mb-5 mt-3 text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" href={"/signUpIn"}>Join now</Link>
                :
                <div>tournament is full </div>
              :
              tournament.numberOfPlayers!==tournament.players.length?
              haveToken?
              // send tournament id
                <button className="w-48 m-auto transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat mb-5 mt-3 text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" onClick={()=>{handleJoinTournament(tournament._id)}}>Join now</button>
              :
              <Link className="w-48 m-auto transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 bg-[url('../../public/bg2.png')] bg-repeat mb-5 mt-3 text-center font-bold text-2xl rounded-full border-4 border-violet-500 hover:border-violet-800" href={"/signUpIn"}>Join now</Link>
              :
                <div className=" font-bold text-2xl text-center text-red-800">tournament is full</div>
            :
            <></>
        }
      </div>
     }) 

  return (
    <div className="selection:bg-violet-700/70 font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10 flex flex-col items-center">
    <NavBar />
        <div className="flex flex-row justify-center">
          <Image src={icon1} width={90} height={70} />
          <div className="font-extrabold text-6xl text-center translate-y-4">Tournaments</div>
          <Image src={icon2} width={90} height={70} />
        </div>
        {!showCreateTournament? <><div className="m-10">
          <button className="flex font-bold p-4 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 text-3xl shadow-2xl rounded-full border-8 border-slate-200 hover:border-violet-800 bg-[url('../../public/bg1.png')] bg-repeat" onClick={()=>setShowCreateTournament(true)}>
            <Image src={icon3} width={60} height={60} />
            <div className=" ml-2 translate-y-3">Create Tournament</div>
          </button>
        </div>
        <div className="flex m-8 p-3 flex-wrap justify-center gap-10">
          {tournamentsCards}
        </div></>:
        <div>
          <form className="flex flex-col font-bold text-2xl mb-6 text-slate-200 gap-7 bg-[url('../../public/bg1.png')] bg-repeat p-5 shadow-2xl rounded-2xl mt-5" onSubmit={handleCreateTournamentSubmit}>
            <div className="text-center text-3xl text-yellow-300">
              <div>Create Tournament</div>
            </div>
            <div className="flex gap-5">
              <label >Game</label>
              <select name="game" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" value={newTournamentData.game} onChange={handleInputChange}> 
                <option value={"League Of Legends"}>League Of Legends</option>
                <option value={"Dota 2"}>Dota 2</option>
                <option value={"Street Fighters"}>Street Fighters</option>
                <option value={"Overwatch 2"}>Overwatch 2</option>
              </select>
            </div>
            
            <div className="flex gap-5">
              <label>StartDate</label>
              <input name="StartDate" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" type="datetime-local" value={newTournamentData.StartDate} onChange={handleInputChange}/>
            </div>

            <div className="flex gap-5">
              <label>Prize ?</label>
              <input type="radio" checked={newTournamentData.havePrize} value={true} name="havePrize" onChange={handleInputChange} className=""/> <label>Yes</label>
              <input type="radio" checked={!newTournamentData.havePrize} value={false} name="havePrize" onChange={handleInputChange}/> <label>No</label>
            </div>

            {newTournamentData.havePrize && <div className="flex gap-5">
              <label>Prize amount</label>
              <input type="number" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" min={5} max={500} value={newTournamentData.prize || 5} name="prize" onChange={handleInputChange}/>
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
                <input type="number" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" min={3} value={newTournamentData.teamSize || 3} name="teamSize" onChange={handleInputChange}/>
              </div>
            }

            {newTournamentData.isTeamMatch &&
              <div className="flex gap-5">
                <label>Number of teams: (must be a power of 2 number)</label>
                <input type="number" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" min={2} value={newTournamentData.numberOfTeams || 2}name="numberOfTeams" onChange={handleInputChange}/>
              </div>
            }

            {!newTournamentData.isTeamMatch &&
              <div className="flex gap-5">
                <label>Number of Players: (must be a power of 2 number)</label>
                <input type="number" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" min={2} value={newTournamentData.numberOfPlayers || 2}name="numberOfPlayers" onChange={handleInputChange}/>
              </div>
            }

            <div className="flex gap-5">
              <label>Duration</label>
              <input type="text" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" name="duration" value={newTournamentData.duration} onChange={handleInputChange}/>
            </div>

            <div className="flex gap-5">
              <label>Image</label>
              <input type="text" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" name="image" value={newTournamentData.image} onChange={handleInputChange}/>
            </div>

            <input type="submit" className="m-auto bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black cursor-pointer w-44 border-8 border-slate-200 hover:border-violet-800 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300" />
          </form>
          <button className=" mb-4 font-extrabold text-2xl text-yellow-300 bg-[url('../../public/bg1.png')] bg-repeat p-1 rounded-xl shadow-2xl cursor-pointer w-80 border-8 border-slate-200 hover:border-violet-800 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300" onClick={()=>setShowCreateTournament(false)}>Back to tournaments</button>
        </div>
        }
        <Footer />
    </div>
  )

  async function getTournamentsData(){
    const tournamentResponse1 = await fetch("https://esports-project-backend-production.up.railway.app/tournament/tournaments");
    const tournamentData1 = await tournamentResponse1.json();
    //check tournaments dates
    for(let i = 0; i < tournamentData1.length;i++){
      if(new Date()>= new Date(tournamentData1[i].StartDate) &&(tournamentData1[i].status!=='canceled' && tournamentData1[i].status !=="finished")){
        await changeTournamentStatus(tournamentData1[i]);
      }
    }

    const tournamentResponse2 = await fetch("https://esports-project-backend-production.up.railway.app/tournament/tournaments");
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
        `https://esports-project-backend-production.up.railway.app/user/editTournament/`,
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
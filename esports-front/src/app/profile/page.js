"use client"
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
const Profile = () => {
    const [userData, setUserData] = useState({});

    useEffect(()=>{
      getUserData();
    }
  ,[])

    return (
      <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10">
        <NavBar />
      </div>
    )

  async function getUserData(){
    const token =localStorage.getItem("token");
    const userDataResponse = await fetch("https://selfless-charisma-production.up.railway.app/user/profile",{
    method:"GET",  
    headers:{
        "Content-Type":"application/json",
        "access-control-allow-origin" : "*",
        authorization:token
      }
    });
    const userData = await userDataResponse.json();
    console.log(userData)
    setUserData(userData);
  }
}


export default Profile
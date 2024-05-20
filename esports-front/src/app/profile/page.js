"use client"
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Image from 'next/image'
import icon1 from '../../../public/mini6-t.png'
import icon2 from '../../../public/mini7-t.png'
import icon3 from '../../../public/mini15.png'
import icon4 from '../../../public/mini8-t.png'
import icon5 from '../../../public/mini3-t.png'
import icon6 from '../../../public/mini4-t.png'
import icon7 from '../../../public/mini19.png'
const Profile = () => {
    const [userData, setUserData] = useState({});

    useEffect(()=>{
      getUserData();
    }
  ,[])

    const yearOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(0, 4) : null;
    const monthOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(5, 7) : null;
    const dayOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(8, 10) : null;

    const currentDate = new Date();
    const age = currentDate.getFullYear() - yearOfBirth;


    return (
      <div className="font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10">
        <NavBar />
        <div className='flex justify-between'>
          <div className='flex flex-col justify-between'>
            <div>
              <Image src={icon1} alt='icon' className='w-[200px] h-[200px] rotate-12 translate-x-28 translate-y-32'/>
            </div>
            <div>
              <Image src={icon2} alt='icon' className='w-[200px] h-[200px] -rotate-45 translate-x-64 -translate-y-44'/>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center pb-16">
            <div className='font-extrabold text-6xl mb-5 flex flex-row'>
              <Image src={icon5} alt='icon' width={70} height={50} />
              <div>User Profile</div>
              <Image src={icon6} alt='icon' width={70} height={50} />
            </div>
              <div className=" bg-[url('../../public/bg1.png')] bg-repeat shadow-2xl rounded-2xl py-10 px-10 ">
                <div>
                  <Image src={icon7} alt='userAvatar' width={450} height={450} className=' m-auto'/>
                </div>
                <div className='flex flex-col gap-5 font-bold text-3xl mt-10 text-yellow-300'>
                  <div>Name: <span className='text-white ml-5'>{userData.username}</span></div>
                  <div>Email: <span className='text-white ml-5'>{userData.email}</span></div>
                  <div>Phone Number: <span className='text-white ml-5'>{userData.phoneNumber}</span></div>
                  <div>Age: <span className='text-white ml-5'>{age}</span></div>
                  <div>Date Of Birth: <span className='text-white ml-5'>{dayOfBirth}-{monthOfBirth}-{yearOfBirth}</span></div>
                </div>
              </div>
          </div>
          <div className='flex flex-col justify-between'>
            <div>
              <Image src={icon3} alt='icon' className='w-[250px] h-[200px] rotate-45 -translate-x-72 translate-y-32'/>
            </div>
            <div>
              <Image src={icon4} alt='icon' className='w-[230px] h-[200px] -rotate-45 -translate-x-32 -translate-y-32'/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )

  async function getUserData(){
    const token =localStorage.getItem("token");
    const userDataResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/profile",{
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
"use client"
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import icon1 from '../../../public/mini6-t.png'
import icon2 from '../../../public/mini7-t.png'
import icon3 from '../../../public/mini15.png'
import icon4 from '../../../public/mini8-t.png'
import icon5 from '../../../public/mini3-t.png'
import icon6 from '../../../public/mini4-t.png'
import icon7 from '../../../public/mini19.png'
const Profile = () => {

    const alertSuccess = (message) => toast.success(message);
    const alertError = (message) => toast.error(message);

    const [userData, setUserData] = useState({});
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [errors,setErrors] = useState({});

    useEffect(()=>{
      getUserData();
    }
  ,[])

  const handleInputChange = (e) => {
    const propertyName = e.target.name;
    const propertyValue = e.target.value;
    setUserData(
      {...userData, [propertyName]:propertyValue }
    )
    console.log(userData);
  };

    const yearOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(0, 4) : null;
    const monthOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(5, 7) : null;
    const dayOfBirth = userData.dateOfBirth? userData.dateOfBirth.toString().substring(8, 10) : null;

    const currentDate = new Date();
    const age = currentDate.getFullYear() - yearOfBirth;


    return (
      <div className=" selection:bg-violet-700/70 font-custom bg-[url('../../public/bg2.png')] bg-repeat pt-10">
        <NavBar />
        {!showUpdateProfile?
        <div className='flex flex-col'>
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
        <button className=" w-[300px] ml-16 cursor-pointer mb-10 rounded-2xl text-2xl border-8 border-violet-400 hover:border-violet-800 text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 font-bold p-3 bg-[url('../../public/bg1.png')] bg-repeat" onClick={()=>setShowUpdateProfile(true)}>Edit profile</button>
        </div>:
        <div className='flex flex-col items-center'>
          <div className='font-extrabold text-6xl mb-5 flex flex-row'>
              <Image src={icon5} alt='icon' width={70} height={50} />
              <div>Edit Profile</div>
              <Image src={icon6} alt='icon' width={70} height={50} />
          </div>
          <form onSubmit={handleUpdateProfileSubmit}>
              <div className="flex gap-5 mb-5">
                <label className='text-3xl font-bold mr-2 translate-y-2'>Name</label>
                <div className='flex flex-col gap-4'>  
                  <input type="text" className="text-slate-200 font-bold text-2xl pl-3 min-w-[480px] bg-[url('../../public/bg1.png')] bg-repeat min-h-14  rounded-xl border-4 border-violet-900/35" value={userData.username} name="username" onChange={handleInputChange}/>
                  {userData.username &&<div className='text-xl font-bold text-red-900 max-w-[530px]'>{errors.username}</div>}
                </div>
              </div>

              <div className="flex gap-5 mb-5">
                <label className='text-3xl font-bold mr-2 translate-y-2' >Phone number</label>
                <div className='flex flex-col gap-4'>
                  <input type="text" className="text-slate-200 font-bold text-2xl pl-3 bg-[url('../../public/bg1.png')] bg-repeat min-h-14  rounded-xl border-4 border-violet-900/35" value={userData.phoneNumber} name="phoneNumber" onChange={handleInputChange}/>
                  {userData.phoneNumber &&<div className='text-xl font-bold text-red-900 max-w-[530px]'>{errors.phoneNumber}</div>}
                </div>
              </div>
              <input className="translate-x-28 w-[200px] ml-16 cursor-pointer mb-10 rounded-2xl text-2xl border-8 border-violet-400 hover:border-violet-800 text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 font-bold p-3 bg-[url('../../public/bg1.png')] bg-repeat" type='submit'/>
          </form>
          <button className="-translate-x-96 w-[300px] ml-16 cursor-pointer mb-10 rounded-2xl text-2xl border-8 border-violet-400 hover:border-violet-800 text-slate-200 transition ease-in-out delay-80 hover:-translate--1 hover:scale-110 duration-300 font-bold p-3 bg-[url('../../public/bg1.png')] bg-repeat" onClick={()=>setShowUpdateProfile(false)}>Back to profile</button>
        </div>
        }
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

 

  async function handleUpdateProfileSubmit(e){
    e.preventDefault();
    const errors ={};
    if(userData.username.length < 6 || userData.username.length > 25){
      errors.username = 'Username must be between 6 and 25 characters*';
    }else{
      delete errors.username;
    }

    if (!/^07[789]\d{7}$/.test(userData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be in the format 07[7,8,9]XXXXXXX*';
    }
    else{
      delete errors.phoneNumber;
    }

    setErrors({...errors});

    if( Object.keys(errors).length < 1)
      {
        const token = localStorage.getItem("token");
        const options={
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*",
            authorization:token
          },
        body: JSON.stringify(userData)
      }
      try{
        const editUserDataResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/editProfile",options);
        const updatedUserData = await editUserDataResponse.json();
        if(editUserDataResponse.status===200)
          {
            setUserData(updatedUserData);
            alertSuccess("info updated successufully");
            setShowUpdateProfile(false);
          }else{
            alertError("please check that the data you entered is correct");
          }
      }catch(err){
        alertError(err.message);
      }
    }else{
      alertError("please check that the data you entered is correct");
    }
  }

}


export default Profile
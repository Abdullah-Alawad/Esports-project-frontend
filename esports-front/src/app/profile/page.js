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
        <>
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
        <button onClick={()=>setShowUpdateProfile(true)}>Edit profile</button>
        </>:
        <div>
          <form onSubmit={handleUpdateProfileSubmit}>
              <div className="flex gap-5">
                <label>Name</label>
                <input type="text" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" value={userData.userName} name="userName" onChange={handleInputChange}/>
                {userData.userName &&<div className='text-xl text-red-900 max-w-[530px]'>{errors.userName}</div>}
              </div>

              <div className="flex gap-5">
                <label>Phone number</label>
                <input type="text" className="bg-[url('../../public/bg2.png')] bg-repeat p-1 rounded-xl shadow-2xl text-black" value={userData.phoneNumber} name="phoneNumber" onChange={handleInputChange}/>
                {userData.phoneNumber &&<div className='text-xl text-red-900 max-w-[530px]'>{errors.phoneNumber}</div>}
              </div>
              <input type='submit' className='cursor-pointer'/>
          </form>
          <button onClick={()=>setShowUpdateProfile(false)}>Back to profile</button>
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
    if(userData.userName.length < 6 || userData.userName.length > 25){
      errors.userName = 'Username must be between 6 and 25 characters*';
    }else{
      delete errors.userName;
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
            alert("info updated successufully");
            setShowUpdateProfile(false);
          }else{
            alert("please check that the data you entered is correct");
          }
      }catch(err){
        alert(err.message);
      }
    }else{
      alert("please check that the data you entered is correct");
    }
  }

}


export default Profile
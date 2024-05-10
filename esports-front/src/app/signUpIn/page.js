"use client"
import React, { useState } from 'react'
import NavBar from '../components/NavBar'

const SignUpIn = () => {
  const [signInData, setSignInData] = useState([]);
  const [signUpData, setSignUpData] = useState([]);
  const [signUpErorrs, setSignUpErrors] = useState([]);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  function handleSignUpDataChange(event){
    const propertyName = event.target.name;
    const propertyValue = event.target.value;
    setSignUpData(
      {...signUpData, [propertyName]:propertyValue }
    )
  }

  function handleSignInDataChange(event){
    const propertyName = event.target.name;
    const propertyValue = event.target.value;
    setSignInData(
      {...signInData, [propertyName]:propertyValue }
    )
  }

  async function handleSignUpSubmit(event){
    event.preventDefault();
    //validation
    const properties = ["userName", "email", "password1", "password2", "birthData", "phoneNumber", "phoneNumber", "image"];
    properties.forEach(property => {
      if(property){
        
      }else{

      }
    });





    const options={
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(signUpData)
    }
    try{
    const signUpResponse = await fetch("https://esports-project-backend-production-d825.up.railway.app/user/signup",options)
    const signUpData  = await signUpResponse.json();
    const token = signUpData;
    localStorage.setItem("token",token);
    //redirect to home page
    }catch(err ){
      console.log(err);
    }
  }

  async function handleSignInSubmit(event){
    event.preventDefault();
    const options={
      method:"POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(signInData)
    }
    try{
    const signInResponse = await fetch("https://esports-project-backend-production-d825.up.railway.app/user/login",options)
    const signInData  = await signInResponse.json();
    const token = signInData;
    localStorage.setItem("token",token);
    //redirect to home page
    alert("hello");
    }catch(err ){
      console.log(err);
    }
  }
  
  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat pt-10">
      <NavBar />
      {alreadySignedUp?
      <div>
      {/* sign In form */}
      <div>
        <div>Sign In</div>
        <form className='flex flex-col items-start gap-5' onSubmit={handleSignInSubmit}>
          <div className='flex gap-5'>
            <label>Email: </label>
            <input type='email' name='email' value={signInData.email} onChange={handleSignInDataChange}/>
          </div>
          <div className='flex gap-5'>
            <label>Password: </label>
            <input type='password' name='password' value={signInData.password} onChange={handleSignInDataChange}/>
          </div>
          <input className='bg-blue-400 p-4 rounded-lg' type='submit' value='Sign In' />
        </form>
        <div className='underline text-blue-800 cursor-pointer' onClick={()=>setAlreadySignedUp(val=>!val)}>Sign Up</div>
      </div>
    </div>
      :<div>
        {/* sign up form */}
        <div>
          <div>Sign up</div>
          <form className='flex flex-col items-start gap-5' onSubmit={handleSignUpSubmit}>
            <div className='flex gap-5'>
              <label>User name: </label>
              <input type='text' name='userName' value={signUpData.userName} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Email: </label>
              <input type='email' name='email' value={signUpData.email} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Password: </label>
              <input type='password' name='password1' value={signUpData.password1} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Confirm password: </label>
              <input type='password' name='password2' value={signUpData.password2} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Birth date: </label>
              <input type='date' name='dateOfBirth' value={signUpData.dateOfBirth} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Phone number: </label>
              <input type='text' name='phoneNumber' value={signUpData.phoneNumber} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Profile image: </label>
              <input type='text' name='image' value={signUpData.image} onChange={handleSignUpDataChange}/>
            </div>
            <input className='bg-blue-400 p-4 rounded-lg' type='submit' value='Sign Up' />
          </form>
          <div className='underline text-blue-800 cursor-pointer' onClick={()=>setAlreadySignedUp(val=>!val)}>Already signed up?</div>
        </div>
      </div>}
    </div>
  )
}

export default SignUpIn
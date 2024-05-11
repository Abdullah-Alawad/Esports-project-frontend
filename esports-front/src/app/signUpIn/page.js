"use client"
import React, { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import { TokenContext } from "../layout";
const SignUpIn = () => {
  const [signInData, setSignInData] = useState([]);
  const [signUpData, setSignUpData] = useState({
    userName: '',
    email: '',
    password1: '',
    password2: '',
    dateOfBirth: '',
    phoneNumber: ''
  });
  const [signUpErrors, setSignUpErrors] = useState({});
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const {setHaveToken} = useContext(TokenContext)

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

    if (signUpData.userName.length < 6 || signUpData.userName.length > 25) {
      signUpErrors.userName = 'Username must be between 6 and 25 characters';
    }else{
      delete signUpErrors.userName;
    }


    if (signUpData.password1.length < 8) {
      signUpErrors.password1 = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}/.test(signUpData.password1)) {
      signUpErrors.password1 = 'Password must contain a capital letter, 2 numbers, and a special character';
    }else{
      delete signUpErrors.password1;
    }


    if (signUpData.password1 !== signUpData.password2) {
      signUpErrors.password2 = 'Passwords do not match';
    }else{
      delete signUpErrors.password2;
    }

    if (!/^07[789]\d{7}$/.test(signUpData.phoneNumber)) {
      signUpErrors.phoneNumber = 'Phone number must be in the format 07[7,8,9]XXXXXXX';
    }
    else{
      delete signUpErrors.phoneNumber;
    }
    
    const currentDate = new Date();
    const birthDate = new Date(signUpData.dateOfBirth);
    const minBirthDate = new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), currentDate.getDate());
    if (birthDate > minBirthDate) {
      signUpErrors.dateOfBirth = 'You must be at least 12 years old to sign up';
    }else{
      delete signUpErrors.birthDate;
    }

    if( Object.keys(signUpErrors).length < 1)
      {
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
      setHaveToken(true);
      //redirect to home page
      }catch(err ){
        console.log(err);
      }
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
    setHaveToken(true);
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
              {signUpErrors.userName &&<div>{signUpErrors.userName}</div>}
            </div>
            <div className='flex gap-5'>
              <label>Email: </label>
              <input type='email' name='email' value={signUpData.email} onChange={handleSignUpDataChange}/>
            </div>
            <div className='flex gap-5'>
              <label>Password: </label>
              <input type='password' name='password1' value={signUpData.password1} onChange={handleSignUpDataChange}/>
              {signUpErrors.password1 &&<div>{signUpErrors.password1}</div>}
            </div>
            <div className='flex gap-5'>
              <label>Confirm password: </label>
              <input type='password' name='password2' value={signUpData.password2} onChange={handleSignUpDataChange}/>
              {signUpErrors.password2 &&<div>{signUpErrors.password2}</div>}
            </div>
            <div className='flex gap-5'>
              <label>Birth date: </label>
              <input type='date' name='dateOfBirth' value={signUpData.dateOfBirth} onChange={handleSignUpDataChange}/>
              {signUpErrors.birthDate &&<div>{signUpErrors.birthDate}</div>}
            </div>
            <div className='flex gap-5'>
              <label>Phone number: </label>
              <input type='text' name='phoneNumber' value={signUpData.phoneNumber} onChange={handleSignUpDataChange}/>
              {signUpErrors.phoneNumber &&<div>{signUpErrors.phoneNumber}</div>}
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
"use client"
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import Image from 'next/image';
import poster from "../../../public/poster1.png"
import logo from "../../../public/controller-t.png"
import { TokenContext } from "../layout";
import { useRouter } from 'next/navigation'

const SignUpIn = () => {
  const alertWarning = (message) => toast.warning(message);
  const alertSuccess = (message) => toast.success(message);

  const router = useRouter();
  const [signInData, setSignInData] = useState({});
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
    dateOfBirth: '',
    phoneNumber: ''
  });
  const [signUpErrors, setSignUpErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const {setHaveToken} = useContext(TokenContext)

  function handleSignUpDataChange(event){
    const propertyName = event.target.name;
    const propertyValue = event.target.value;
    setSignUpData(
      {...signUpData, [propertyName]:propertyValue }
    )
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleSignInDataChange(event){
    const propertyName = event.target.name;
    const propertyValue = event.target.value;
    setSignInData(
      {...signInData, [propertyName]:propertyValue }
    )
  }

  async function handleSignUpSubmit(event){
    event.preventDefault();
    const errors ={};
    if (signUpData.username.length < 6 || signUpData.username.length > 25) {
      errors.username = 'Username must be between 6 and 25 characters*';
    }else{
      delete errors.username;
    }


    if (signUpData.password1.length < 8) {
      errors.password1 = 'Password must be at least 8 characters long*';
    } else if (!/(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}/.test(signUpData.password1)) {
      errors.password1 = 'Password must contain a capital letter, 2 numbers, and a special character*';
    }else{
      delete errors.password1;
    }


    if (signUpData.password1 !== signUpData.password2) {
      errors.password2 = 'Passwords do not match*';
    }else{
      delete errors.password2;
    }

    if (!/^07[789]\d{7}$/.test(signUpData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be in the format 07[7,8,9]XXXXXXX*';
    }
    else{
      delete errors.phoneNumber;
    }
    
    const currentDate = new Date();
    const birthDate = new Date(signUpData.dateOfBirth);
    const minBirthDate = new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), currentDate.getDate());
    if (birthDate > minBirthDate) {
      errors.dateOfBirth = 'You must be at least 12 years old to sign up*';
    }else{
      delete errors.birthDate;
    }
    setSignUpErrors({...errors});
    if( Object.keys(errors).length < 1)
      {
        const options={
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*",
          },
        body: JSON.stringify(signUpData)
      }
      try{
      const signUpResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/signup",options)
      const signUpData  = await signUpResponse.json();
      const token = signUpData;
      console.log(signUpData);
      if(signUpResponse.status===200){
        localStorage.setItem("token",token);
        setHaveToken(true);
        router.push('/')
        alertSuccess("Signed up Successfully!")
      }
        else{
        alertWarning("Please check that the data you entered are correct");
        }
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
    const signInResponse = await fetch("https://esports-project-backend-production.up.railway.app/user/login",options)
    const signInData  = await signInResponse.json();
    const token = signInData;
      if(signInResponse.status===200){
    localStorage.setItem("token",token);
    setHaveToken(true);
    router.push('/')
    alertSuccess("Signed in Successfully!")}
    else
    alertWarning('Wrong email or password');
    }catch(err ){
      console.log(err);
    }
  }
  
  return (
    <div className="selection:bg-violet-700/70 font-custom bg-[url('../../public/bg1.png')] bg-repeat pt-5 pb-24 pr-10">
      <div className='flex flex-row '>
        <div>
          <Image src={poster} className='w-[750px] rounded-lg shadow-2xl ml-11 mr-28 mt-10' />
        </div>
        {alreadySignedUp?
        <div>
        {/* sign In form */}
        <div>
          <div className="flex justify-center  bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl w-[1100px]">
            <Image src={logo} className='w-[150px] mr-7' />
            <div className='font-extrabold text-7xl mb-6 mt-7 '>Sign in</div>
          </div>
          <form className='flex flex-col items-center gap-8 font-bold text-3xl ml-10 mt-10 text-yellow-300' onSubmit={handleSignInSubmit}>
            <div className='flex gap-5'>
              {/* <label>Email: </label> */}
              <input type='email' placeholder='email*' name='email' value={signInData.email} onChange={handleSignInDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>
              </div>
            <div className='flex flex-col gap-5'>
              {/* <label>Password: </label> */}{showPassword? 
                (<input type='text' placeholder='password*' name='password' value={signInData.password} onChange={handleSignInDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>)
                :
                (<input type='password' placeholder='password*' name='password' value={signInData.password} onChange={handleSignInDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>)
                }
                <div className='translate-x-8 -translate-y-4'>
                  <input type='checkbox' checked={showPassword} onChange={toggleShowPassword} className='w-5 h-5 text-yellow-400 accent-yellow-300 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  <label className='text-xl ml-2 mb-2'>show password</label>
                </div>
            </div>
            <input className="text-violet-900 bg-[url('../../public/bg2.png')] bg-repeat hover:bg-[url('../../public/bg1.png')] hover:bg-repeat border-8 border-violet-800 rounded-3xl shadow-2xl py-6 px-11 cursor-pointer	" type='submit' value='Sign In' />
            <div className="flex bg-[url('../../public/bg2.png')] bg-repeat px-10 py-5 rounded-full shadow-2xl">
              <div>Never signed up?</div>
              <div className='underline text-blue-800 cursor-pointer' onClick={()=>setAlreadySignedUp(val=>!val)}>Sign Up</div>
            </div>
          </form>
          
        </div>
      </div>
        :<div>
          {/* sign up form */}
          <div>
            <div className="flex justify-center  bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl w-[1100px]">
              <Image src={logo} className='w-[150px] mr-7' />
              <div className='text-yellow-300 font-extrabold text-7xl mb-6 mt-7 '>Sign up</div>
            </div>
            <form className='flex flex-col items-center gap-8 font-bold text-3xl ml-10 mt-10 text-yellow-300' onSubmit={handleSignUpSubmit}>
              <div className='  gap-5'>
                {/* <label className=''>User name: </label> */}
                <input type='text' placeholder='username*' name='username' value={signUpData.username} onChange={handleSignUpDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>
                {signUpErrors.username &&<div className='text-xl text-red-900 max-w-[530px]'>{signUpErrors.username}</div>}
              </div>
              <div className='flex gap-36'>
                {/* <label>Email: </label> */}
                <input type='email' placeholder='email*' name='email' value={signUpData.email} onChange={handleSignUpDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>
              </div>
              <div className='flex flex-col gap-5'>
                {/* <label>Password: </label> */}
                {showPassword? 
                (<input type='text' placeholder='password*' name='password1' value={signUpData.password1} onChange={handleSignUpDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>)
                :
                (<input type='password' placeholder='password*' name='password1' value={signUpData.password1} onChange={handleSignUpDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>)
                }
                <div className='translate-x-8 -translate-y-4'>
                  <input type='checkbox' checked={showPassword} onChange={toggleShowPassword} className='w-5 h-5 text-yellow-400 accent-yellow-300 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'/>
                  <label className='text-xl ml-2 mb-2'>show password</label>
                </div>
                {signUpErrors.password1 &&<div className='text-xl text-red-900 max-w-[530px]'>{signUpErrors.password1}</div>}
              </div>
              <div className=' gap-5'>
                {/* <label>Confirm password: </label> */}
                <input type='password' placeholder='confirm password*' name='password2' value={signUpData.password2} onChange={handleSignUpDataChange} className="placeholder-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>
                {signUpErrors.password2 &&<div className='text-xl text-red-900 max-w-[530px]'>{signUpErrors.password2}</div>}
              </div>
              <div className=' gap-5'>
                <label className='block'>Birth date </label>
                <input type='date' name='dateOfBirth' value={signUpData.dateOfBirth} onChange={handleSignUpDataChange} className="placeholder-cyan-400 text-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-32 border-4 border-yellow-300"/>
                {signUpErrors.birthDate &&<div className='text-xl text-red-900 max-w-[530px]'>{signUpErrors.birthDate}</div>}
              </div>
              <div className='  gap-5'>
                {/* <label>Phone number: </label> */}
                <input type='text' placeholder='phone number*' name='phoneNumber' value={signUpData.phoneNumber} onChange={handleSignUpDataChange} className="placeholder-yellow-300 text-yellow-300 bg-[url('../../public/bg2.png')] bg-repeat rounded-3xl shadow-2xl py-6 px-11 border-4 border-yellow-300"/>
                {signUpErrors.phoneNumber &&<div className='text-xl text-red-900 max-w-[530px]'>{signUpErrors.phoneNumber}</div>}
              </div>
              <input className="text-violet-900 bg-[url('../../public/bg2.png')] bg-repeat hover:bg-[url('../../public/bg1.png')] hover:bg-repeat border-8 border-violet-800 rounded-3xl shadow-2xl py-6 px-11 cursor-pointer	" type='submit' value='Sign Up'/>
              <div className="flex bg-[url('../../public/bg2.png')] bg-repeat px-10 py-5 rounded-full shadow-2xl">
                <div>Already Signed up?</div>
                <div className='underline text-blue-800 cursor-pointer' onClick={()=>setAlreadySignedUp(val=>!val)}>Sign in</div>
              </div>
            </form>
                      
          </div>
        </div>}
    </div>
  </div>
  )
}

export default SignUpIn
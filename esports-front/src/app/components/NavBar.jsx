import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='flex flex-row m-2 px-9 py-5 rounded-full bg-cyan-400 justify-between'>
         <div className='flex gap-8'>
         <Link href={"/"}>Home page and logo here</Link>
         <Link href={"/tournaments"}>Tournaments</Link>
         </div>

         {/* make this conditional rendering based on if user signed in */}
         <div className='flex gap-8'>
         <Link href={"/profile"}>Profile</Link>
         <Link href={"/signUpIn"}>Sign in</Link>
         </div>
    </div>
  )
}

export default NavBar
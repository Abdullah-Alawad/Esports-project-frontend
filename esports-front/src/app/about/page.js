import React from 'react'
import NavBar from '../components/NavBar'
import Image from 'next/image'
import Link from 'next/link';
import Footer from '../components/Footer';

import abdullah from "../../../public/abdullah.jpg";
import hassan from "../../../public/hassan2.JPG";
import logo from '../../../public/logo-t.png'
import mini1 from '../../../public/mini1-t.png'
import mini2 from '../../../public/mini2-t.png'
import controller from '../../../public/controller-t.png'


const about = () => {
  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat font-custom pt-7">
      <NavBar />
      <div className='flex flex-col justify-center items-center'>
        <div className='font-extrabold text-6xl ml-5 mt-3 '>About EplayJO</div>
        <div className='flex  justify-center mx-10 mb-5'>
          <div className="m-5 flex flex-col items-center">
                <Image src={abdullah} alt='Abdullah Alawad' width={1500} className='rounded-2xl ml-12 shadow-2xl'/>
                <p className="font-bold text-2xl mb-3 ml-7">Abdullah Alawad</p>
                <div className='ml-8'>
                  <Link target="_blank" className="px-4 mx-1 min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full  mb-2" href="https://www.linkedin.com/in/abdullah-alawad-0989b7269/">Linkedin</Link>
                  <Link target="_blank" className="px-4 mx-1 min-w-[105px] max-w-[106px] font-bold text-center bg-violet-800 hover:bg-purple-500 p-1 rounded-full  mb-2" href="https://github.com/Abdullah-Alawad">Github</Link>
                </div>
          </div>
          <div>
            <div className="font-bold text-3xl mx-48 mt-10 mb-5 px-5 pt-5 leading-relaxed h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
                Welcome to EplayJo, the premier destination for gamers across Jordan!
                Founded by Abdullah Alawad and Hassan AbuGhareeb, EplayJo is dedicated to providing a platform where
                players can engage in official, organized tournaments, as well as create their own fun and
                competitive gaming events.
            </div>
            <div className='flex flex-row justify-center'>
              <Image src={logo} alt='EplayJO' width={300} className='shadow-inner'/>
            </div>
          </div>
          <div className="m-5 flex flex-col items-center">
                <Image src={hassan} alt='Hassan AbuGhareeb' width={1500} className='rounded-2xl mr-12  shadow-2xl'/>
                <p className="font-bold text-2xl mb-3 mr-9">Hassan AbuGhareeb</p>
                <div className='mr-8'>
                  <Link target="_blank" className="px-4 mx-1 min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full mb-2" href="https://www.linkedin.com/in/hassan-abu-gareeb-a13b1126a/">Linkedin</Link>
                  <Link target="_blank" className="px-4 mx-1 min-w-[105px] max-w-[106px] font-bold text-center bg-violet-800 hover:bg-purple-500 p-1 rounded-full mb-2" href="https://github.com/Hassan-AbuGareeb">Github</Link>
                </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        <Image src={mini1} alt='Abdullah Alawad' className='rounded-2xl  w-[200px] h-[200px] mt-24 ml-20'/>
        <div>
          <div className='text-5xl font-extrabold text-center'>Our Mission</div>
          <div className="font-bold text-3xl mx-40 mt-10 mb-5 px-5 pt-5 leading-relaxed h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
            At EplayJo, our mission is to foster a thriving gaming community in Jordan by offering a diverse range
            of gaming experiences for players of all skill levels. We aim to create an inclusive environment where
            gamers can connect, compete, and celebrate their passion for gaming.
          </div>
        </div>
        <Image src={mini2} alt='Abdullah Alawad'  className='rounded-2xl  w-[200px] h-[200px] mt-24 mr-20'/>
      </div>
      <div >
        <div className='text-5xl font-extrabold text-center mt-10'>Join Us Today!</div>
        <div className='flex flex-col items-center'>
          <Image src={controller} alt='Abdullah Alawad'  className='rounded-2xl  w-[300px] h-[250px]'/>
        </div>
        <div className="font-bold text-2xl mx-96 mb-16 px-5 pt-5 leading-relaxed h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
          Whether you're a casual gamer looking for some friendly competition or a seasoned pro seeking to test your skills
          against the best, EplayJo welcomes you to join our growing community. Sign up now to start participating in tournaments,
          connecting with fellow gamers, and unlocking a world of gaming possibilities!
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default about
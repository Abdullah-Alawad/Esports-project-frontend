"use client"
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import Image from "next/image";
import icon1 from "../../../public/mini3-t.png"
import icon2 from "../../../public/mini4-t.png"
import icon3 from "../../../public/mini12-t.png"
import icon4 from "../../../public/mini10-t.png"

const Contact = () => {

  const alertSuccess = (message) => toast.success(message);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_lvcvya5",
        "template_f0tgabc",
        form.current,
        "NT3BmE_qY03NzmviJ"
      )
      .then(
        (result) => {
          alertSuccess("Message sent successfully")
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="selection:bg-violet-700/70 bg-[url('../../public/bg2.png')] bg-repeat font-custom pt-7 ">
      <NavBar />
      <div className='flex flex-row justify-center mb-10 m-auto text-center'>
        <Image src={icon1} alt="icon" width={70} height={50}/>
        <div className='font-extrabold text-6xl'>Contact us</div>
        <Image src={icon2} alt="icon" width={70} height={50}/>
      </div>
      <div className="flex flex-row justify-around">
        <div className="relative text-slate-200 font-bold text-3xl  mt-10 mb-5 px-5 ml-12 max-w-[600px] pt-5 leading-relaxed border-4 border-violet-900/35  h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
                <div className="absolute -translate-x-32 -translate-y-28 -rotate-12"><Image src={icon3} alt="icon" /></div>
                &nbsp;To send the team behind EplayJO any suggestions or complains you can use this form to contact us
                <br />
                or you can email us directly to this email:
                <div className="text-yellow-300/90 underline underline-offset-4">esports.ha.ab@gmail.com</div>
        </div>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center pb-16 mt-10">
          <div className="m-3 relative">
            <Image src={icon4} alt="icon" className="absolute translate-x-[620px] -translate-y-[75px]"/>
            <label className="mr-3 font-bold text-3xl">Name</label>
            <input type="text" name="user_name" className="text-slate-200 font-bold text-2xl pl-3 bg-[url('../../public/bg1.png')] bg-repeat min-h-14 min-w-[600px] rounded-xl border-4 border-violet-900/35"/>
          </div>
          <div>
            <label className="mr-3 font-bold text-3xl">Email</label>
            <input type="email" name="user_email" className="text-slate-200 font-bold text-2xl pl-3 bg-[url('../../public/bg1.png')] bg-repeat min-h-14 min-w-[600px] rounded-xl border-4 border-violet-900/35"/>
          </div>
          <div className="flex flex-row items-start m-3">
            <label className="mr-3 font-bold text-3xl">Message</label>
            <textarea name="message" className="text-slate-200 font-bold text-xl pl-3 mt-3 bg-[url('../../public/bg1.png')] bg-repeat min-h-40 min-w-[600px] rounded-xl border-4 border-violet-900/35"/>
          </div>
          <input type="submit" value="Send" className="font-extrabold text-4xl text-slate-200 bg-[url('../../public/bg1.png')] bg-repeat translate-x-16 px-5 my-3 py-2 rounded-xl border-4 border-violet-400/20 hover:border-violet-900/65 hover:cursor-pointer"/>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Contact;



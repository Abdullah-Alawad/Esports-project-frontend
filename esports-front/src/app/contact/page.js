"use client"
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const contact = () => {
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
          console.log(result.text);
          window.alert("Message sent successfully!")
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="bg-[url('../../public/bg2.png')] bg-repeat font-custom pt-7 ">
      <NavBar />
      <div className='flex flex-col items-center mb-10'>
        <div className='font-extrabold text-6xl'>Contact us</div>
      </div>
      <div className="flex flex-row justify-around">
        <div className=" text-slate-200 font-bold text-3xl  mt-10 mb-5 px-5 ml-12 max-w-[600px] pt-5 leading-relaxed border-4 border-violet-900/35  h-fit pb-4 text-center  bg-[url('../../public/bg1.png')] bg-repeat rounded-xl shadow-2xl">
                To send the team behind EplayJO any suggestions or complains you can use this form to contact us
                <br />
                or you can email us directly to this email:
                <div className="text-yellow-300/90 underline underline-offset-4">esports.ha.ab@gmail.com</div>
        </div>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center pb-16 mt-10">
          <div className="m-3">
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
          <input type="submit" value="Send" className="font-extrabold text-4xl text-yellow-300 bg-[url('../../public/bg1.png')] bg-repeat px-5 my-3 py-2 rounded-xl border-4 border-violet-400/20 hover:border-violet-900/65 hover:cursor-pointer"/>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default contact;



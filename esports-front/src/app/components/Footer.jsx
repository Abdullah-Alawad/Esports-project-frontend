import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo-t.png"
import KASIT from "../../../public/KASIT.jpg"

function Footer(){
    return(
      <div className="bg-[url('../../public/bg1.png')] bg-repeat w-full text-white border-t-8 border-yellow-300/70">
        <div className="flex flex-row justify-around ">
          <Image src={logo} alt='Logo' className='  p-2 h-[300px] w-[300px] translate-y-7' />
          <div className="m-10">
            <div>
              <div className="text-2xl text-yellow-300"><b>Home</b></div>
              <div className="text-l hover:underline hover:underline-offset-4 "><Link href="/"><p>Home Page</p></Link></div>
            </div>
            <div className="flex flex-row">
              <div className="mr-5">
                  <div className="text-2xl mt-5 text-yellow-300"><b>Tournamnents</b></div>
                  <Link href={`/tournaments`}><p className="text-l hover:underline hover:underline-offset-4">Tournaments Page</p></Link>
              </div>
              <div className="mr-5">
                  <div className="text-2xl mt-5 text-yellow-300"><b>About Us</b></div>
                  <Link href={`/about`}><p className="text-l hover:underline hover:underline-offset-4">Actors Page</p></Link>
              </div>
              <div>
                  <div className="text-2xl mt-5 text-yellow-300"><b>Contact Us</b></div>
                  <Link href={`/contact`}><p className="text-l hover:underline hover:underline-offset-4">Actors Page</p></Link>
              </div>
            </div>
            <div className="text-3xl font-bold text-center translate-y-10">
              Graduation Project Second Semester 2024
              <br />
              <div className="text-xl font-extrabold text-yellow-300">Supervised by Dr. Mohammad Abushariah</div>
            </div>
          </div>
              
          <div className="m-10">
          <div>
              <a href="https://computer.ju.edu.jo/Home.aspx" target="_blank" ><Image src={KASIT} alt="kasit" width={400} height={150} className="rounded-2xl shadow-2xl translate-x-20"/></a>
            </div> 
            <div className="flex flex-row">
              <div className="m-5 flex flex-col items-center">
                  <p className="font-bold text-xl mb-3">Abdullah Alawad</p>
                  <div className="flex gap-3">
                    <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/abdullah-alawad-0989b7269/">Linkedin</Link>
                    <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Abdullah-Alawad">Github</Link>
                  </div>
              </div>
              <div className="m-5 flex flex-col items-center">
                  <p className="font-bold text-xl mb-3">Hassan AbuGhareeb</p>
                  <div className="flex gap-3">
                    <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/hassan-abu-gareeb-a13b1126a/">Linkedin</Link>
                    <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Hassan-AbuGareeb">Github</Link>
                  </div>
              </div>
            </div>
          </div> 

        </div>
        {/* <div className="m-auto text-center -translate-y-10">
        </div> */}
      </div>
    );
}

export default Footer;
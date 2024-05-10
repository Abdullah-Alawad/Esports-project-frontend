import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo-t.png"

function Footer(){
    return(
      <div className="flex flex-row justify-around bg-[url('../../public/bg1.png')] bg-repeat text-white border-t-8 border-yellow-300/70">
        <Image src={logo} alt='FilmFusion Logo' width={300}
            height={36} className='float left p-2' />
        <div className="m-10">
          <div>
            <div className="text-2xl text-yellow-300"><b>Home</b></div>
            <div className="text-l hover:underline hover:underline-offset-4 "><Link href="/"><p>Home Page</p></Link></div>
          </div>
          <div className="flex flex-row">
            <div className="mr-5">
                <div className="text-2xl mt-5 text-yellow-300"><b>Movies</b></div>
                <Link href={`/movies?MovieCategory=now_playing`}><p className="text-l hover:underline hover:underline-offset-4">Now playing Movies</p></Link>
                <Link href={`/movies?MovieCategory=top_rated`}><p className="text-l hover:underline hover:underline-offset-4">Top Rated Movies</p></Link>
                <Link href={`/movies?MovieCategory=upcoming`}><p className="text-l hover:underline hover:underline-offset-4">Upcoming Movies</p></Link>
                <Link href={`/movies?MovieCategory=popular`}><p className="text-l hover:underline hover:underline-offset-4">Popular Movies</p></Link>
            </div>
            <div>
                <div className="text-2xl mt-5 text-yellow-300"><b>Actors</b></div>
                <Link href={`/actors`}><p className="text-l hover:underline hover:underline-offset-4">Actors Page</p></Link>
            </div>
          </div>
        </div>
            
        <div className="m-10"> 
          <div className="flex flex-row">
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Abdullah Alawad</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/abdullah-alawad-0989b7269/">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Abdullah-Alawad">Github</Link>
            </div>
            <div className="m-5 flex flex-col items-center">
                <p className="font-bold text-xl mb-3">Hassan AbuGhareeb</p>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-sky-700 hover:bg-sky-500 p-1 rounded-full block mb-2" href="https://www.linkedin.com/in/hassan-abu-gareeb-a13b1126a/">Linkedin</Link>
                <Link target="_blank" className="min-w-[105px] max-w-[106px] font-bold text-center bg-purple-700 hover:bg-purple-500 p-1 rounded-full block mb-2" href="https://github.com/Hassan-AbuGareeb">Github</Link>
            </div>
            </div>
        </div> 

      </div>
    );
}

export default Footer;
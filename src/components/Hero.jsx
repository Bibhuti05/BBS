import Typed from "react-typed";
import { FaLinkedin } from "react-icons/fa6";
import { VscGithub } from "react-icons/vsc";
import { SiGmail } from "react-icons/si";
import React from "react";

export default function Hero() {
  return (
    <div className="text-white border-b-4 border-zinc-900 py-10 h-screen">
      <div className="mt-32 w-full h-full text-center flex flex-col">
        <h1 className="text-white md:text-7xl sm:text-6xl text-4xl font-bold">
          Hi, I am Bibhuti
        </h1>
        <p className="text-[#00df9a] font-bold md:text-2xl sm:text-xl text-lg">
          10x Engineer 😎
        </p>
        <div className="">
          <p className="text-[white] font-bold md:text-3xl sm:text-2xl text-xl">
            I code intuitive, Stable, performant
          </p>
          <Typed
            className="text-[grey] font-bold md:text-3xl sm:text-2xl text-xl ml-2"
            strings={["Web Apps", "Mobile Apps", "Desktop Apps"]}
            typeSpeed={70}
            backSpeed={40}
            loop
          />
        </div>
        <div className="mt-10">
          <button className="bg-green-500 w-fit px-10 py-3 rounded-md text-black font-bold hover:scale-110 hover:bg-green-300 transition-all duration-75 shadow-lg shadow-green-500 hover:shadow-none"
          >
            <a href="#Projects">Projects</a>
          </button>
        </div>

        <div className=" flex justify-evenly md:justify-center mt-40 ">
          <a href="https://github.com/Bibhuti05"><VscGithub size={40} className="md:mx-10 cursor-pointer hover:scale-150  transition-all duration-200" /></a>
          <a href="https://www.linkedin.com/in/bibhuticodes/"><FaLinkedin size={40} className="md:mx-10 cursor-pointer hover:scale-150 transition-all duration-200" /></a>
          <a href="mailto:bibhuticodes@gmail.com"><SiGmail size={40} className="md:mx-10 cursor-pointer hover:scale-150 transition-all duration-200" /></a>
        </div>
      </div>
    </div>
  );
}

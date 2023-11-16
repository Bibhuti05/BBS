import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  function handelNav() {
    setNav(!nav);
  }

  return (
    <div className=" backdrop-blur-2xl bg-black/50 w-full sticky top-0 z-10">
      <div className="text-white flex h-24 justify-between items-center max-w-[1200px] mx-auto  ">
        <h1 className="w-full text-3xl font-bold text-[#00df9a] ml-5">BBS.</h1>
        <ul className=" hidden md:flex">
          <li className="p-4">Home</li>
          <li className="p-4">About</li>
          <li className="p-4">Contact</li>
          <li className="p-4">Projects</li>
        </ul>
        <div
          onClick={() => {
            handelNav();
          }}
          className="mr-5 md:hidden"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>

      <div
        className={
          !nav
            ? "h-0 overflow-hidden  sticky top-0"
            : " h-60 overflow-hidden transition-all duration-500 ease-in-out w-full sticky top-0"
        }
      >
        <ul className={!nav ? "hidden" : "text-white"}>
          <li className="p-4">Home</li>
          <li className="p-4">About</li>
          <li className="p-4">Contact</li>
          <li className="p-4">Projects</li>
        </ul>
      </div>
    </div>
  );
}

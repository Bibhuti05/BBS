import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Pcard from "./components/Pcards";
import plist from "./plist.json";
import { useState, useEffect } from "react";

function App() {
  //capture the scroll value
  const [scrollData, setScrollData] = useState({
    y: 0,
    lasty: 0,
  });

  let [showNav, setShowNav] = useState(true);

    
  

  useEffect(()=>{
    function handelscroll(){
      
      setScrollData(previous => {
        return{
          y: window.scrollY,
          lasty: previous.y
        }
      })
      
    }

    window.addEventListener("scroll", handelscroll);

    return () => window.removeEventListener("scroll", handelscroll)
  })

  useEffect(()=>{
     console.log(scrollData);

     if(scrollData.y > 200){
      setShowNav(false)
    }else{
      setShowNav(true)
    }

    if(scrollData.lasty > scrollData.y){
      setShowNav(true)
    }


  },[scrollData])
  
  

  return (
    <div className="font-sans">
      {showNav && <Navbar  />}
      <Hero />
      <section
        id="Projects"
        className="flex justify-center mt-40 flex-wrap pt-20 flex-col"
      >
        <h1 className="text-white text-3xl font-bold text-center">Projects</h1>
        <div className="flex flex-wrap justify-center mt-10">
        {plist.map((proj) => {
          return (
            <Projects
              children={
                <Pcard
                  title={proj.title}
                  info={proj.info}
                  stack={proj.stack}
                  link={proj.link}
                />
              }
            />
          );
        })}
        </div>
      </section>
    </div>
  );
}

export default App;

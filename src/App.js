import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Pcard from "./components/Pcards";
import plist from "./plist.json"

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <section className="flex justify-center mt-32 flex-wrap">
        {plist.map((proj) =>{
          return <Projects children={<Pcard title={proj.title} info={proj.info} stack={proj.stack} link={proj.link}/>} />
        })}
      </section>
    </div>
  );
}

export default App;

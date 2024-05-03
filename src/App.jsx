import React, { useState, useRef } from "react";
import Header from "./components/Header";
import RenderedLinks from "./components/RenderedLinks/RenderedLinks";
import Footer from "./components/Footer";
import Inputs from "./components/Inputs/Inputs";

const App = () => {
  const [links, setLinks] = useState(() => {
    return JSON.parse(localStorage.getItem("Links")) || [];
  }, []);

  return (
    <div className=" ">
      <Header />
      <Inputs links={links} setLinks={setLinks} />
      <RenderedLinks links={links} setLinks={setLinks} />
      <Footer />
    </div>
  );
};

export default App;

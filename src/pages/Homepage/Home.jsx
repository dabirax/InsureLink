import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero/Hero";
import Why from "./Why/Why";
import Steps from "./Steps/Steps";
import Ready from "./Ready";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Why />
      <Steps />
      <Ready />
      <Footer />
    </>
  );
};

export default Home;

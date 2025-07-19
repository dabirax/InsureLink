import SubHero1 from "./SubHero1";
import SubHero2 from "./SubHero2";

const Hero = () => {
  return (
    <div className="flex w-[200vw] h-screen overflow-hidden font-poppins">
      <SubHero1 />
      <SubHero2 />
    </div>
  );
};

export default Hero;

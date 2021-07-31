import React from 'react';
import { Footer } from '../../components';
import HeroSection from '../../components/HomePage/MainSection/HeroSection';

function Home() {
  return (
    <div>
      <HeroSection />
      {/* <InfoSection {...homeObjOne} /> */}
      {/* <HomeSponsor /> */}
      <Footer />
    </div>
  );
}

export default Home;

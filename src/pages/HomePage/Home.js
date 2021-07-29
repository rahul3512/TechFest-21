import React from 'react';
import { homeObjOne } from './Data';
import { Footer, InfoSection } from '../../components';
import HeroSection from '../../components/HomePage/MainSection/HeroSection';
import HomeSponsor from '../../components/HomePage/SponsorSection/Sponsor';

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

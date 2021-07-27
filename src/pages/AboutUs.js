import React from 'react'
import Aboutusdesc from '../components/AboutUsPage/Aboutusdesc'
import CoreTeam from '../components/AboutUsPage/CoreTeam'
import Visionary from '../components/AboutUsPage/Visionary'
import background from '../assets/images/background.png';
import '../components/AboutUsPage/AboutUs.css';
import { Footer } from '../components';

function AboutUs() {
    return (
        <div
            className="aboutus-background"
        // style={{ backgroundImage: `url(${background})` }}
        >
            <Aboutusdesc />
            <Visionary />
            <CoreTeam />
            <CoreTeam />
            <CoreTeam />
            <Footer />
        </div>
    )
}

export default AboutUs

import React from 'react'
import Aboutusdesc from '../components/AboutUsPage/Aboutusdesc'
import CoreTeam from '../components/AboutUsPage/CoreTeam'
import Visionary from '../components/AboutUsPage/Visionary'
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

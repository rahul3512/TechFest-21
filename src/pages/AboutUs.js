import React from 'react'
import Aboutusdesc from '../components/AboutUsPage/Aboutusdesc'
import CoreTeam from '../components/AboutUsPage/CoreTeam'
import Visionary from '../components/AboutUsPage/Visionary'
import '../components/AboutUsPage/AboutUs.css';
import { Footer } from '../components';
import GoogleMap from '../components/AboutUsPage/GoogleMap';

function AboutUs() {
    return (
        <div
            className="aboutus-background"
        // style={{ backgroundImage: `url(${background})` }}
        >
            <Aboutusdesc />
            <Visionary />
            {/* <CoreTeam /> */}
            <GoogleMap />

            <Footer />
        </div>
    )
}

export default AboutUs

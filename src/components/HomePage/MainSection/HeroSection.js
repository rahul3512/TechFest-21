import React from 'react';
import { useHistory } from 'react-router';
// import vid from '../../../assets/images/home.webp';
import vidPc from '../../../assets/video/Headvideo.mp4';
import vidMobile from '../../../assets/video/HeadVideoPhone.mp4';
import './HeroSection.css';
import { homeObjOne } from '../../../pages/HomePage/Data';
import InfoSection from '../../HomePage/InfoSection/InfoSection'
import HomeSponsor from '../../HomePage/SponsorSection/Sponsor';

function HeroSection() {

    // const history = useHistory();

    // const handleRoute = () => {
    //     history.push("/domain");
    // }

    let vid = vidPc;

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    let { height, width } = getWindowDimensions()

    if (width < 700) {
        vid = vidMobile
    }

    return (
        <div className='hero-container'>
            <div>
                <video autoPlay loop muted playsInline style={{ height, width: '100%', 'object-fit': 'fill' }} >
                    <source type="video/mp4" src={vid} />
                </video>
            </div>
            <div className='hero-details'>

                <InfoSection {...homeObjOne} />
                <HomeSponsor />
            </div>




        </div>

    );
}

export default HeroSection;



import React from 'react';
import { useHistory } from 'react-router';
// import vid from '../../../assets/images/home.webp';
import vid from '../../../assets/images/Desktop.mp4';
import logo from '../../../assets/images/Logo.png';
import './HeroSection.css';
import { homeObjOne } from '../../../pages/HomePage/Data';
import InfoSection from '../../HomePage/InfoSection/InfoSection'
import HomeSponsor from '../../HomePage/SponsorSection/Sponsor';

function HeroSection() {

    const history = useHistory();

    const handleRoute = () => {
        history.push("/domain");
    }

    return (
        <div className='hero-container'>
            <div className='hero-video'>
                {/* <img src={vid} autoPlay loop muted className='headsection-img' /> */}
                <video src={vid} autoPlay loop muted style={{ width: '100%' }} />
            </div>
            <div className='hero-details'>
                <div className='hero-text'>
                    <h1>techFEST'</h1>
                    <p>SLIET Longowal's Virtual <br />Techno-Management Fest</p>
                    <button
                        type="submit"
                        className="btn btn-outline-light btn-rounded "
                        data-mdb-ripple-color="dark"
                        onClick={handleRoute} >

                        Adventure Here!
                    </button>
                    <div className='hero-logo'>
                        <img src={logo} alt="logo" />
                    </div>

                </div>
                <InfoSection {...homeObjOne} />
                <HomeSponsor />
            </div>




        </div>

    );
}

export default HeroSection;



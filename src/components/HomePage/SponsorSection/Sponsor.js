import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import '../Navbar/Navbar.css';
import './SponsorSection.css';
import sponsor from '../../../assets/images/slietlogo.png';
import sponsor1 from '../../../assets/sponsor/sponsor1.jpeg';
import sponsor2 from '../../../assets/sponsor/sponsor2.png';
import sponsor3 from '../../../assets/sponsor/sponsor3.png';
import sponsor4 from '../../../assets/sponsor/sponsor4.jpg';
import sponsor5 from '../../../assets/sponsor/sponsor5.jpeg';
import sponsor6 from '../../../assets/sponsor/sponsor6.png';
import sponsor7 from '../../../assets/sponsor/sponsor7.jpg';
// import sponsor5 from '../../../assets/images/Rados.png';

import { fontSize } from "@material-ui/system";


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

function HomeSponsor() {
    return (
        <div className='home-sponsor'>
            <h1 style={{ textAlign: "center", fontFamily: 'EXO', fontSize: '46px', paddingBottom: '17px' }}>
                <span>Sponsors</span>

            </h1>
            <div className="main-sponsor">
                <Carousel breakPoints={breakPoints}>
                    <Item><img src={sponsor1} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor2} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor3} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor4} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor5} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor6} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor7} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>

                </Carousel>
            </div>
        </div>
    );
}

export default HomeSponsor;
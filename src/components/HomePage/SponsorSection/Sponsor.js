import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import '../Navbar/Navbar.css';
import sponsor from '../../../assets/images/slietlogo.png';
import { fontSize } from "@material-ui/system";


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

function HomeSponsor() {
    return (
        <div className='home-sponsor' style={{ marginTop: '-39px' }}>
            <h1 style={{ textAlign: "center", fontFamily: 'EXO', fontSize: '46px', paddingBottom: '17px' }}>
                <span>Sponsors</span>

            </h1>
            <div className="main-sponsor">
                <Carousel breakPoints={breakPoints}>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                    <Item><img src={sponsor} alt='sponsor' className='sponsor-img' /></Item>
                </Carousel>
            </div>
        </div>
    );
}

export default HomeSponsor;
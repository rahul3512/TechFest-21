import React from 'react';
import PrInternPage from '../components/PrInternPage/PrIntern';
import { Footer } from '../components';
import "../components/PrInternPage/Printern.css";

const PrIntern = () => {
    return (
        <div className="printernbg">
            <PrInternPage />
            <Footer />
        </div>
    )
}

export default PrIntern;

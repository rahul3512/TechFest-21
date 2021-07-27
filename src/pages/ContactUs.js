import React from 'react';
import FaqContainer from '../components/ContactPage/FaqContainer';
import '../components/ContactPage/ContactUs.css';
import { Footer } from '../components';

function ContactUs() {
    return (
        <div className="contactUsPage">
            <div className="earth"></div>
            <FaqContainer />
            <Footer />
        </div>
    )
}

export default ContactUs;

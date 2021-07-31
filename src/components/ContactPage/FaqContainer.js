import React from "react";
import FaqQuestions from "./FaqQuestions";
import SocialMediaIcons from "./SocialMediaIcons";
import './ContactUs.css';

const FaqContainer = () => {
  return (
    <div className="container mt-3" id="faq-container">
      <div id="faq-header row" >
        <h1 className="heading text-white text-center mb-5 mt-5">
          Frequently Asked Question
        </h1>
      </div>
      <FaqQuestions />
      <div className="faq-footer">
        <h4 className="text-white text-center mb-4 mt-3">
          Don't Think Twice
          <br />
          <br />
          Contact Us - &nbsp;
          <a
            href="mailto:techfest@sliet.ac.in"
            target="_blank"
            rel="noreferrer"
            className="text-white text-decoration-underline"
          >
            techfest@sliet.ac.in
          </a>
        </h4>
        <h4 className="text-white my-3 text-center">Stay Updated Here!</h4>
        <SocialMediaIcons />
      </div>
      <div className="container">
        <div className="row text-center">
          <div className="graphics"></div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default FaqContainer;

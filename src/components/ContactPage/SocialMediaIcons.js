import React from "react";
import {FaFacebook , FaInstagram , FaLinkedin , FaYoutube , FaTwitter} from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialMediaIcons = () => {
  return (
    <div className="social-icons">
      <Link to={{pathname:"https://www.facebook.com/techfestsliet/"}} className="fab" target="_blank"><FaFacebook /></Link>
      <Link to={{pathname:"https://instagram.com/techfestsliet_"}} className="fab" target="_blank"><FaInstagram /></Link>
      <Link to={{pathname:"https://www.linkedin.com/company/techfest-sliet"}} className="fab" target="_blank"><FaLinkedin /></Link>
      <Link to={{pathname:"https://www.youtube.com/channel/UCTSrKfF90hZq7reWgd2oyZg"}} className="fab" target="_blank"><FaYoutube /></Link>
      <Link to={{pathname:"https://twitter.com/techfestsliet"}} className="fab" target="_blank"><FaTwitter /></Link>
     
    </div>
  );
};

export default SocialMediaIcons;

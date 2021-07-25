import React from "react";
import slietlogo from "../../assets/images/slietlogo.png";
import techfestlogo from "../../assets/images/Logo.png";
function Aboutusdesc() {
  return (
    <div>
      <section className="container d-flex justify-content-center">
        <div className="bord image-block">
          <img className="image" src={slietlogo} alt="Logo" />
        </div>
        <div className="image-block margin">
          <img className="image" src={techfestlogo} alt="Logo" />
        </div>
      </section>
      <div className="row mt-5">
        <div className="col-sm-12 text-center text-justify ">
          <h1 className="heading">techfest'21</h1>
          <center>
            <p className="text-justify w-50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </center>
        </div>
      </div>
    </div>
  );
}
export default Aboutusdesc;

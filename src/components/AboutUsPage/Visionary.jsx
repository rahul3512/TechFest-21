import React from "react";
import Director from "../../assets/images/director.jpg";
import DeanSW from "../../assets/images/DeanSW.jpg";
import ChairmanTechfest from "../../assets/images/ChairmanTechfest.jpg";
import ViceChairmanTechfest from "../../assets/images/ViceChairmanTechfest.jpg";
import FacultyAdvisorTechFEST from "../../assets/images/FacultyAdvisorTechfest.jpg";
import FacultyAdvisorTech from "../../assets/images/FacultyAdvisorTech.jfif";


function Visionary() {
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="hr-center">
            <span className="hr-text">Our Visionaries</span>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '-92px' }}>
        <div className="row mt-5">

          <div className="aboutus-card text-center" style={{ margin: "auto" }}>
            <div className="card-item">
              <img className="teacherimage" src={Director} alt="hello" />
            </div>
            <h5 className="card-title">Dr. Shailendra Jain</h5>
            <p className="card-text">Director</p>
          </div>
          <div className="d-flex flex-wrap text-center" style={{ marginRight: '70px' }}>
            <div className="aboutus-card text-center">
              <div className="card-item">
                <img className="teacherimage" src={DeanSW} alt="hello" />
              </div>
              <h5 className="card-title">Mr. Rajesh Kumar</h5>
              <p className="card-text">Dean SW</p>
            </div>
            <div className="aboutus-card text-center">
              <div className="card-item">
                <img className="teacherimage" src={ChairmanTechfest} alt="hello" />
              </div>
              <h5 className="card-title">Dr. Manpreent Singh Manna </h5>
              <p className="card-text">techFEST Chairman</p>
            </div>
            <div className="aboutus-card text-center">
              <div className="card-item">
                <img className="teacherimage" src={ViceChairmanTechfest} alt="hello" />
              </div>
              <h5 className="card-title">Ms. Anshuka Bansal Maam</h5>
              <p className="card-text">Vice Chairman techFEST</p>
            </div>
            <div className="aboutus-card text-center">
              <div className="card-item">
                <img className="teacherimage" src={FacultyAdvisorTechFEST} alt="hello" />
              </div>
              <h5 className="card-title">Dr. Jaspreet Singh</h5>
              <p className="card-text">Faculty Advisor techFEST</p>
            </div>
            <div className="aboutus-card text-center">
              <div className="card-item">
                <img className="teacherimage" src={FacultyAdvisorTech} alt="hello" />
              </div>
              <h5 className="card-title">Dr. Preetpal Sing</h5>
              <p className="card-text">Faculty Advisor techFEST</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
export default Visionary;

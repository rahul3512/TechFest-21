import React from "react";
import "./Team.css";
import Soham from "../assets/team/soham.jpeg";
import Harsimran from "../assets/team/harsimran.jpg";
import Amitoj from "../assets/team/amitoj.jpg";
import Mansi from "../assets/team/mansi.jpg";
import Ruchika from "../assets/team/Ruchika.jpeg";
import Prabjot from "../assets/team/prabh.JPG";
import Rahul from "../assets/team/rahul-singh.jpg";
import Ridham from "../assets/team/ridham-goyal.jpg";
import Aryaman from "../assets/team/arryaman.jpg";
import Meherpreet from "../assets/team/mehar.jpg";
import Shivam from "../assets/team/shivam.jpg";
import Virat from "../assets/team/virat.jpg";
import Shrawan from "../assets/team/shrawan.jpg";
import Om from "../assets/team/om.jpeg";
import Tomar from "../assets/team/Tomar.jpeg";
import Shiva from "../assets/team/shiva.jpg";
import Footer from "../components/HomePage/Footer/Footer";

function Team() {
  return (
    <div className="dev-team" style={{ backgroundColor: "black" }}>
      <div className="wrapper-dev ">
        <h1 className="h1-dev">OUR TEAM</h1>
          
       
        <div className="row my-2 py-0">
          <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Soham})` }}
              >
                <div className="inner">
                  <p><span>Soham</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>UI UX Designer</p>
                  <span>97407 34156</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Harsimran})` }}
              >
                <div className="inner">
                  <p> <span>Harsimran Singh</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>Backend Developer and Server Management</p>
                  <span>9417093422</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
          
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Amitoj})` }}
              >
                <div className="inner">
                  <p><span>Amitoj Singh</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>Backend Developer and Server Management</p>
                  <span>94171 71800</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
  
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Mansi})` }}
              >
                <div className="inner">
                  <p><span>Mansi Sharma</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>Core Committee (Web Development)</p>
                  <span>6284 776 078</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-2 py-0">
         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Ruchika})` }}
              >
                <div className="inner">
                  <p><span>Ruchika</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>React Developmer</p>
                  <span>85277 53759</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Prabjot})` }}
              >
                <div className="inner">
                  <p><span>Prabhjot Singh</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>React Developmer</p>
                  <span>94789 53771</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Rahul})` }}
              >
                <div className="inner">
                  <p><span>Rahul Kumar</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>React Developmer</p>
                  <span>86518 52427</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Ridham})` }}
              >
                <div className="inner">
                  <p><span>Ridham Goyal</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>React Developmer</p>
                  <span> 97806 24350</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-2 py-0">
         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Aryaman})` }}
              >
                <div className="inner">
                  <p><span>Aryaman Sinha</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>React Developmer</p>
                  <span>98784 51288</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Meherpreet})` }}
              >
                <div className="inner">
                  <p><span>Meharpreet</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>83603 50054</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Shivam})` }}
              >
                <div className="inner">
                  <p><span>Shivam</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span> 81989 78095</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Virat})` }}
              >
                <div className="inner">
                  <p><span>Virat Kumar</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>62049 53473</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-2 py-0">
         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Shrawan})` }}
              >
                <div className="inner">
                  <p><span>Shrawan Singh</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>78705 77237</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div className="front" style={{ backgroundImage: `url(${Om})` }}>
                <div className="inner">
                  <p><span>Om Prakash</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>99733 16183</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Tomar})` }}
              >
                <div className="inner">
                  <p><span>Tomar</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>94579 81267</span>
                </div>
              </div>
            </div>
          </div>

         <div className="col-lg-3 col-sm-6 my-2" ontouchstart="this.classList.toggle('hover');">
            <div className="container">
              <div
                className="front"
                style={{ backgroundImage: `url(${Shiva})` }}
              >
                <div className="inner">
                  <p><span>Shiva Sai</span></p>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>HTML CSS Designer</p>
                  <span>94933 87372</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Team;

import React from "react";
import vr from "../../assets/images/VR.png";
import Recognised from '../../assets/images/Recognised.png';
import Leader from '../../assets/images/Leader.png';
import Headphones from '../../assets/images/Headphones.png';
// import mobile from '../../assets/images/mobile.jpg';
import Concession from '../../assets/images/Concession.jpg';
import Rocket from '../../assets/images/Rocket.png';
import Speaker from '../../assets/images/Speaker.png';
import SkillsRocket from '../../assets/images/SkillsRocket.png'


function PrInternPage() {
    return (
        <div className="pr-container" style={{ backgroundColor: 'black' }}>
            <div className="container">
                <div className="sponsordesc row flex flex-row">
                    <div className="col-sm-12 text-center ">
                        <h1 className="heading text-white">Become a PR Intern</h1>
                        <p className="text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <button type="button" className="btn btn-outline-primary">Register Now</button>
                    </div>
                </div>

                <h3 className="heading text-white mt-5 text-center">Why become a PR Intern ?</h3>
                <div className="row container d-flex justify-content-around">
                    <div className="col ">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={SkillsRocket} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={Leader} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={Recognised} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row container d-flex justify-content-around">
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={Concession} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={Headphones} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="card-image pb-3">
                                    <img className="image-size" src={Rocket} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Alpha Sponsor</h4>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PrInternPage;

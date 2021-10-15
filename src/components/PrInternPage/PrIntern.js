import React from "react";
import Recognised from '../../assets/images/Recognised.png';
import Leader from '../../assets/images/Leader.png';
import Headphones from '../../assets/images/Headphones.png';
import Concession from '../../assets/images/Concession.jpg';
import Rocket from '../../assets/images/Rocket.png';
import SkillsRocket from '../../assets/images/SkillsRocket.png'


function PrInternPage() {
    return (
        <div className="pr-container">
            <div className="container">
                <div className="sponsordesc row ">
                    <div className="col-sm-12 text-center d-flex justify-content-center align-items-center flex-column text-justify">
                        <h1 className="heading text-white">Become a PR Intern</h1>
                        <p className="text-justify w-50">
                            Learn to grow your network in your college and gain the experience of a lifetime.
                            Grab the opportunity to become an influencer in your college. Join the journey of techFEST’21.
                            Awesome goodies, merchandise and a lot more rewards await you!
                        </p>
                        <button type="button" className="btn btn-outline-primary">Register Now</button>
                    </div>
                </div>

                <h3 className="heading text-white mt-5 text-center">Why become a PR Intern ?</h3>
                <div className="row container" style={{ margin: "auto" }}>
                    <div className="col ">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image card-image pb-3">
                                    <img className="image-size" src={SkillsRocket} alt="printernimage" />
                                </div>
                                <div>
                                    <h4 className="card-title">Skyrocket your ideas</h4>
                                    <p className="card-text">
                                        Improve your soft skills and communication abilities.
                                        Develop marketing strategies to improve the brand name
                                        of techFEST in your community and college.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image pb-3">
                                    <img className="image-size1" src={Leader} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Become a Leader</h4>
                                <p className="card-text">
                                    Develop the charisma of a leader and bring out the best of your fellow students.
                                    Pave the path to excellence for your juniors. Lead your college to glorious
                                    victories at techFEST’21
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image pb-3">
                                    <img className="image-size" src={Recognised} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Get Recognized</h4>
                                <p className="card-text">
                                    Create your own brand name. Gain recognition at the national level through our
                                    festival for your efforts. Let your name be heard as a representative of techFEST’21
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image pb-3">
                                    <img className="image-size" src={Concession} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Concession on entry fees</h4>
                                <p className="card-text">
                                    Bring at least five participants through your referral for competitions
                                    from any college and stand a chance to avail free entry for competitions
                                    of techFEST’21
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image pb-3">
                                    <img className="image-size" src={Headphones} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Goodies & Rewards</h4>
                                <p className="card-text">
                                    Grab the opportunity to become a PR Intern and win Goodies and Rewards from
                                    our sponsors based upon your performance.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="printern">
                            <div className="card-body text-center">
                                <div className="printern-image pb-3">
                                    <img className="image-size" src={Rocket} alt="printernimage" />
                                </div>
                                <h4 className="card-title">Letter Of Recommendation</h4>
                                <p className="card-text">
                                    Receive a Letter of Recommendation for your efforts by performing the given set of tasks!
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

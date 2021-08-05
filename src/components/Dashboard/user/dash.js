import React, { useState, useEffect, useCallback } from "react";
import "./assets/css/dashres.css";
import ProfileI from "./Profile";
import { Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import Leffect from "./assets/images/Group 1left-bar-background.png";
import Reffect from "./assets/images/right-middle-bg-effect.png";
import BottomLeft from "./assets/images/bottom-left-bg.png";
import TechIcon from "./assets/images/tech icon.svg";
import Profile from "./assets/images/profile.svg";
// import Techfest21 from "./assets/images/__techFEST 21.svg";
import Home from "./assets/images/home.svg";
import Payments from "./assets/images/payments.svg";
// import Editbutton from "./assets/images/edit-button.svg";
import Certificate from "./assets/images/certificate.svg";

import Event from "./assets/images/event.svg";
// import Line23 from "./assets/images/Line 23.svg";
import Solid from "./assets/images/solid.svg";
import ProfileImage from "./assets/images/profile-image.png";
import Facebook from "./assets/Icons/facebookicon.svg";
import Instagram from "./assets/Icons/instagramicon.svg";
import Linkedin from "./assets/Icons/linkedinicon.svg";
import Youtube from "./assets/Icons/youtubeicon.svg";
import Password from "./assets/Icons/password.svg";
import moment from "moment";
import { getUser, updateUser } from "./helper/userapicalls";
import { isAuthenticated } from "../../../auth/helper";

import { useAlert } from "react-alert";
import { API } from "../../../backend";
import StripeCheckout from "react-stripe-checkout";
import { FaTelegram, FaTwitter } from "react-icons/fa";

import ChangePassword from "./ChangePassword";
import { Payment } from "../../../backend";

function Dash() {
  const alert = useAlert();
  let ScrollLink = Scroll.Link;
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    userID: "",
    email: "",
    phone: "",
    dob: new Date(),
    designation: "",
    collegeName: "",
    collegeAddress: "",
    courseEnrolled: "",
    whatsappPhoneNumber: "",
    telegramPhoneNumber: "",
    branchOfStudy: "",
    yearOfStudy: 0,
    eventRegIn: [],
    workshopsEnrolled: [],
    loading: false,
    updated: false,
    hasPaidEntry: false,
    error: "",
  });
  // const [completeUser, setCompleteUser] = useState(null);
  const {
    name,
    lastName,
    // userID,
    email,
    phone,
    dob,
    designation,
    collegeName,
    collegeAddress,
    courseEnrolled,
    branchOfStudy,
    yearOfStudy,
    whatsappPhoneNumber,
    telegramPhoneNumber,
    loading,
    // updated,

    error,
  } = values;

  const loadingMessage = () => {
    return (
      values.loading && (
        <div className=" text-center my-2">
          <div className="spinner-border text-light " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    );
  };
  const preload = (userId, token) => {
    setValues({ ...values, loading: true });
    getUser(userId, token).then((data) => {
      // console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // setCompleteUser(data);
        setValues({
          ...values,
          name: data?.name ? data?.name : "",
          lastName: data?.lastName ? data?.lastName : "",
          userID: data?.userId ? data?.userId : "",
          email: data?.email ? data?.email : "",
          phone: data?.phone ? data?.phone : "",
          designation: data?.designation ? data?.designation : "",
          collegeName: data?.collegeName ? data?.collegeName : "",
          collegeAddress: data?.collegeAddress ? data?.collegeAddress : "",
          courseEnrolled: data?.courseEnrolled ? data?.courseEnrolled : "",
          branchOfStudy: data?.branchOfStudy ? data?.branchOfStudy : "",
          yearOfStudy: data?.yearOfStudy ? data?.yearOfStudy : "",
          whatsappPhoneNumber: data?.whatsappPhoneNumber
            ? data?.whatsappPhoneNumber
            : "",
          telegramPhoneNumber: data?.telegramPhoneNumber
            ? data?.telegramPhoneNumber
            : "",
          dob: moment(data?.dob).format("YYYY-MM-DD"),
          eventRegIn: data?.eventRegIn ? data?.eventRegIn : "",
          workshopsEnrolled: data?.workshopsEnrolled
            ? data?.workshopsEnrolled
            : "",
          loading: false,
          hasPaidEntry: data?.hasPaidEntry ? data?.hasPaidEntry : false,
        });
        // if (values.lastName == undefined) {

        // }
      }
    });
  };

  const [variables, setVariables] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  // const { oldPassword, newPassword, confirmPassword, loading , error , success } =
  //   variables;
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [show]);
  const handleShow = () => setShow(true);

  const HandleShow = () => {
    return <>{show ? <ChangePassword handleClose={handleClose} /> : null}</>;
  };

  const handleChange = (key) => (event) => {
    setVariables({ ...variables, error: false, [key]: event.target.value });
  };

  const [updated, updatedChange] = useState(false);

  useEffect(() => {
    preload(user._id, token);
  }, []);

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 5,
    productBy: "facebook",
  });

  const makePayment = (tokenPay) => {
    const body = {
      token: tokenPay,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data != "Success") {
          alert.show("Payment Failed", {
            type: "error",
            timeout: "3000",
          });
          return;
        }

        updateUser(user._id, token, {
          hasPaidEntry: true,
        })
          .then((data) => {
            console.log(data);
            if (data.error) {
              setValues({
                ...values,
                error: data.error,
                loading: false,
              });
              alert.show(`${error}`, {
                type: "error",
                timeout: "3000",
              });
            } else {
              alert.show("Payment Success ! ", {
                timeout: "3000",
                type: "success",
              });

              setValues({
                ...values,
                loading: false,
                error: "",
                updated: true,
                hasPaidEntry: true,
              });
            }
          })
          .catch(() => {
            alert.show("error", {
              timeout: "3000",
              type: "error",
            });
          });
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="dashboard-dash-main-body">
      {/* {PasswordChange()} */}
      {/* bg effect */}
      <img
        className="dashboard-dash-main_left-bar_bg"
        src={Leffect}
        alt="left-bar-bg"
      />
      <img
        src={Reffect}
        alt="right-middle"
        className="dashboard-dash-main_right-middle_bg"
      />
      <img
        src={BottomLeft}
        alt="left-bottom_bg"
        className="dashboard-dash-main_left-bottom_bg"
      />
      <div className="dashboard-dash-leftbar">
        {HandleShow()}
        <Link to="/" className="dashboard-dash-logo">
          <img src={TechIcon} alt="techFEST" />
          {/* <img src={Techfest21} alt="techFEST-text" className="dashboard-dash-techfestName" /> */}
        </Link>
        <div className="dashboard-dash-dashboard-link">
          <ScrollLink
            smooth={true}
            duration={20}
            to="dashboard"
            spy={true}
            activeClass="dashboard-dash-active"
            className={"dashboard-dash-dlink dashboard-dash-cursor "}
          >
            <img src={Home} alt="techFEST-profile-icon" />
            Dashboard
          </ScrollLink>
          <ScrollLink
            smooth={true}
            duration={10}
            to="profile"
            spy={true}
            activeClass="dashboard-dash-active"
            className={"dashboard-dash-dlink dashboard-dash-cursor "}
          >
            <img src={Profile} alt="techFEST-profile-icon" />
            Profile Information
          </ScrollLink>
          <ScrollLink
            smooth={true}
            spy={true}
            duration={20}
            to="certificate"
            activeClass="dashboard-dash-active"
            className={"dashboard-dash-dlink dashboard-dash-cursor "}
          >
            <img src={Certificate} alt="techFEST-profile-icon" />
            Certificates & Rewards
          </ScrollLink>

          <Link
            className="dashboard-dash-dlink dashboard-dash-cursor"
            onClick={() => handleShow()}
            to="#"
          >
            <img
              src={Password}
              alt="password change"
              style={{ fill: "white" }}
            />
            Change Password
          </Link>
          {console.log(values.hasPaidEntry)}
          {values.designation === 'Student' && values.hasPaidEntry == false ?
            <div>
              <form className="dashboard-dash-dlink dashboard-dash-cursor" style={{ marginTop: '2rem' }} action="https://api.techfestsliet.com/api/create-checkout-session" method="POST">
                <img src={Payments} alt="payment" style={{ fill: 'white' }} />
                <input type="hidden" name="id" value={user._id} />
                <button className="checkOutBtn" type="submit">
                  Checkout
                </button>
              </form>
            </div>
            :
            null}







        </div>
      </div>
      {/* <!-- MAIN CONTENT according to the option clicked in leftbar --> */}
      <div className="dashboard-dash-main-content">
        {loadingMessage()}
        {/* <!-- DASHBOARD --> */}
        <div className="dashboard-dash-dashboard" id="dashboard">
          <div className="dashboard-dash-user-profile-display">
            <img src={ProfileImage} alt="profile" />
            <div className="dashboard-dash-user-info">
              <b className="dashboard-dash-user-name">{`${values?.name}  ${values?.lastName}`}</b>
              <p>{values?.collegeName}</p>
              <p className="dashboard-dash-user-id">{values?.userID}</p>
            </div>
          </div>

          <div className="dashboard-dash-events">
            {/* <!-- Event Card --> */}

            <div className="dashboard-dash-event-card">
              <div className="dashboard-dash-event-card_title">
                <img src={Event} alt="event-techFEST" />
                Events Registered
              </div>

              {values?.eventRegIn.length > 0 ? (
                <div className="dashboard-dash-event-card_events-list">
                  {values?.eventRegIn.map((row) => (
                    <div className="dashboard-dash-event" key={row._id}>
                      <span className="dashboard-dash-event-name">
                        {row.eventName}
                      </span>
                      {/* <span className="dashboard-dash-event-time">{`${moment(row.eventDate).format('DD-MM')}`}</span> */}
                      <Link
                        to={{
                          pathname: `/domain`,
                          state: {
                            name: "events",
                            id: row.domainRefId,
                            secId: row._id,
                          },
                        }}
                        className="btn  btn-outline-primary btn-sm"
                      >
                        View detail
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="dashboard-dash-event"
                  style={{ borderBottom: "none" }}
                >
                  <span className="dashboard-dash-event-name">
                    Please register in Events to see detail{" "}
                  </span>
                </div>
              )}
            </div>
            {/* <!-- Workshop Card --> */}
            <div className="dashboard-dash-event-card">
              <div className="dashboard-dash-event-card_title">
                <img src={Solid} alt="event-techFEST" />
                Workshops Registered
              </div>
              {values?.workshopsEnrolled.length > 0 ? (
                <div className="dashboard-dash-event-card_events-list">
                  {values?.workshopsEnrolled.map((row) => (
                    <div className="dashboard-dash-event" key={row._id}>
                      <span className="dashboard-dash-event-name">
                        {row.workshopName}
                      </span>
                      <Link
                        to={{
                          pathname: `/domain`,
                          state: { name: "workshops", id: row._id },
                        }}
                        id={row._id}
                        message={"redirected from dashboard"}
                        className="btn  btn-outline-primary btn-sm"
                      >
                        View detail
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="dashboard-dash-event"
                  style={{ borderBottom: "none" }}
                >
                  <span className="dashboard-dash-event-name">
                    Please register in Workshops to see details
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {console.log(values)}
        <div className="passwordChange">
          {values.designation === "Student" && values.hasPaidEntry === false ? (
            <StripeCheckout
              stripeKey={Payment}
              token={makePayment}
              name="Register"
              amount={product.price * 100}
              shippingAddress
              billingAddress
            >
              <Link
                className="dashboard-dash-dlink dashboard-dash-cursor"
                style={{ marginTop: "2rem" }}
                to="#"
              >
                <img src={Payments} alt="payment" style={{ fill: "white" }} />
                Registeration Fee {product.price} Rs
              </Link>
            </StripeCheckout>
          ) : null}
        </div>
        {/* <!-- PROFILE --> */}

        <ProfileI />

        {/* <!-- CERTIFICATION AND AWARDS --> */}

        <div
          className="dashboard-dash-profile dashboard-dash-certificate"
          id="certificate"
        >
          <div className="dashboard-dash-profile-information">
            <div className="dashboard-dash-section-heading">
              <div className="dashboard-dash-section-heading_text">
                <h3 className="dashboard-dash-section-heading_heading">
                  Certification & Awards
                </h3>
                <p className="dashboard-dash-section-heading_information">
                  Claim your Certificate Here !
                </p>
              </div>
            </div>
            <div className="dashboard-dash-profile-information_card dashboard-dash-card grid-colum-template-3-1">
              <div className="dashboard-dash-profile-information_info">
                <div className="dashboard-dash-pi-heading">
                  Event Certificates
                  <hr />
                </div>
                <div className="dashboard-dash-pi_personal-info">
                  <div className="dashboard-dash-certificate-download_group">
                    <div className="dashboard-dash-pi_info-group">
                      Please participate to get certificates
                    </div>
                  </div>

                  {/* <div className="dashboard-dash-certificate-download_group">
                    <div className="dashboard-dash-pi_info-group">
                      <div className="dashboard-dash-info-group_que">Profession</div>
                      <div className="dashboard-dash-info-group_ans">Student</div>
                    </div>
                    <Link to="#" className="dashboard-dash-certificate-download_group-button">
                      Download
                    </Link>
                  </div> */}
                </div>
                <div className="dashboard-dash-pi-heading">
                  Workshop Certificates
                  <hr />
                </div>
                <div className="dashboard-dash-pi-contact-information">
                  <div className="dashboard-dash-certificate-download_group">
                    <div className="dashboard-dash-pi_info-group">
                      Please participate to get certificates
                    </div>
                  </div>

                  {/* <div className="dashboard-dash-certificate-download_group">
                    <div className="dashboard-dash-pi_info-group">
                      <div className="dashboard-dash-info-group_que">Profession</div>
                      <div className="dashboard-dash-info-group_ans">Student</div>
                    </div>
                    <Link to="#" className="dashboard-dash-certificate-download_group-button">
                      Download
                    </Link>
                  </div> */}
                </div>
              </div>
              <div className="dashboard-dash-profile-information_pic"></div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="footer-copyright-text">
            Copyright © 2021. All Rights Reserved.
          </div>
          <div className="footer-cta">
            <Link
              to={{ pathname: "https://t.me/joinchat/D6puheMtqWI2M2Jl" }}
              target="_blank"
              className="dashboard-dash-Link-a dashboard-dash-cursor"
            >
              <FaTelegram />
              Join our Telegram Commuity
            </Link>
          </div>
          <div className="footer-sm">
            <Link
              to={{ pathname: "https://www.facebook.com/techfestsliet/" }}
              target="_blank"
              className="dashboard-dash-Link-a"
            >
              <img src={Facebook} alt="facebook" />
            </Link>
            <Link
              to={{ pathname: "https://instagram.com/techfestsliet_" }}
              target="_blank"
              className="dashboard-dash-Link-a"
            >
              <img src={Instagram} alt="instagram" />
            </Link>
            <Link
              to={{
                pathname: "https://www.linkedin.com/company/techfest-sliet",
              }}
              target="_blank"
              className="dashboard-dash-Link-a"
            >
              <img src={Linkedin} alt="linkedin" />
            </Link>
            <Link
              to={{ pathname: "https://twitter.com/techfestsliet" }}
              target="_blank"
              className="dashboard-dash-Link-a"
            >
              <FaTwitter />
            </Link>
            <Link
              to={{
                pathname:
                  "//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber",
              }}
              className="dashboard-dash-Link-a"
              target="_blank"
            >
              <img src={Youtube} alt="youtube" />
            </Link>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </main>
  );
}

export default Dash;

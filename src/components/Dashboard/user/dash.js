import React, { useState, useEffect } from 'react';
import './assets/css/dashres.css';
import ProfileI from './Profile';
import { Link } from 'react-router-dom';
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
import Facebook from './assets/Icons/facebookicon.svg';
import Instagram from './assets/Icons/instagramicon.svg';
import Linkedin from './assets/Icons/linkedinicon.svg';
import Youtube from './assets/Icons/youtubeicon.svg';
import Password from './assets/Icons/password.svg';
import moment from 'moment';
import { getUser, updateUser } from './helper/userapicalls';
import { isAuthenticated } from '../../../auth/helper';
import { Close as CloseIcon, CodeSharp } from '@material-ui/icons';
import { Button, TextField, IconButton, Fade, Backdrop, makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { useAlert } from 'react-alert';
import { API } from '../../../backend';
import StripeCheckout from "react-stripe-checkout";
import {
  FaTelegram, FaTwitter
} from 'react-icons/fa';

import { Payment } from '../../../backend';


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
    error: "",
    hasPaidEntry: false
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
    hasPaidEntry,
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
    // console.log(user)
    // console.log(token)
    setValues({ ...values, loading: true })
    getUser(userId, token).then(data => {
      // console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });

      } else {

        // setCompleteUser(data);
        setValues({
          ...values,
          hasPaidEntry: data?.hasPaidEntry ? data?.hasPaidEntry : false,
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
          whatsappPhoneNumber: data?.whatsappPhoneNumber ? data?.whatsappPhoneNumber : "",
          telegramPhoneNumber: data?.telegramPhoneNumber ? data?.telegramPhoneNumber : "",
          dob: moment(data?.dob).format('YYYY-MM-DD'),
          eventRegIn: data?.eventRegIn ? data?.eventRegIn : "",
          workshopsEnrolled: data?.workshopsEnrolled ? data?.workshopsEnrolled : "",
          loading: false
        });
        // if (values.lastName == undefined) {

        // }
      }
    });
  }

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      overflow: "scroll",

    },
    paper: {
      position: 'relative',
      backgroundColor: "#2a3249",
      width: "35%",
      ["@media (max-width:780px)"]: {
        // eslint-disable-line no-useless-computed-key
        width: "82%",
        marginTop: "32rem"
      },
      opacity: "1",
      border: "2px solid #000",
      boxShadow: theme.shadows[8],
      padding: theme.spacing(2, 4, 3),
      marginTop: '5rem'
    },

    fontstyle: {
      color: "blue",
      width: "90%",
      ["@media (max-width:780px)"]: {
        // eslint-disable-line no-useless-computed-key
        width: "90%",
      },
      marginBottom: "0.75rem",
      marginRight: "0.3125rem",
      letterSpacing: "1.3px",
    },
    input: {
      color: "white",
      fontSize: "1rem",
      ["@media (max-width:780px)"]: {
        // eslint-disable-line no-useless-computed-key
        fontSize: "0.75rem",
      },
      letterSpacing: "0.06rem",
    },
    inputLabel: {
      color: "#ffffff80",
      fontSize: "0.875rem",
    },
    right: {

      position: 'absolute',
      right: '5px',
      top: '5px'
    }

  }));
  const [variables, setVariables] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: false,
    loading: false,
    success: false,
  });
  // const loadingMessage = () => {
  //   return (
  //     variables.loading && (
  //       <div className=" text-center my-2">
  //         <div className="spinner-border text-light " role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </div>
  //       </div>
  //     )
  //   );
  // };

  // const { oldPassword, newPassword, confirmPassword, loading , error , success } =
  //   variables;

  const handleChange = (key) => (event) => {
    setVariables({ ...variables, error: false, [key]: event.target.value });
  };

  const onPaySubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, updated: false });

    updateUser(user._Id, token, {
      name,
      lastName,
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
    })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
          alert.show(`${error}`, {
            type: 'error',
            timeout: '3000'
          })
        } else {
          alert.show("Profile Updated ! ", {
            timeout: '3000',
            type: 'success'
          })


          setValues({
            ...values,
            loading: false,
            error: "",
            updated: true,

          });
        }
      })
      .catch(() => {
        alert.show("user not updated", {
          timeout: '3000',
          type: 'error'
        })
      });
    handleClose();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setVariables({ ...variables, error: false, loading: true });
    if (variables.newPassword !== variables.confirmPassword) {
      setVariables({ ...variables, error: true, loading: false });
      alert.show(`PASSWORD IS INCORRECT`, {
        type: 'error',
        timeout: '3000'
      })
    } else {
      fetch(`${API}/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword: variables.oldPassword, newPassword: variables.newPassword }),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          if (response.statusCode === 200) {
            setVariables({ ...variables, loading: false, success: true });
            alert.show('Password changed !', {
              type: 'success',
              timeout: '3000'
            });
            setShow(false);
            // return response.json();
          } else {
            setVariables({ ...variables, error: true, loading: false });
            alert.show(`PASSWORD IS INCORRECT`, {
              type: 'error',
              timeout: '3000'
            })
          }

        })

        .catch((e) => {
          setVariables({ ...variables, loading: false, success: false, error: true });
          alert.show(`PASSWORD IS INCORRECT`, {
            type: 'error',
            timeout: '3000'
          })

        });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const PasswordChange = () => {
    const classes = useStyles();
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={show}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 600,
          }}
        >
          <Fade in={show}>
            <div className={classes.paper}>
              <IconButton
                aria-label="close"
                color="inherit"
                size="medium"
                className={classes.right}
                onClick={() => {
                  setShow(false);
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>

              {loadingMessage()}
              <h3
                id="transition-modal-title"
                style={{ textAlign: "center" }}
              >
                Password Change
              </h3>

              <br />
              <TextField
                className={classes.fontstyle}
                type="text"
                label="Old Password"
                variant="outlined"
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
                InputProps={{
                  className: classes.input,
                }}
                onChange={handleChange("oldPassword")}
              />
              <TextField
                className={classes.fontstyle}
                type="text"
                label="New Password"
                variant="outlined"
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
                InputProps={{
                  className: classes.input,
                }}
                onChange={handleChange("newPassword")}
              />
              <TextField
                className={classes.fontstyle}
                type="text"
                label="Confirm Paasword"

                variant="outlined"
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
                InputProps={{
                  className: classes.input,
                }}
                onChange={handleChange("confirmPassword")}

              />
              <div style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}

                  mx="auto"
                  style={{ padding: "7px 15px", fontSize: "1.05rem" }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    preload(user._id, token);
  }, [])
  useEffect(() => {
    preload(user._id, token);

  }, [updated])



  // const style = {
  //   body :{
  //     boxSizing: 'borderBox' ,
  //     fontSize: '62.5%' ,
  //     font - family: 'Exo' ,
  //     font - size: '10px' ,
  //     color: '#fff' ,
  //     background: linear - gradient(to right, #080f1a, #102c66)


  //   }
  // }

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 5,
    productBy: "facebook"
  });

  const makePayment = tokenPay => {
    const body = {
      token: tokenPay,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`${API}/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => response.text())
      .then(data => {
        if (data != 'Success') {
          alert.show("Payment Failed", {
            type: 'error',
            timeout: '3000'
          })
          return
        }

        updateUser(user._id, token, {
          hasPaidEntry: true

        })
          .then((data) => {
            console.log(data)
            if (data.error) {
              setValues({
                ...values,
                error: data.error,
                loading: false,
              });
              alert.show(`${error}`, {
                type: 'error',
                timeout: '3000'
              })
            } else {
              alert.show("Payment Success ! ", {
                timeout: '3000',
                type: 'success'
              })

              setValues({
                ...values,
                hasPaidEntry: true,
                loading: false,
                error: "",
                updated: true,

              });
            }
          })
          .catch(() => {
            alert.show("error", {
              timeout: '3000',
              type: 'error'
            })
          });
        handleClose();
      }
      )
      .catch(error => console.log(error));
  };
  console.log(Payment)
  return (
    <main className="dashboard-dash-main-body">
      {PasswordChange()}
      {/* bg effect */}
      <img className="dashboard-dash-main_left-bar_bg" src={Leffect} alt="left-bar-bg" />
      <img src={Reffect} alt="right-middle" className="dashboard-dash-main_right-middle_bg" />
      <img
        src={BottomLeft}
        alt="left-bottom_bg"
        className="dashboard-dash-main_left-bottom_bg"
      />
      <div className="dashboard-dash-leftbar">
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
            activeClass='dashboard-dash-active'
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
            activeClass='dashboard-dash-active'
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
            activeClass='dashboard-dash-active'
            className={"dashboard-dash-dlink dashboard-dash-cursor "}
          >
            <img src={Certificate} alt="techFEST-profile-icon" />
            Certificates & Rewards
          </ScrollLink>

          {/* password change link */}
          <Link className="dashboard-dash-dlink dashboard-dash-cursor" onClick={handleShow} to='#'>
            <img src={Password} alt="password change" style={{ fill: 'white' }} />
            Change Password
          </Link>
          {console.log(values.hasPaidEntry)}
          {values.designation === 'Student' && values.hasPaidEntry === false ?
            <StripeCheckout
              stripeKey={Payment}
              token={makePayment}
              name="Register"
              amount={product.price * 100}
            >
              <Link className="dashboard-dash-dlink dashboard-dash-cursor" style={{ marginTop: '2rem' }} to='#'>
                <img src={Payments} alt="payment" style={{ fill: 'white' }} />
                Registeration Fee {product.price} Rs
              </Link>
            </StripeCheckout>
            :
            null}







        </div>
      </div>
      {/* <!-- MAIN CONTENT according to the option clicked in leftbar --> */}
      <div className="dashboard-dash-main-content">
        {loadingMessage()}
        {/* <!-- DASHBOARD --> */}
        <div className="dashboard-dash-dashboard" id="dashboard" >
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

              {values?.eventRegIn.length > 0 ?
                <div className="dashboard-dash-event-card_events-list">

                  {values?.eventRegIn.map((row) => (
                    <div className="dashboard-dash-event" key={row._id}>
                      <span className="dashboard-dash-event-name">{row.eventName}</span>
                      {/* <span className="dashboard-dash-event-time">{`${moment(row.eventDate).format('DD-MM')}`}</span> */}
                      <Link to={{ pathname: `/domain`, state: { name: "events", id: row.domainRefId, secId: row._id } }} className='btn  btn-outline-primary btn-sm'>View detail</Link>
                    </div>
                  ))
                  }


                </div>
                :
                <div className="dashboard-dash-event" style={{ borderBottom: 'none' }}>
                  <span className="dashboard-dash-event-name">Please register in Events to see detail </span>

                </div>
              }

            </div>
            {/* <!-- Workshop Card --> */}
            <div className="dashboard-dash-event-card">
              <div className="dashboard-dash-event-card_title">
                <img src={Solid} alt="event-techFEST" />
                Workshops Registered
              </div>
              {values?.workshopsEnrolled.length > 0 ?
                <div className="dashboard-dash-event-card_events-list">
                  {values?.workshopsEnrolled.map((row) => (
                    <div className="dashboard-dash-event" key={row._id}>
                      <span className="dashboard-dash-event-name">{row.workshopName}</span>
                      <Link to={{ pathname: `/domain`, state: { name: "workshops", id: row._id } }} id={row._id} message={'redirected from dashboard'} className='btn  btn-outline-primary btn-sm'>View detail</Link>
                    </div>
                  ))}
                </div>
                :
                <div className="dashboard-dash-event" style={{ borderBottom: 'none' }}>
                  <span className="dashboard-dash-event-name">Please register in Workshops to see details</span>

                </div>
              }

            </div>
          </div>
        </div>

        {/* <!-- PROFILE --> */}

        <ProfileI />


        {/* <!-- CERTIFICATION AND AWARDS --> */}

        <div className="dashboard-dash-profile dashboard-dash-certificate" id="certificate" >
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
            <Link to={{ pathname: 'https://t.me/joinchat/D6puheMtqWI2M2Jl' }} target='_blank' className="dashboard-dash-Link-a dashboard-dash-cursor">
              <FaTelegram />
              Join our Telegram Commuity
            </Link>
          </div>
          <div className="footer-sm">
            <Link to={{ pathname: "https://www.facebook.com/techfestsliet/" }} target="_blank" className="dashboard-dash-Link-a">
              <img src={Facebook} alt="facebook" />
            </Link>
            <Link to={{ pathname: 'https://instagram.com/techfestsliet_' }} target="_blank" className="dashboard-dash-Link-a">
              <img src={Instagram} alt="instagram" />
            </Link>
            <Link to={{ pathname: 'https://www.linkedin.com/company/techfest-sliet' }} target="_blank" className="dashboard-dash-Link-a">
              <img src={Linkedin} alt="linkedin" />
            </Link>
            <Link to={{ pathname: 'https://twitter.com/techfestsliet' }} target="_blank" className="dashboard-dash-Link-a">
              <FaTwitter />
            </Link>
            <Link to={{ pathname: '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber' }} className="dashboard-dash-Link-a" target='_blank'>
              <img src={Youtube} alt="youtube" />
            </Link>

          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </main>

  );
}


export default Dash

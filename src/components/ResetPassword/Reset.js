import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import bglogo from "../../assets/images/LSBGlogo.png";
import { API } from "../../backend";
import Footer from "../HomePage/Footer/Footer";
import "./Reset.css";
// import OtpInput from "react-otp-input";
// import { Link } from "react-router-dom";

const Reset = () => {
  const [otpToggle, setOtpToggle] = useState(false);
  const [signin, setSignin] = useState(false);
  const [values, setValues] = useState({
    email: "",
    error: "",
    otp: "",
    loading: false,
    success: false,
  });

  const { email, loading, error, success, otp } = values;
  const handleChange = (key) => (event) => {
    if (key === "otp") {
      setValues({
        ...values,
        error: false,
        [key]: event.target.value.substring(0, 5),
      });
    } else setValues({ ...values, error: false, [key]: event.target.value });
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className=" text-center my-2">
          <div className="spinner-border text-light " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      success && (
        <>
          {/* <div className="offset-sm-3 col-md-6 text-left"> */}
          <div
            className="alert alert-success mx-2"
            style={{ display: success ? "" : "none" }}
          >
            {otpToggle
              ? ` A new password is send to your email, Check it out !! `
              : "OTP-send to your Email !!"}
            {/* </div> */}
          </div>
        </>
      )
    );
  };
  const errorMessage = () => {
    return (
      error && (
        <>
          {/* <div className="offset-sm-3 col-md-6 text-left"> */}
          <div
            className="alert alert-danger mx-2"
            style={{ display: error ? "" : "none" }}
          >
            {otpToggle
              ? "OTP don't Matched. Check it Out"
              : "Your email is not registerd with Us. Check it again!!"}
          </div>
          {/* </div> */}
        </>
      )
    );
  };

  const onSubmitOtp = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    fetch(`${API}/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email, otp: values.otp }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setValues({ ...values, loading: true });
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data);
        if (data.statusCode === 200) {
          setValues({ ...values, loading: false, success: true });
          setTimeout(() => {
            setValues({
              email: "",
              error: "",
              otp: "",
              loading: false,
              success: false,
            });
            setOtpToggle(false);
            setSignin(true);
          }, 4000);
        } else {
          setValues({ ...values, error: true });
          return Promise.error("OTP not matched ");
        }
      })
      .catch((e) => {
        setValues({ ...values, loading: false, success: false, error: true });
        // console.log(e);
      });
  };
  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, loading: true });
    fetch(`${API}/send-otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email }),
    })
      .then((response) => {
        if (response.status === 200) {
          setValues({ ...values, loading: true });
          return response.json();
        } else {
          setValues({ ...values, error: true });
          return Promise.error("Email Not Found");
        }
      })
      .then(() => {
        setValues({ ...values, loading: false, success: true });

        setTimeout(() => {
          setValues({ ...values, loading: false, success: false });
          setOtpToggle(true);
        }, 3000);
      })
      .catch((e) => {
        setValues({ ...values, loading: false, success: false, error: true });
        // console.log(e);
      });
  };
  const reserPasswordEmailForm = () => {
    return (
      <form id="reset" className="input-group">
        <div className="RLSbox mt-2">
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label lsLabel">
              Email address
            </label>
            <input
              type="email"
              className="form-control LSinputField"
              id="userEmail"
              placeholder="example@gmail.com"
              autoComplete="email"
              value={email}
              onChange={handleChange("email")}
              required
            />
          </div>
          {otpToggle && (
            <div className="mb-3">
              <label htmlFor="otp" className="form-label lsLabel">
                OTP
              </label>
              <input
                type="text"
                className="form-control LSinputField"
                id="otp"
                placeholder=""
                value={otp}
                onChange={handleChange("otp")}
                required
              />
            </div>
          )}

          <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
            onClick={otpToggle ? onSubmitOtp : onSubmit}
          />
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="RloginBG"></div>
      <div className="RloginBGlogo">
        <img src={bglogo} alt="background logo" />
      </div>
      <div className="RloginSignup">
        <div className="RlsFormBox  ">
          <h1 className="text-center text-white pt-4">TechFEST'21</h1>
          <p className="tagline">Revitalizing India : Growth Beyond Infinity</p>
          <h4 className="text-center my-3">
            Enter your registered email to reset password
          </h4>
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {reserPasswordEmailForm()}
        </div>
      </div>
      <Footer />
      {signin && <Redirect to="/signin" />}
    </>
  );
};

export default Reset;

import React, { useState, useEffect } from "react";
import LoginSignUp from "../components/RegisterPage/LoginSignUp";
import { API } from "../backend";
import { useAlert } from 'react-alert';

function SignIn() {

  const alert = useAlert();

  const [isVerify, setIsVerify] = useState(false);
  const variable = {
    vf: null,
    id: null,
  };
  const accountVerification = () => {
    // const { search } = useLocation();
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const vf = urlParams.get("vf");
    const id = urlParams.get("id");
    if (vf !== null && id !== null) {
      variable.vf = vf;
      variable.id = id;
      fetch(`${API}/verify`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variable),
      })
        .then((response) => {
          console.log(response)
          return response.json();

        })
        .then((data) => {
          console.log(data);
          if (data.statusCode === 200) {

            alert.show(`${data.message}`, {
              type: 'success',
              timeout: '3000'
            })
            setIsVerify(true);
          }
          else {
            alert.show(`${data.error}`, {
              type: 'error',
              timeout: '3000'
            })
            setIsVerify(false);
          }


        })
        .catch((error) => {
          alert.show(`${error}`, {
            type: 'error',
            timeout: '3000'
          })
          setIsVerify(false);
        });
    } else {
      setIsVerify(true);
    }
  };
  useEffect(() => {
    accountVerification();
  }, []);
  return (
    { isVerify } ? (<div style={{ backgroundColor: "black" }}>
      <LoginSignUp isLogin={true} />
    </div>) : (<div style={{ backgroundColor: "black" }}>
      <LoginSignUp isLogin={true} />

    </div>)


  );
}

export default SignIn;

import React, { useEffect } from 'react';
import { Footer } from '../../components';
import HeroSection from '../../components/HomePage/MainSection/HeroSection';
import { API } from '../../backend';
import { useAlert } from 'react-alert';
function Home() {
  const alert = useAlert();
  const variable = {
    id: null,
    code: null,
    eventId: null
  };
  const addTeamMember = () => {
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    const code = urlParams.get("code");
    const id = urlParams.get("id");
    const event = urlParams.get("event");

    if (code !== null && id !== null && event !== null) {
      variable.id = id
      variable.code = code
      variable.eventId = event
      fetch(`${API}/user/accept-team`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variable),
      })
        .then((response) => {
          return response.json();

        })
        .then((data) => {
          if (data.statusCode === 200) {
            alert.show(`${data.message}`, {
              type: 'success',
              timeout: '3000'
            })
          }
          else {
            alert.show(`${data.error}`, {
              type: 'error',
              timeout: '3000'
            })
          }
        })
        .catch((error) => {
          alert.show(`${error}`, {
            type: 'error',
            timeout: '2000'
          })

        });
    }
  }

  useEffect(() => {
    addTeamMember();
  }, [])
  return (
    <div>
      <HeroSection />
      {/* <InfoSection {...homeObjOne} /> */}
      {/* <HomeSponsor /> */}
      <Footer />
    </div>
  );
}

export default Home;

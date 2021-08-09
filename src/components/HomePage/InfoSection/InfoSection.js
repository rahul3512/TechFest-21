import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../../../globalStyles';
import img4 from '../../../assets/images/img6.jpg';
import './InfoSection.css';

import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from './InfoSection.elements';
import imgf from '../../../assets/images/video.png'
import { MenuItem } from '@material-ui/core';
// import { MenuItem } from '@material-ui/core';

function InfoSection({
  primary,
  lightBg1,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  buttonLabel1,
  img,
  alt,
  imgStart,
  start
}) {
  return (
    <div style={{ width: '100%' }}>
      <InfoSec lightBg={lightBg1} style={{
        marginTop: '-8px',
        backgroundImage: `url(${img4})`,
        backgroundRepeat: 'no-repeat',
        // backgroundSize: '100%',
        backgroundSize: 'cover',
        // backgroundColor: 'blue'
      }} >

        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn style={{ "margin-top": "55px" }}>
              <TextWrapper>
                <Heading lightText={lightText}>{headline}</Heading>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                <div style={{ display: 'inline-flex' }}>
                  <Link to='/domain' >
                    <Button primary={primary}>
                      {buttonLabel}
                    </Button>
                  </Link>

                  {/* <Link to='/about-us' style={{ width: '0px', color: 'white', background: 'transparent' }}>
                  <Button>
                    {buttonLabel1}
                  </Button>
                </Link> */}

                  <MenuItem className="navmenu" component={Link} to="/about-us">About Us</MenuItem>
                </div>
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <div>
                <iframe width="100%" height="300" src="https://www.youtube.com/embed/Nt58vSQqBU8?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" alt={alt} style={{ borderRadius: '50px' }} allowfullscreen></iframe>
                {/*<Img src={imgf} alt={alt} style={{ borderRadius: '50px' }} /> */}
              </div>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </div >
  );
}

export default InfoSection;

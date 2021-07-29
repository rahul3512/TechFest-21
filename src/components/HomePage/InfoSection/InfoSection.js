import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../../../globalStyles';
import img4 from '../../../assets/images/img6.jpg';

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
        width: '100%'
        // backgroundColor: 'blue'
      }} >

        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
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
              <ImgWrapper start={start}>
                <Img src={imgf} alt={alt} style={{ borderRadius: '50px' }} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </div >
  );
}

export default InfoSection;

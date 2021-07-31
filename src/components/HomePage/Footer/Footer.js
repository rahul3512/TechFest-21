import React from 'react';
import { Button } from '../../../globalStyles';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import {
  FooterContainer,
  FooterSubHeading,
  SocialMedia,
  SocialMediaWrap,
  SocialIcons,
  SocialIconLink
} from './Footer.elements';


function Footer() {


  return (
    <FooterContainer>

      <SocialMedia>
        <SocialMediaWrap>
          <FooterSubHeading >
            Copyright © 2021. All Rights Reserved.
          </FooterSubHeading>
          <SocialIconLink href='https://t.me/joinchat/D6puheMtqWI2M2Jl' target='_blank' aria-label='Telegram'>
            <Button fontBig >Join Our Telegram Community</Button>
          </SocialIconLink>


          <SocialIcons>
            <SocialIconLink href='https://www.facebook.com/techfestsliet/' target='_blank' aria-label='Facebook'>
              <FaFacebook />
            </SocialIconLink>
            <SocialIconLink href='https://instagram.com/techfestsliet_' target='_blank' aria-label='Instagram'>
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href={
                'https://www.youtube.com/channel/UCTSrKfF90hZq7reWgd2oyZg'
              }
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href='https://twitter.com/techfestsliet' target='_blank' aria-label='Twitter'>
              <FaTwitter />
            </SocialIconLink>
            <SocialIconLink href='https://www.linkedin.com/company/techfest-sliet' target='_blank' aria-label='LinkedIn'>
              <FaLinkedin />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;

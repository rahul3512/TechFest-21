import styled from 'styled-components';

export const Button = styled.button`
font-family: EXO;
  border-radius: 49px;
  background: ${({ primary }) => (primary ? '#04FFF0' : '#102C66')};
  
  background: linear-gradient(97.53deg, #04FFF0 0.02%, #102C66 138.78%);

  white-space: nowrap;
  padding: ${({ big }) => (big ? '10px 27px' : '7px 10px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '12px' : '15px')};
  outline: none;
  border: none;
  cursor: pointer;
  margin: 10px;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
  }

  @media screen and (max-width: 960px) {
    width: 86%;
  } 

`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const InfoSec = styled.div`
  color: #fff;
  padding: 80px 0;
  /* background-image: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%); */
  /* background: ${({ lightBg }) => (lightBg ? '#fff' : '#101522')}; */
`;

export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;

  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const ImgWrapper = styled.div`
  /* border: 2px solid black; */
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

export const TopLine = styled.div`
font-family: VBI;
  color: ${({ lightTopLine }) => (lightTopLine ? ' #06FFC3' : '#4B59F7')};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;

  @media screen and (max-width: 768px){
    font-size: 15px;
  }
`;

export const Img = styled.img`
    margin-top: -57px;
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const Heading = styled.h1`
font-family: VBI;
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};

  @media screen and (max-width: 768px) {
    font-size: 35px;
  }
`;

export const Subtitle = styled.p`
font-family: EXO;
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#fff' : '#1c2237')};
`;

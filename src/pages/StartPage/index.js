import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import heroRabbit from "../../../public/hero-running-right.png";
import MainButton from "../../components/MainButton";
import Buttons from "../../components/shared/Buttons";

const clouds = [1, 2, 3, 4, 5, 6, 7];

const StartPage = () => {
  const history = useHistory();

  const handleSinglePlayButton = () => {
    history.push("/game");
  };

  const handleMatchingPageButton = () => {
    history.push("/join");
  };

  const handleRecordsButton = () => {
    history.push("/records");
  };

  return (
    <PageWrapper>
      <Clouds>
        {clouds.map((item) => (
          <div key={item} className="cloud"/>
        ))}
      </Clouds>
      <MainCard>
        <Buttons>
          <MainButton name="Single Play" onClick={handleSinglePlayButton} />
          <MainButton name="Multi Play" onClick={handleMatchingPageButton} />
          <MainButton name="Record" onClick={handleRecordsButton} />
        </Buttons>
        <SpriteImage />
      </MainCard>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainCard = styled.div`
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  background: pink;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
`;

const SpriteImage = styled.div`
  height: 128px;
  width: 768px;
  background: url(${heroRabbit}) 0px 0px;
  animation: play 0.9s steps(4) infinite;

  @keyframes play {
    100% {
      background-position: -500px;
    }
  }
`;

const Clouds = styled.div`
  .cloud {
    display: block;
    width: 320px;
    height: 110px;
    background: #e0e0e0;
    position: absolute;
    border-radius: 90px;
  }

  .cloud:after,
  .cloud:before {
    content: "";
    position: absolute;
    background: #e0e0e0;
  }

  .cloud:after {
    width: 100px;
    height: 100px;
    top: -30px;
    left: 40px;
    border-radius: 100%;
  }

  .cloud:before {
    width: 170px;
    height: 180px;
    top: -90px;
    right: 50px;
    border-radius: 100%;
  }

  .cloud:nth-child(1) {
    top: 105px;
    left: 5px;
    transform: scale(0.6);
  }

  .cloud:nth-child(2) { 
    top: 210px;
    left: 300px;
  }

  .cloud:nth-child(3) {
    top: 70px;
    left: 570px;
    transform: scale(0.8);
  }

  .cloud:nth-child(4) {
    top: 210px;
    left: 750px;
    transform: scale(0.8);
  }

  .cloud:nth-child(5) {
    top: 130px;
    left: 1000px;
    transform: scale(0.5);
  }

  .cloud:nth-child(6) {
    top: 65px;
    left: 1250px;
    transform: scale(0.6);
  }

  .cloud:nth-child(7) { 
    top: 190px;
    left: 1500px;
  }
`;

export default StartPage;

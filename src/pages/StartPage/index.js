import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import rabbit from "../../../public/rabbit.gif";
import rabb from "../../../public/main-rabbit.png";
import carrot from "../../../public/hero-running-right.png";
import dieCarrot from "../../../public/hero-die-left.png";

import MainButton from "../../components/MainButton";
import Buttons from "../../components/shared/Buttons";

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
  console.log(rabbit);
  return (
    <PageWrapper>
      <MainCard>
        <TitleBox>
          <Title>
            <TitleText>
              <span className="title">Don't</span>
              <span className="title">Catch</span>
              <span className="title">Me</span>
            </TitleText>
          </Title>
          <Sprites>
            <SpriteCarrot />
            <SpriteRabbit />
          </Sprites>
        </TitleBox>
        <Buttons>
          <MainButton name="Single Play" onClick={handleSinglePlayButton} />
          <MainButton name="Multi Play" onClick={handleMatchingPageButton} />
          <MainButton name="Record" onClick={handleRecordsButton} />
        </Buttons>
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
  width: 800px;
  height: 600px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  background: #F9F7F4;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: "Fjalla One", sans-serif;
  max-width: 225px;
  transform: translateX(-50%) rotate(-8deg);
  margin-top: 20%;
  margin-left: 50%;
`;

const TitleText = styled.h1`
  color: #fff;
  font-size: 90px;
  margin: 0;
  line-height: 98%;
  letter-spacing: 5px;

  .title {
    float: left;
    transform: skew(-8deg);
    text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px, #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;

    &:nth-child(1) {
      color: #e55643;
    }
    &:nth-child(2) {
      color: #2b9f5e;
    }
    &:nth-child(3) {
      color: #f1c83c;
    }
  }
`;

const Sprites = styled.div`
  display: flex;
  margin-left: 20px;
`;

const SpriteRabbit = styled.div`
  width: 210px;
  height: 256px;
  margin-top: 10px;
  background: url(${rabb}) 0px 0px;
  animation: play 0.7s steps(2) infinite;

  @keyframes play {
    100% {
      background-position: -1000px;
    }
  }
`;

const SpriteCarrot = styled.div`
  width: 115px;
  height: 128px;
  margin-top: 165px;
  margin-left: 35px;
  background: url(${dieCarrot}) 0px 0px;
`;

export default StartPage;

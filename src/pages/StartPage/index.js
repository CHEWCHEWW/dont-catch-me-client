import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import walkingRabbit from "../../../public/rabbit.png";
import deadCarrot from "../../../public/hero-die-left.png";

import MainButton from "../../components/MainButton";

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
  console.log(walkingRabbit);
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
  background: #81EBF3;
`;

const MainCard = styled.div`
  width: 850px;
  height: 650px;
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
  font: "Fjalla One", sans-serif;
  max-width: 225px;
  transform: translateX(-50%) rotate(-7.5deg);
  margin-top: 12%;
  margin-left: 48%;
`;

const TitleText = styled.h1`
  color: #fff;
  font-size: 90px;
  margin: 0;
  line-height: 95%;
  letter-spacing: 5px;

  .title {
    float: left;
    transform: skew(-7.5deg);
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
  margin-left: 40px;
`;

const SpriteRabbit = styled.div`
  width: 211px;
  height: 256px;
  margin-top: 10px;
  background: url(${walkingRabbit}) 0px 0px;
  animation: play 0.4s steps(3) infinite;

  @keyframes play {
    from { background-position: 0px; }
    to { background-position: -1536px; }
  }
`;

const SpriteCarrot = styled.div`
  width: 128px;
  height: 128px;
  margin-top: 165px;
  margin-left: 35px;
  transform: scale(1.1);
  background: url(${deadCarrot}) 0px 0px no-repeat;
  animation: play 0.7s steps(6) infinite;

  @keyframes play {
    from { background-position: 0px; }
    to { background-position: -768px; }
  }
`;

const Buttons = styled.div`
  width: 500px;
  display: flex;
  margin-top: 320px;
  flex-direction: column;
  justify-content: center;
`;

export default StartPage;

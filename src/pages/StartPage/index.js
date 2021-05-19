import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import walkingRabbit from "../../../public/main-running-rabbit.png";
import deadCarrot from "../../../public/hero-die-left.png";
import trees from "../../../public/trees.png";

import MainButton from "../../components/MainButton";
// import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";
import clouds from "../../../public/clouds.png"

const StartPage = () => {
  const history = useHistory();

  const handleSinglePlayButton = () => {
    history.push("/game/single");
  };

  const handleMatchingPageButton = () => {
    history.push("/join");
  };

  const handleRecordsButton = () => {
    history.push("/records");
  };
  
  return (
    <PageWrapper>
      {/* <TopTrees /> */}
      <PageCard width={850} height={650}>
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
        <ButtonField>
          <MainButton name="Single Play" onClick={handleSinglePlayButton} />
          <MainButton name="Multi Play" onClick={handleMatchingPageButton} />
          <MainButton name="Record" onClick={handleRecordsButton} />
        </ButtonField>
      </PageCard>
      <BottomTrees />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F0E7DC;
  flex-direction: column;
  /* background-image: url(${clouds});
  background-repeat: repeat-x;  */
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
  width: 200px;
  height: 256px;
  margin-top: 10px;
  background: url(${walkingRabbit}) 0px 0px;
  animation: play 0.4s steps(3) infinite;
  color: black;

  @keyframes play {
    from { 
      background-position: 0px; 
    }
    to { 
      background-position: -1536px; 
    }
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
    from { 
      background-position: 0px; 
    }
    to { 
      background-position: -768px; 
    }
  }
`;

const TopTrees = styled.div`
  position: fixed;
  top: 0;
  width: 1900px;
  height: 128px;
  background: url(${trees}) 0px 0px;
`;

const BottomTrees = styled.div`
  position: fixed;
  bottom: 0;
  width: 1900px;
  height: 128px;
  background: url(${trees}) 0px 0px;
`;

const ButtonField = styled.div`
  display: flex;
  text-align: center;
  margin-top: 280px;
  margin-left: 60px;
  margin-right: 110px;
  flex-direction: column;
  justify-content: center;
`;

export default StartPage;

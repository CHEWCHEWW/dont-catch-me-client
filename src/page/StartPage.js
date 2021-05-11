import React from "react";
import styled from "styled-components";

import heroRabbit from "../../public/hero-running-right.png";

const PageWrapper = styled.div`

`;

const SpriteImage = styled.div`
  position: relative;
  height: 128px;
  width: 768px;
  background: url(${heroRabbit}) 0px 0px;
  animation: play 0.7s steps(4) infinite;

  @keyframes play {
    100% {
      background-position: -500px;
    }
  }
`;

const StartPage = () => {
  return (
    <PageWrapper>
      <SpriteImage />
    </PageWrapper>
  );
};

export default StartPage;

import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";

const CountDownModalView = ({ leftTime }) => {
  return (
    <ModalView width={800} height={500} color="rgba(0, 0, 0, 0.3)">
      <ContentLayout>
        <GameMessage>
          {leftTime}
        </GameMessage>
      </ContentLayout>
    </ModalView>
  );
};

const CountDownTimeText = styled.h1`
  font-size: 30px;
  margin: 0;
`;

export default CountDownModalView;

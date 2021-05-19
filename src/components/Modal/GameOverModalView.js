import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";

const GameOverModalView = ({ onClick, message = "LOSE" }) => {
  return (
    <ModalView width={1024} height={768} color="rgba(0, 0, 0, 0.3)">
      <ContentLayout>
        <GameMessage>
          {message}
        </GameMessage>
        <Button onClick={onClick}>HOME</Button>
      </ContentLayout>
    </ModalView>
  );
};

const Button = styled.button`
  width: 20px;
  height: 10px;
  font-size: 20px;
  background: #e55643;
  color: white;
  border-radius: 5px;
  border: 0;
`;

export default GameOverModalView;

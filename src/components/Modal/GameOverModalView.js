import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";
import { theme } from "../../theme/theme";

const GameOverModalView = ({
  onHomeClick,
  message = "LOSE",
  onRestartClick,
  isMultiplay
}) => {
  return (
    <ModalView width={800} height={600} color={theme.ModalBackground}>
      <ContentLayout>
        <GameMessage>
          {message}
        </GameMessage>
        <ButtonField>
          <Button onClick={onHomeClick}>HOME</Button>
          {isMultiplay && <Button onClick={onRestartClick}>REPLAY</Button>}
        </ButtonField>
      </ContentLayout>
    </ModalView>
  );
};

const Button = styled.button`
  width: 95px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  background: ${({ theme }) => theme.MainRed};
  color: white;
  margin-left: 10px;
  border-radius: 8px;
  box-shadow: 0 8px 0 #AB3C2D, 0 15px 20px rgba(0, 0, 0, 0.35);
  transition: box-shadow .1s ease-in-out;
  border: 0;

  :active,
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px ${({ theme }) => theme.ModalBackground};
  }

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }
`;

const ButtonField = styled.div`
 display: flex;
`;

export default GameOverModalView;

import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";

const GameOverModalView = ({ onClick, message = "LOSE" }) => {
  return (
    <ModalView padding={20} width={500} height={400}>
      <ContentLayout>
        <GameMessage>{message}</GameMessage>
        <button onClick={onClick}>HOME</button>
      </ContentLayout>
    </ModalView>
  );
};

export default GameOverModalView;

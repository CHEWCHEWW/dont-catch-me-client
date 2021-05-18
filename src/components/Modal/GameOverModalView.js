import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";
import GameMessage from "../shared/GameMessage";

const GameOverModalView = ({ onClick, message = "LOSE" }) => {
  return (
    <ModalView padding={20} width={500} height={400}>
      <ModalContent>
        <GameMessage>{message}</GameMessage>
        <button onClick={onClick}>HOME</button>
      </ModalContent>
    </ModalView>
  );
};

export default GameOverModalView;

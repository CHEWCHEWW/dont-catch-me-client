import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";

const StartGameModalView = ({ onClick }) => {
  return (
    <ModalView padding={20} width={700} height={500}>
      <ModalContent onClick={onClick}>
        <TextBoard>
          <div>Rabbit!! Rabbit!!</div>
        </TextBoard>
        <button onClick={onClick}>Start</button>
      </ModalContent>
    </ModalView>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background: red;
`;

const TextBoard = styled.div`
  width: 80%;
  height: 40%;
  background: red;
`;

export default StartGameModalView;

import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";

const GameStartModalView = ({ onClick }) => {
  return (
    <ModalView padding={20} width={500} height={400}>
      <ModalContent>
        <TextBoard>
          <div>Rabbit!! Rabbit!!</div>
        </TextBoard>
        <button onClick={onClick}>Start</button>
      </ModalContent>
    </ModalView>
  );
};

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: pink;
  align-items: center;
  justify-content: center;
`;

const TextBoard = styled.div`
  width: 80%;
  height: 40%;
  background: white;
  text-align: center;
`;

export default GameStartModalView;

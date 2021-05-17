import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";

const GameStartModalView = ({ onClick }) => {
  return (
    <ModalView padding={20} width={1024} height={768} color="rgba(242, 241, 241, 0.55)">
      <ModalContent color="rgba(242, 241, 241, 0.55)">
        <TextBoard>
          <div>Rabbit!! Rabbit!!</div>
        </TextBoard>
        <button onClick={onClick}>Start</button>
      </ModalContent>
    </ModalView>
  );
};

const TextBoard = styled.div`
  width: 80%;
  height: 40%;
  /* background: rgba(242, 241, 241, 0.55); */
  text-align: center;
`;

export default GameStartModalView;

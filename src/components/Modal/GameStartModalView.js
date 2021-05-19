import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";

const GameStartModalView = ({ onClick }) => {
  return (
    <ModalView padding={20} width={1024} height={768} color="rgba(242, 241, 241, 0.55)">
      <ContentLayout>
        <TextBoard>
          <div>Rabbit!! Rabbit!!</div>
        </TextBoard>
        <button onClick={onClick}>Start</button>
      </ContentLayout>
    </ModalView>
  );
};

const TextBoard = styled.div`
  width: 80%;
  height: 40%;
  text-align: center;
`;

export default GameStartModalView;

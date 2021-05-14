import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";

const MakeRoomModalView = ({ onClick }) => {
  return (
    <ModalView padding={20} width={400} height={300}>
      <ModalContent>
        <form>
          <input type="text" />
          <input type="submit" onClick={onClick} value="MAKE" />
        </form>
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

export default MakeRoomModalView;

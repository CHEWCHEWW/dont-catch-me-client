import React from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";

const JoinMatchingRoomModalView = ({ userName, onChange, onSubmit }) => {
  return (
    <ModalView padding={20} width={400} height={300}>
      <ModalContent>
        <ModalForm onSubmit={onSubmit}>
          <input type="text" name="userName" value={userName} onChange={onChange} />
          <input type="submit" value="Join" />
        </ModalForm>
      </ModalContent>
    </ModalView>
  );
};

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default JoinMatchingRoomModalView;

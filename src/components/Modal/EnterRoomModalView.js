import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";

const EnterRoomModalView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [invitationCode, setInvitationCode] = useState("");

  const handleInvitationCodeChange = ({ target: { value } }) => {
    setInvitationCode(value);
  };

  const handleInvitationCodeSubmit = (ev) => {
    ev.preventDefault();

    history.push(`/lobby/${invitationCode}`);
  };

  return (
    <ModalView padding={20} width={400} height={300}>
      <ModalContent>
        <ModalForm onSubmit={handleInvitationCodeSubmit}>
          <input type="text" name="invitiaionCode" value={invitationCode} onChange={handleInvitationCodeChange} />
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

export default EnterRoomModalView;

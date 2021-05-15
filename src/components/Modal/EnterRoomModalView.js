import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";

const EnterRoomModalView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [enterInfo, setEnterInfo] = useState({
    invitationCode: "",
    username: "",
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setEnterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInvitationCodeSubmit = (ev) => {
    ev.preventDefault();

    dispatch(enterRoom({ roomId: enterInfo.invitationCode, username: enterInfo.username }));
    history.push(`/lobby/${invitationCode}`);
  };

  return (
    <ModalView padding={20} width={400} height={300}>
      <ModalContent>
        <ModalForm onSubmit={handleInvitationCodeSubmit}>
          <input type="text" name="username" value={enterInfo.invitationCode} onChange={handleInputChange} />
          <input type="text" name="invitiaionCode" value={enterInfo.invitationCode} onChange={handleInputChange} />
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

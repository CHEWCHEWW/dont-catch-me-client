import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { makeNewRoom } from "../../redux/slices/roomSlice";
import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";
import useKakao from "../../hooks/useKakao";
import { generateRandomCode } from "../../utils/random";

const MakeInvitaionModalView = ({ onMoveNextPage, onExit }) => {
  const [invitationCode, setInvitationCode] = useState("");
  const { handleMessageSend } = useKakao();
  const dispatch = useDispatch();

  useEffect(() => {
    const randomCode = generateRandomCode();
    
    dispatch(makeNewRoom(randomCode));
    
    setInvitationCode(`http://localhost:3000/${randomCode}`);
  }, []);

  const handleInvitationButtonClick = () => {
    handleMessageSend(invitationCode);
  };

  const handleEnterButtonClick = () => {
    onExit(false);
    onMoveNextPage(true);
  };

  return (
    <ModalView padding={20} width={400} height={300}>
      <ModalContent>
        <input type="text" value={invitationCode} readOnly/>
        <Button onClick={handleInvitationButtonClick}>카카오로 초대하기</Button>
        <Button onClick={handleEnterButtonClick}>입장하기</Button>
      </ModalContent>
    </ModalView>
  );
};

const Button = styled.div`
  width: 40%;
  height: 10%;
  margin: 10px auto;
  border-radius: 5px;
  background: white;
`;

export default MakeInvitaionModalView;

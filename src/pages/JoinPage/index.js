import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Buttons from "../../components/shared/Buttons";
import EnterRoomModalView from "../../components/Modal/EnterRoomModalView";
import MainButton from "../../components/MainButton";
import Modal from "../../components/Modal";
import useKakao from "../../hooks/useKakao";
import { setNewRoom } from "../../redux/slices/roomSlice";

const JoinPage = () => {
  const { handleMessageSend } = useKakao();
  const history = useHistory();
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isEnterRoomModalOpen, setIsEnterRoomModalOpen] = useState(false);
  const roomID = useSelector(({ room }) => room.roomID);
  const dispatch = useDispatch();
  
  const handleEnterButtonClick = () => {
    if (!roomID) {
      setIsEnterRoomModalOpen(true);

      return;
    }

    history.push(`/${roomID}`);
  };

  const handleInvitationButtonCLick = () => {
    handleMessageSend("aesdfdsd");

    dispatch(setNewRoom({ roomID: "aesdfdsd", }));
  };

  return (
    <Buttons>
      {isEnterRoomModalOpen && (
        <Modal>
          <EnterRoomModalView />
        </Modal>
      )}
      <MainButton name="초대하기" onClick={handleInvitationButtonCLick} />
      <MainButton name="입장하기" onClick={handleEnterButtonClick} />
    </Buttons>
  );
};

export default JoinPage;

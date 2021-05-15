import React, { useState } from "react";

import Buttons from "../../components/shared/Buttons";
import EnterRoomModalView from "../../components/Modal/EnterRoomModalView";
import MakeInvitaionModalView from "../../components/Modal/MakeRoomModalView";
import MainButton from "../../components/MainButton";
import Modal from "../../components/Modal";

const JoinPage = () => {
  // const roomID = useSelector(({ room }) => room.roomID);
  const [isEnterRoomModalOpen, setIsEnterRoomModalOpen] = useState(false);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  
  const handleEnterButtonClick = () => {
    setIsEnterRoomModalOpen(!isEnterRoomModalOpen);
  };

  const handleInvitationButtonCLick = () => {
    setIsInvitationModalOpen(!isInvitationModalOpen);
  };

  return (
    <Buttons>
      {isEnterRoomModalOpen && (
        <Modal>
          <EnterRoomModalView />
        </Modal>
      )}
      {isInvitationModalOpen && (
        <Modal>
          <MakeInvitaionModalView 
            onMoveNextPage={setIsEnterRoomModalOpen} 
            onExit={setIsInvitationModalOpen} 
          />
        </Modal>
      )}
      <MainButton name="입장하기" onClick={handleEnterButtonClick} />
      <MainButton name="초대하기" onClick={handleInvitationButtonCLick} />
    </Buttons>
  );
};

export default JoinPage;

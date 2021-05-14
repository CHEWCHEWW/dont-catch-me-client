import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import MakeRoomModalView from "../../components/Modal/MakeRoomModalView";
import JoinMatchingRoomModalView from "../../components/Modal/JoinMatchingRoomModalView";
import Modal from "../../components/Modal";
import RoomEntry from "../../components/RoomEntry";
import RoomInfoCard from "../../components/RoomInfoCard";
import PlayerInfoForm from "../../components/PlayerInfoForm";
import { uuidv4 } from "../../utils/uuid";
import useKakao from "../../hooks/useKakao";
const dummyRoomList = [
  {
    key: "adfdafafaf",
    name: "happy",
    players: [
      { name: "happy", isReady: true, roll: "carrot" },
      { name: "jenny", isReady: true, roll: "rabbit" },
      { name: "chew", isReady: false, roll: "rabbit" },
    ],
    state: "open",
  },
  { key: "fagah", name: "happy", players: ["happy", "caca"], state: "play" },
  {
    key: "hdjhgjdhj",
    name: "happy",
    players: ["happy", "roopy"],
    state: "ready",
  },
  {
    key: "aetarg",
    name: "happy",
    players: ["happy", "jieun", "haha"],
    state: "ready",
  },
  { key: "adfad", name: "happy", players: ["happy", "room"], state: "play" },
  {
    key: "adfdragerfgafafaf",
    name: "happy",
    players: ["happy"],
    state: "ready",
  },
];

const MatchingPage = () => {
  const dispatch = useDispatch();
  const { userName, userID, isReady } = useSelector(userInfoSelector);
  const { handleMessageSend } = useKakao();
  
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false); 
  const [roomName, setRoomName] = useState("");
  const [playerInfo, setPlayerInfo] = useState({
    userName,
    isReady,
    roll: "rabbit",
  });
  const history = useHistory();
  
  const onClick = () => {
    
  };

  const setPlayerInfoByName = ({ name, value }) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMakeRoomButtonClick = () => {
    setIsRoomModalOpen(true);
  };

  const handleJoinMatchingPage = (ev) => {
    ev.preventDefault();

    const userID = uuidv4();

    setPlayerInfoByName({ name: "userID", value: userID });
    dispatch(enterMatchingPage({ userName: playerInfo.userName, userID }));
  };

  const handleMakeRoom = (ev) => {
    ev.preventDefault();

    const roomID = uuidv4();

    setIsRoomModalOpen(false);
    dispatch(makeNewRoom({ roomName, roomID, userID: playerInfo.userID }));
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  const handleEditRollButtonClick = (ev) => {
    ev.preventDefault();
    
    if (playerInfo.isReady) {
      setPlayerInfoByName({ name: "isReady", value: false });

      return;
    }
    
    setPlayerInfoByName({ name: "isReady", value: true });

    dummyRoomList[0].players.push(playerInfo);
  };

  const handleFormChange = ({ target: { name, value }}) => {
    setPlayerInfoByName({ name, value });
  };

  const handleRoomNameChange = ({ target: { value } }) => {
    setRoomName(value);
  }

  return (
    <PageWrapper>
      <button onClick={handleMessageSend}>hy</button>
      {userName?.length === 0 && (
        <Modal>
          <JoinMatchingRoomModalView 
            onSubmit={handleJoinMatchingPage} 
            onChange={handleFormChange} 
            userName={playerInfo.userName} 
          />
        </Modal>
      )}
      {isRoomModalOpen && (
        <Modal>
          <MakeRoomModalView 
            onSubmit={handleMakeRoom} 
            onChange={handleRoomNameChange} 
            roomName={roomName} 
          />
        </Modal>
      )}
      <Column>
        {dummyRoomList.map((room) => (
          <RoomEntry 
            key={room.key} 
            name={room.name} 
            playerCount={room.players.length} 
            state={room.state} 
          />
        ))}
        <button onClick={handleMakeRoomButtonClick}>Make Room</button>
        <button onClick={handleBackButtonClick}>Back</button>
      </Column>
      <Column>
        <div>
          <h2>{dummyRoomList[0].name}</h2>
          <PlayerList>
            {dummyRoomList[0].players.map((player, index) => (
              <RoomInfoCard 
                key={index} 
                name={player.name} 
                isReady={player.isReady} 
                roll={player.roll} 
              />
            ))}
          </PlayerList>
          <PlayerInfoForm 
            name={playerInfo.name} 
            onChange={handleFormChange}
            onSubmit={handleEditRollButtonClick} 
            isDisabled={playerInfo.isReady} 
          />
        </div>
      </Column>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: skyblue;
  justify-content: center;
  overflow: hidden;
`;

const Column = styled.div`
  width: 45%;
  height: 100%;
  background: yellow;
  margin: auto;
  overflow-y: scroll;
`;

const PlayerList = styled.div`
  width: 80%;
  height: 80%;
  background: pink;
`;

export default MatchingPage;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import MakeRoomModalView from "../../components/Modal/MakeRoomModalView";
import Modal from "../../components/Modal";
import RoomEntry from "../../components/RoomEntry";
import RoomInfoCard from "../../components/RoomInfoCard";
import PlayerInfoForm from "../../components/PlayerInfoForm";

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
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    playerRoll: "rabbit",
    isReady: false,
  });

  const history = useHistory();

  const handleMakeRoomButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  const handleRoomClick = (ev) => {
    console.log(ev);
  };

  const setPlayerInfoByName = ({ name, value }) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <PageWrapper>
      {isModalOpen && (
        <Modal>
          <MakeRoomModalView onClick={handleMakeRoomButtonClick} />
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

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import MakeRoomModalView from "../../components/Modal/MakeRoomModalView";
import Modal from "../../components/Modal";

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
    setIsModalOpen(true);
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  const handleRoomClick = (ev) => {
    console.log(ev);
  };

  const handleEditRollButtonClick = (ev) => {
    ev.preventDefault();
    
    if (playerInfo.isReady) {
      return;
    }

    setPlayerInfo((prev) => ({
      ...prev,
      isReady: true,
    }))
    
    dummyRoomList[0].players.push(playerInfo);
  };

  const handleFormChange = ({ target: { value, name }}) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <PageWrapper>
      {isModalOpen && (
        <Modal>
          <MakeRoomModalView />
        </Modal>
      )}
      <Column>
        {dummyRoomList.map((room) => (
          <div key={room.key} onClick={handleRoomClick}>
            <h3>name: {room.name}</h3>
            <h5>player: {room.players.length}</h5>
            <h5>state: {room.state}</h5>
          </div>
        ))}
        <button onClick={handleMakeRoomButtonClick}>Make Room</button>
        <button onClick={handleBackButtonClick}>Back</button>
      </Column>
      <Column>
        <div>
          <h2>{dummyRoomList[0].name}</h2>
          <PlayerList>
            {dummyRoomList[0].players.map((player, index) => (
              <div key={index}>
                {player.name}
                {player.isReady ? "ready" : "unReady"}
                {player.roll}
              </div>
            ))}
          </PlayerList>
          <EditStateField onSubmit={handleEditRollButtonClick}>
            <input type="text" name="name" value={playerInfo.name} onChange={handleFormChange} />
            <div name="playerRoll" onChange={handleFormChange}>
              <input type="radio" name="playerRoll" value="rabbit" defaultChecked/>
              <label>rabbit</label>
              <input type="radio" name="playerRoll" value="carrot" />
              <label>carrot</label>
            </div>
            <input type="submit" />
          </EditStateField>
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

const EditStateField = styled.form`
  width: 80%;
  height: 10%;
  background: gray;
`;

export default MatchingPage;

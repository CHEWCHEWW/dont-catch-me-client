import React from "react";
import styled from "styled-components";

const dummyRoomList = [
  { key:"adfdafafaf", name: "happy", player: 6, state: "ready" },
  { key:"fagah", name: "happy", player: 6, state: "play" },
  { key:"hdjhgjdhj", name: "happy", player: 6, state: "ready" },
  { key:"aetarg", name: "happy", player: 6, state: "ready" },
  { key:"adfad", name: "happy", player: 6, state: "play" },
  { key:"adfdragerfgafafaf", name: "happy", player: 6, state: "ready" },
];

const MatchingPage = () => {
  const handleRoomClick = (ev) => {
    console.log(ev);
  };

  return (
    <PageWrapper>
      <Column>
        {dummyRoomList.map((room) => (
          <div key={room.key} onClick={handleRoomClick}>
            <h3>name: {room.name}</h3>
            <h5>player: {room.player}</h5>
            <h5>state: {room.state}</h5>
          </div>
        ))}
        <button>Make Room</button>
        <button>Back</button>
      </Column>
      <Column>
        
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

export default MatchingPage;

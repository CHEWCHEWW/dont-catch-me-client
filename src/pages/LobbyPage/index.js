import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import PlayerCard from "../../components/PlayerCard";
import PlayerInfoForm from "../../components/PlayerInfoForm";

const LobbyPage = () => {
  const dispatch = useDispatch();
  const players = useSelector(({ multiple }) => multiple.roomState.players);
  const userInfo = useSelector(({ multiple }) => multiple.userState);
  const { id } = useParams();

  useEffect(() => {
    dispatch(enterRoom({ roomId: id }));
    console.log(players);
    console.log(userInfo);
  }, []);

  return (
    <PageWrapper>
      {players.map((player, index) => (
        <PlayerCard 
          key={index} 
          name={player.username} 
          isReady={player.isReady} 
          role={player.role} 
        />
      ))}
      <PlayerInfoForm />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default LobbyPage;

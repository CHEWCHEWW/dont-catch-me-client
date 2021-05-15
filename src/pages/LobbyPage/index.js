import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import PlayerCard from "../../components/PlayerCard";
import PlayerInfoForm from "../../components/PlayerInfoForm";
import { gameProgress } from "../../constants/gameState";

const LobbyPage = () => {
  const dispatch = useDispatch();
  const { players, progress } = useSelector(({ multiple }) => multiple.roomState);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(enterRoom({ roomId: id }));
  }, []);

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      history.push("/multiplay");
    }
  }, [progress]);

  return (
    <PageWrapper>
      {Object.values(players).map((player, index) => (
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

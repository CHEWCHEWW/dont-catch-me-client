import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import PlayerList from "../../components/PlayerList";
import UserInfoForm from "../../components/UserInfoForm";
import UsernameForm from "../../components/UsernameForm";
import { gameProgress } from "../../constants/gameState";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";
import { updateGameProgress, changeReadyState } from "../../redux/slices/multiplaySlice";

const WaitingPage = () => {
  const dispatch = useDispatch();
  const { players, progress, isAllUsersReady } = useSelector(({ multiple }) => multiple.room);
  const { isReady, username, role } = useSelector(({ multiple }) => multiple.user);
  
  const history = useHistory();
  const { id } = useParams();

  const [playerName, setPlayerName] = useState("");

  // useEffect(() => {
  //   dispatch(enterRoom({ roomId: id }));
  // }, []);

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      history.push("/multiplay");
    }
  }, [progress]);

  const handleUsernameFormChange = ({ target: { value } }) => {
    setPlayerName(value);
  };

  const handleUsernameFormSubmit = (ev) => {
    ev.preventDefault();

    dispatch(enterRoom({ username: playerName, roomId: id }));
  };

  return (
    <PageWrapper>
      <PageCard width={800} height={500} isColumn={true}>
        {!username ? (
          <>
            <h1>Before Waiting...</h1>
            <UsernameForm 
              onChange={handleUsernameFormChange}
              onSubmit={handleUsernameFormSubmit}
              value={playerName}
            />
          </>
        ) : (
          <>
            <Title>Waiting Room</Title>
            <Content>
              <PlayerList players={players} />
              <UserField>
                <UserInfoForm 
                  isReady={isReady} 
                  username={username} 
                  role={role} 
                />
                <StartButton disabled={!isAllUsersReady}>
                  Game Start
                </StartButton>
              </UserField>
            </Content>
          </> 
        )}
      </PageCard>
    </PageWrapper>
  );
};

const Content = styled.div`
  display: flex;
  width: 90%;
  height: 95%;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-top: 50px;
`;

const UserField = styled.div`
  width: 35%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StartButton = styled.button`
  width: 100%;
  height: 18%;
  margin-top: 8%;
  border: 0;
  font-size: 20px;
  background: pink;
`;

export default WaitingPage;

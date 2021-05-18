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
import { changeReadyState } from "../../redux/slices/multiplaySlice";

const WaitingPage = () => {
  const dispatch = useDispatch();
  const { players, progress, isAllUsersReady } = useSelector(({ multiple }) => multiple.room);
  const { isReady, username, role } = useSelector(({ multiple }) => multiple.user);
  
  const history = useHistory();
  const { id } = useParams();

  const [playerInfo, setPlayerInfo] = useState({
    username,
    role,
    isReady
  });

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      history.push("/multiplay");
    }
  }, [progress]);

  
  const handleFormChange = ({ target: { name, value } }) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUsernameFormSubmit = (ev) => {
    ev.preventDefault();

    dispatch(enterRoom({ username: playerInfo.username, roomId: id }));
  };

  const handleButtonClick = () => {
    setPlayerInfo((prev) => ({
      ...prev,
      isReady: !isReady,
    }));
  };

  const handleUserInfoFormSubmit = (ev) => {
    ev.preventDefault();
    
    dispatch(changeReadyState({ ...playerInfo, }));
  };

  return (
    <PageWrapper>
      <PageCard width={800} height={500} isColumn={true}>
        {!username ? (
          <>
            <h1>Before Waiting...</h1>
            <UsernameForm 
              onChange={handleFormChange}
              onSubmit={handleUsernameFormSubmit}
              value={playerInfo.username}
              name="username"
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
                  username={playerInfo.username} 
                  role={playerInfo.role}
                  onChange={handleFormChange}
                  onClick={handleButtonClick}
                  onSubmit={handleUserInfoFormSubmit}
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

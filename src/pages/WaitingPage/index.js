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
import Modal from "../../components/Modal";
import CountDownModalView from "../../components/Modal/CountDownModalView";
import { changeReadyState, updateGameProgress } from "../../redux/slices/multiplaySlice";

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

  const [isCountDownModalOn, setIsCountDownModalOn] = useState(false);
  const [leftTime, setLeftTime] = useState(3);

  useEffect(() => {
    if (progress === gameProgress.GAME_ALL_PLAYER_READY) {
      setIsCountDownModalOn(true);
    }

    if (progress === gameProgress.GAME_START) {
      setIsCountDownModalOn(false);

      history.push(`/multiplay/${id}`);
    }
  }, [progress]);

  useEffect(() => {
    if (!isCountDownModalOn) {
      return;
    }

    if (leftTime === 0) {
      dispatch(updateGameProgress(gameProgress.GAME_START));

      return;
    }
  
    const interval = window.setInterval(() => {
      setLeftTime((prev) => --prev);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [leftTime, isCountDownModalOn]);
  
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
            {isCountDownModalOn && (
              <Modal>
                <CountDownModalView leftTime={leftTime} />
              </Modal>
            )}
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
                  Start
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

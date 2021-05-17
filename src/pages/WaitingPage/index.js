import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { enterRoom } from "../../redux/slices/multiplaySlice";
import PlayerList from "../../components/PlayerList";
import UserInfoForm from "../../components/UserInfoForm";
import UserNameForm from "../../components/UserNameForm";
import { gameProgress } from "../../constants/gameState";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const WaitingPage = () => {
  const dispatch = useDispatch();
  const { players, progress } = useSelector(({ multiple }) => multiple.room);
  // const username = useSelector(({ multiple }) => multiple.user.username);
  const history = useHistory();
  const { id } = useParams();
  const username = "24";
  useEffect(() => {
    dispatch(enterRoom({ roomId: id }));
  }, []);

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      history.push("/multiplay");
    }
  }, [progress]);

  const happy = {
    afadfaf: {
      username: "dafad",
      isReady: true,
      role: "rabbit"
    },
    adfafadfa: {
      username: "adfaffa",
      isReady: false,
      role: "carrot"
    },
    adfadf: {
      username: "adfdafag",
      isReady: true,
      role: "rabbit"
    },
    gdhdh: {
      username: "afgfdsgsgsg",
      isReady: false,
      role: "carrot"
    }
  };

  return (
    <PageWrapper>
      <PageCard width={800} height={500} isColumn={true}>
        {username.length ? (
          <>
            <h1>Before Waiting...</h1>
            <UserNameForm />
          </>
        ) : (
          <>
            <Title>Waiting Room</Title>
            <Content>
              <PlayerList players={happy} />
              <UserField>
                <UserInfoForm />
                <StartButton>Game Start</StartButton>
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

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { makeNewRoom } from "../../redux/slices/multiplaySlice";
import useKakao from "../../hooks/useKakao";
import { generateRandomCode } from "../../utils/random";
import PageWrapper from "../../components/shared/PageWrapper";

const JoinPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const [invitationUrl, setInvitationUrl] = useState("");
  const history = useHistory();
  const { handleMessageSend } = useKakao();
  const dispatch = useDispatch();

  useEffect(() => {
    const randomCode = generateRandomCode();
    
    dispatch(makeNewRoom(randomCode));

    setInvitationUrl(`http://localhost:3000/lobby/${randomCode}`);
    setInvitationCode(randomCode);
  }, []);

  const handleInvitationButtonClick = () => {
    handleMessageSend(`lobby/${invitationCode}`);
  };

  const handleEnterButtonClick = () => {
    history.push(`lobby/${invitationCode}`);
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  return (
    <PageWrapper>
      <PageCard>
        <Content>
          <Title>Make Room</Title>
          <Input type="text" value={invitationUrl} readOnly/>
          <ButtonBoard>
            <Buttons>
              <Button onClick={handleInvitationButtonClick}>Share</Button>
              <Button onClick={handleEnterButtonClick}>Entrance</Button>
            </Buttons>
            <BackButton onClick={handleBackButtonClick}>
              <FontAwesomeIcon icon={faUndo} />
            </BackButton>
          </ButtonBoard>
        </Content>
      </PageCard>
    </PageWrapper>
  );
};

const Title = styled.h2`
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 0;
`;

const ButtonBoard = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  min-width: 40%;
  height: 100%;
  margin: 5px;
  border-radius: 5px;
  background: blue;
`;

const BackButton = styled.button`
  width: 83%;
  height: 30%;
  background: red;
  margin-top: 10px;
  border-radius: 5px;
  border: 0px;
`;

const Content = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 10%;
  border-radius: 5px;
  border: 0;
  margin-top: 70px;
`;

const PageCard = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  background: #F9F7F4;
`;

export default JoinPage;

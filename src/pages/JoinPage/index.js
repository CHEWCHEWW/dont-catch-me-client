import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { makeNewRoom } from "../../redux/slices/multiplaySlice";
import useKakao from "../../hooks/useKakao";
import { generateRandomCode } from "../../utils/random";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const JoinPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const [invitationUrl, setInvitationUrl] = useState("");
  const history = useHistory();
  const { handleMessageSend } = useKakao();
  const dispatch = useDispatch();

  useEffect(() => {
    const randomCode = generateRandomCode();
    
    dispatch(makeNewRoom(randomCode));

    setInvitationUrl(`http://localhost:3000/waiting/${randomCode}`);
    setInvitationCode(randomCode);
  }, []);

  const handleInvitationButtonClick = () => {
    handleMessageSend(`${invitationCode}`);
  };

  const handleEnterButtonClick = () => {
    history.push(`waiting/${invitationCode}`);
  };

  const handleBackButtonClick = () => {
    history.push("/");
  };

  const handleInputClick = () => { // copy 되었다고 알림 띄우기
    window.navigator.clipboard.writeText(invitationUrl);
  };

  return (
    <PageWrapper>
      <PageCard width={500} height={400}>
        <Content>
          <Title>Make Room</Title>
          <Input type="text" value={invitationUrl} onClick={handleInputClick} readOnly/>
          <ButtonField>
            <SmallButtonField>
              <Button onClick={handleInvitationButtonClick}>Share</Button>
              <Button onClick={handleEnterButtonClick}>Enter</Button>
            </SmallButtonField>
            <BackButton onClick={handleBackButtonClick}>
              Back
            </BackButton>
          </ButtonField>
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

const ButtonField = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  margin-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SmallButtonField = styled.div`
  display: flex;
  width: 100%;
  height: 35%;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  margin: 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background: pink;
`;

const BackButton = styled.button`
  width: 83%;
  height: 35%;
  background: gray;
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
  text-align: center;
`;

export default JoinPage;

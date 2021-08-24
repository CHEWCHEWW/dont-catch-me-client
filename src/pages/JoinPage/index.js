import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import {
  COPIED_ALARM_MESSAGE,
  TOAST_APPEARANCE,
  JOIN_TITLE,
  BACK_BUTTON,
  ENTER_BUTTON,
  SHARE_BUTTON,
} from "../../constants/ui";
import { makeNewRoom } from "../../redux/slices/multiplaySlice";
import useKakao from "../../hooks/useKakao";
import { generateRandomCode } from "../../utils/random";
import PageCard from "../../components/shared/PageCard";
import PageWrapper from "../../components/shared/PageWrapper";
import { theme } from "../../theme/theme";
import { BoxInnerShadow } from "../../theme/BoxInnerShadow";

const JoinPage = () => {
  const [invitationCode, setInvitationCode] = useState("");
  const history = useHistory();
  const { handleMessageSend } = useKakao();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const randomCode = generateRandomCode();

    dispatch(makeNewRoom(randomCode));

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

  const handleInputClick = () => {
    window.navigator.clipboard.writeText(`${process.env.PORT}/waiting/${invitationCode}`);

    const alarmMessage = COPIED_ALARM_MESSAGE;

    addToast(alarmMessage, {
      appearance: TOAST_APPEARANCE,
      autoDismiss: true,
    });
  };

  return (
    <PageWrapper color={theme.BackgroundBeige}>
      <PageCard width={500} height={400}>
        <Content>
          <Title>{JOIN_TITLE}</Title>
          <Input
            type="text"
            value={`${process.env.PORT}/waiting/${invitationCode}`}
            onClick={handleInputClick}
            readOnly
          />
          <ButtonField>
            <SmallButtonField>
              <Button onClick={handleInvitationButtonClick}>
                {SHARE_BUTTON}
              </Button>
              <Button onClick={handleEnterButtonClick}>
                {ENTER_BUTTON}
              </Button>
            </SmallButtonField>
            <LargeButton onClick={handleBackButtonClick}>
              {BACK_BUTTON}
            </LargeButton>
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
  background: ${({ theme }) => theme.MainRed};
  color: white;
  box-shadow: 0 6px 0 #AB3C2D, 0 5px 10px ${({ theme }) => theme.ModalBackground};
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  cursor: pointer;

  :hover {
    background-color: #F16A58;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active,
  :focus {
    box-shadow: 0 8px 0 #AB3C2D, 0 12px 10px ${({ theme }) => theme.ModalBackground};
  }
`;

const LargeButton = styled.button`
  width: 83%;
  height: 35%;
  margin-top: 10px;
  border-radius: 5px;
  border: 0px;
  color: white;
  background: ${({ theme }) => theme.MainGreen};
  box-shadow: 0 6px 0 ${({ theme }) => theme.DarkGreen}, 0 5px 10px ${({ theme }) => theme.ModalBackground};
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  cursor: pointer;

  :hover {
    background-color: #37BB71;
    text-shadow: 0 -1px 1px rgba(175, 49, 95, 0.9), 0 0 5px rgba(255, 255, 255, 0.8);
  }

  :active,
  :focus {
    box-shadow: 0 8px 0 ${({ theme }) => theme.DarkGreen}, 0 12px 10px ${({ theme }) => theme.ModalBackground};
  }
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
  ${BoxInnerShadow};
`;

export default JoinPage;

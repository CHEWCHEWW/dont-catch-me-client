import React from "react";
import styled from "styled-components";

const PlayerCard = ({ name, isReady, role }) => {
  return (
    <Card isReady={isReady} role={role}>
      <Title>{name}</Title>
      <Content>{role}</Content>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  width: 95%;
  height: 14%;
  padding: 10px;
  flex-direction: column;
  background: ${({ isReady, role, theme }) =>
    isReady ? (role === "rabbit" ? theme.MainRed : theme.MainGreen) : theme.White};
  color: ${({ isReady, theme }) => isReady && theme.White};
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 3px 3px ${({ theme }) => theme.ModalBackground};
`;


const Title = styled.h4`
  font-size: 22px;
  font-weight: lighter;
  margin: 0;
`;

const Content = styled.h4`
  font-size: 18px;
  margin: 8px;
  text-align: right;
  font-weight: lighter;
`;

export default PlayerCard;

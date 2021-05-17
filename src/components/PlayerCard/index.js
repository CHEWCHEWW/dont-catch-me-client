import React from "react";
import styled from "styled-components";

const PlayerCard = ({ name, isReady, role }) => {
  return (
    <Card>
      <Title>{name}</Title>
      <Content>{isReady ? "ready" : "unReady"}</Content>
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
  background: violet;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Content = styled.h4`
  margin: 0;
  text-align: right;
`;

export default PlayerCard;

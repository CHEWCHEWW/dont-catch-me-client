import React from "react";
import styled from "styled-components";

const MainButton = ({ name, onClick }) => {
  return (
    <Button onClick={onClick}>
      {name}
    </Button>
  );
};

const Button = styled.button`
  width: 65%;
  height: 50px;
  border-radius: 5px;
  margin: 12px auto;
  background: white;
  font-size: 30px;
`;

export default MainButton;

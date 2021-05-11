import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 300px;
  height: 50px;
  border: 0px;
  margin: 10px auto;
  background: white;
  font-size: 30px;
`;

const MainButton = ({ name, onClick }) => {
  return (
    <Button onClick={onClick}>
      {name}
    </Button>
  );
};

export default MainButton;

import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 400px;
  height: 200px;
  border: 0px;
`;

const MainButton = ({ name, onClick }) => {
  return (
    <Button onClick={onClick}>
      {name}
    </Button>
  );
};

export default MainButton;

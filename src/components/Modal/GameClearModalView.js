import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";

const GameClearModalView = ({ onClick }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = ({
    target: {
      name,
      value,
    },
  }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(24);
  };

  return (
    <ModalView padding={20} width={500} height={400}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange}></input>
          <input type="submit" value="Submit!" />
        </form>
      </ModalContent>
    </ModalView>
  );
};

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: pink;
  align-items: center;
  justify-content: center;
`;

export default GameClearModalView;

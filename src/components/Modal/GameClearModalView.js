import React, { useState } from "react";
import styled from "styled-components";

import ModalView from "../shared/ModalView";
import UserNameForm from "../UserNameForm";
import { saveGameClearUserRecord } from "../../api";
import { uuidv4 } from "../../utils/uuid";
import ModalContent from "../shared/ModalContent";
import GameMessage from "../shared/GameMessage";

const GameClearModalView = ({ onClick }) => {
  const [formData, setFormData] = useState({ username: "" });
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

    saveGameClearUserRecord({ id: uuidv4(), record });
  };

  return (
    <ModalView padding={20} width={700} height={400}>
      <ModalContent>
        <GameMessage>CLEAR</GameMessage>
        <UserNameForm 
          onSubmit={handleSubmit} 
          value={formData.name} 
          onChange={handleInputChange} 
          name="username" 
        />
      </ModalContent>
    </ModalView>
  );
};

export default GameClearModalView;

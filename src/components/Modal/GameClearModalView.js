import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ModalView from "../shared/ModalView";
import UserNameForm from "../UserNameForm";
import { saveGameClearUserRecord } from "../../api";
import { uuidv4 } from "../../utils/uuid";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";
import { saveGameRecord } from "../../redux/slices/singlePlaySlice";

const GameClearModalView = ({ onClick, score }) => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { value } }) => {
    setUsername(value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    dispatch(saveGameRecord({ id: uuidv4(), score, username }));
    onClick();
  };

  return (
    <ModalView width={1024} height={768} color="rgba(0, 0, 0, 0.3)">
      <ContentLayout>
        <GameMessage>CLEAR</GameMessage>
        <UserNameForm 
          onSubmit={handleSubmit} 
          value={username} 
          onChange={handleInputChange} 
          name="username" 
        />
      </ContentLayout>
    </ModalView>
  );
};

export default GameClearModalView;

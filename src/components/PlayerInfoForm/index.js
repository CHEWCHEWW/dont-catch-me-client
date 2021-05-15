import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import RadioInput from "../RadioInput";
import { changeReadyState } from "../../redux/slices/multiplaySlice";

const PlayerInfoForm = ({ isReady, username, role }) => {
  const dispatch = useDispatch();

  const [playerInfo, setPlayerInfo] = useState({
    username,
    role,
    isReady
  });

  const handleFormChange = ({ target: { name, value } }) => {
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    setPlayerInfo((prev) => ({
      ...prev,
      isReady: !isReady,
    }));
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    
    dispatch(changeReadyState({ ...playerInfo, }));
  };

  return (
    <EditStateField onSubmit={handleFormSubmit}>
      <input type="text" name="username" value={playerInfo.name} onChange={handleFormChange} disabled={isReady} />
      <div name="role" onChange={handleFormChange}>
        <RadioInput 
          name="role" 
          value="rabbit" 
          isDisabled={isReady} 
          isDefaultChecked={role === "rabbit" ? true : false} 
        />
        <RadioInput 
          name="role" 
          value="carrot" 
          isDisabled={isReady}
          isDefaultChecked={role === "rabbit" ? false : true} 
        />
      </div>
      <input type="submit" value={isReady ? "Edit" : "Ready"} onClick={handleButtonClick} />
    </EditStateField>
  );
};

const EditStateField = styled.form`
  width: 80%;
  height: 10%;
  background: gray;
`;

export default PlayerInfoForm;

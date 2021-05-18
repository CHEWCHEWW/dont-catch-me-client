import React from "react";
import styled from "styled-components";

import RadioInput from "../RadioInput";

const UserInfoForm = ({ 
  isReady, 
  username, 
  role, 
  onChange, 
  onClick, 
  onSubmit 
}) => {
  return (
    <EditStateField onSubmit={onSubmit}>
      <TextInput 
        type="text" 
        name="username" 
        value={username} 
        onChange={onChange} 
        disabled={isReady} 
      />
      <RadioField name="role" onChange={onChange}>
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
      </RadioField>
      <Button type="submit" value={isReady ? "Edit" : "Ready"} onClick={onClick} />
    </EditStateField>
  );
};

const EditStateField = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 41%;
  background: gray;
  align-items: center;
`;

const RadioField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const TextInput = styled.input`
  width: 80%;
  height: 12%;
  margin-top: 20px;
`;

const Button = styled.input`
  width: 50%;
  height: 25%;
  margin-top: 20px;
  background: white;
  border: 0;
  font-size: 20px;
`;

export default UserInfoForm;

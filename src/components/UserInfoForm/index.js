import React from "react";
import styled from "styled-components";
import { BoxInnerShadow } from "../../theme/BoxInnerShadow";
import { ButtonActiveAndFocus } from "../../theme/ButtonActiveAndFocus";
import { ButtonHover } from "../../theme/ButtonHover";
import { ButtonTextShadow } from "../../theme/ButtonTextShadow";

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
  align-items: center;
  width: 100%;
  height: 41%;
  background: ${({ theme }) => theme.White};
  border-radius: 5px;
  box-shadow: 0 3px 3px ${({ theme }) => theme.ModalBackground};
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
  border: 0;
  border-radius: 10px;
  text-align: center;
  ${BoxInnerShadow};
`;

const Button = styled.input`
  width: 50%;
  height: 25%;
  margin-top: 20px;
  background: ${({ theme }) => theme.MainRed};
  border: 0;
  border-radius: 5px;
  font-size: 20px;
  color: ${({ theme }) => theme.White};
  box-shadow: 0 6px 0 ${({ theme }) => theme.DarkRed}, 0 5px 10px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  ${ButtonTextShadow};
  ${ButtonActiveAndFocus};
  ${ButtonHover};
`;

export default UserInfoForm;

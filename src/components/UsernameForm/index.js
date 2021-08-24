import React from "react";
import styled from "styled-components";
import { BoxInnerShadow } from "../../theme/BoxInnerShadow";
import { ButtonActiveAndFocus } from "../../theme/ButtonActiveAndFocus";
import { ButtonHover } from "../../theme/ButtonHover";

const UserNameForm = ({ onSubmit, value, onChange, name = "" }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Please enter your name"
        value={value}
        name={name}
        onChange={onChange}
      />
      <SubmitButton type="submit" value="go" />
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  width: 40%;
  flex-direction: column;
`;

const Input = styled.input`
  height: 30px;
  margin-bottom: 5%;
  text-align: center;
  border: 0;
  ${BoxInnerShadow};
`;

const SubmitButton = styled.input`
  height: 30px;
  margin-bottom: 5%;
  text-align: center;
  border: 0;
  color: white;
  background: ${({ theme }) => theme.MainRed};;
  box-shadow: 0 6px 0 #AB3C2D, 0 5px 10px rgba(0, 0, 0, 0.35);
  text-shadow: 0 -2px 2px rgba(175, 49, 95, 0.9);
  border-radius: 5px;
  ${ButtonHover};
  ${ButtonActiveAndFocus};
`;

export default UserNameForm;

import React from "react";
import styled from "styled-components";

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
      <Input type="submit" value="go" />
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
`;

export default UserNameForm;

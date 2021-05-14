import React from "react";
import styled from "styled-components";

import RadioInput from "../RadioInput";

const PlayerInfoForm = ({ onSubmit, onChange, isDisabled, name }) => {
  return (
    <EditStateField onSubmit={onSubmit}>
      <input type="text" name="userName" value={name} onChange={onChange} disabled={isDisabled} />
      <div name="roll" onChange={onChange}>
        <RadioInput 
          name="roll" 
          value="rabbit" 
          isDisabled={isDisabled} 
          isDefaultChecked={true} 
        />
        <RadioInput 
          name="roll" 
          value="carrot" 
          isDisabled={isDisabled}
          isDefaultChecked={false} 
        />
      </div>
      <input type="submit" value={isDisabled ? "Edit" : "Ready"} />
    </EditStateField>
  );
};

const EditStateField = styled.form`
  width: 80%;
  height: 10%;
  background: gray;
`;

export default PlayerInfoForm;

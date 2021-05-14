import React from "react";

const RoomEntry = ({ name, playerCount, state, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>name: {name}</h3>
      <h5>player: {playerCount}</h5>
      <h5>state: {state}</h5>
    </div>
  );
};

export default RoomEntry;

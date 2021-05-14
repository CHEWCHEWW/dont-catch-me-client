import React from "react";

const RoomInfoCard = ({ name, isReady, roll }) => {
  return (
    <div>
      {name}
      {isReady ? "ready" : "unReady"}
      {roll}
    </div>
  );
};

export default RoomInfoCard;

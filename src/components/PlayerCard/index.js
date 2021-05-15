import React from "react";

const PlayerCard = ({ name, isReady, role }) => {
  return (
    <div>
      {name}
      {isReady ? "ready" : "unReady"}
      {role}
    </div>
  );
};

export default PlayerCard;

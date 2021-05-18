import React from "react";

import ModalView from "../shared/ModalView";
import ModalContent from "../shared/ModalContent";

const CountDownModalView = ({ leftTime }) => {
  return (
    <ModalView padding={20} width={800} height={500}>
      <ModalContent>
        {leftTime}
      </ModalContent>
    </ModalView>
  );
};

export default CountDownModalView;

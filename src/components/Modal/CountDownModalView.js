import React from "react";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";
import { theme } from "../../theme/theme";

const CountDownModalView = ({ leftTime, width, height }) => {
  return (
    <ModalView width={width} height={height} color={theme.ModalBackground}>
      <ContentLayout>
        <GameMessage>
          {leftTime}
        </GameMessage>
      </ContentLayout>
    </ModalView>
  );
};

export default CountDownModalView;

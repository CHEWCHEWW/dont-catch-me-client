import React from "react";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";
import { theme } from "../../theme/theme";

const CountDownModalView = ({ leftTime }) => {
  return (
    <ModalView width={800} height={600} color={theme.ModalBackground}>
      <ContentLayout>
        <GameMessage>
          {leftTime}
        </GameMessage>
      </ContentLayout>
    </ModalView>
  );
};

export default CountDownModalView;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import config from "../../phaser/scenes/multiplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/multiplaySlice";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const MultiplayPage = () => {
  const progress  = useSelector(gameProgressSelector);
  const isWin = useSelector(({ multiple: { user } }) => user.isWin);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  const handleGameOverModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <PageWrapper>
      <PageCard>
        {progress === gameProgress.GAME_OVER && (
          <Modal>
            <GameOverModalView onClick={handleGameOverModalClick} message={isWin && "WIN"} />
          </Modal>
        )}
        <div id="game-container" />
      </PageCard>
    </PageWrapper>
  );
};

export default MultiplayPage;

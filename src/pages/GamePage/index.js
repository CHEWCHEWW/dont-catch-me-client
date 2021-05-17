import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { singleConfig } from "../../phaser/config";
import Modal from "../../components/Modal";
import GameStartModalView from "../../components/Modal/GameStartModalView";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import GameClearModalView from "../../components/Modal/GameClearModalView";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/singlePlaySlice";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const GamePage = () => {
  const { progress } = useSelector(gameProgressSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const game = new Phaser.Game(singleConfig);

    game.events.on("gameStart", () => {
      dispatch(updateGameProgress(gameProgress.GAME_START));
    });
  }, []);

  const handleGameOverModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  const handleGameClearModalClick = () => {
    history.push("/records");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <PageWrapper>
        {progress === gameProgress.GAME_OVER && (
          <Modal>
            <GameOverModalView onClick={handleGameOverModalClick} />
          </Modal>
        )}
        {progress === gameProgress.GAME_CLEAR && (
          <Modal>
            <GameClearModalView onClick={handleGameClearModalClick} />
          </Modal>
        )}
      <PageCard width={1024} height={768}>
        <GameContainer id="game-container" />
      </PageCard>
    </PageWrapper>
  );
};

const GameContainer = styled.div`
  border-radius: 10px;
`;

export default GamePage;

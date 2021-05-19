import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import clouds from "../../../public/clouds.png"
import config from "../../phaser/scenes/singleplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import GameClearModalView from "../../components/Modal/GameClearModalView";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/singlePlaySlice";
// import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const GamePage = () => {
  const { progress } = useSelector(gameProgressSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const game = new Phaser.Game(config);

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

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #B9F8FF;
  background-image: url(${clouds});
  background-repeat: repeat-x; 
`;

export default GamePage;

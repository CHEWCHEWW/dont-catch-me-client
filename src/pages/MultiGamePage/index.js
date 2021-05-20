import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import clouds from "../../../public/clouds.png"
import config from "../../phaser/scenes/multiplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import { gameProgress } from "../../constants/gameState";
import { resetGame, gameProgressSelector } from "../../redux/slices/multiplaySlice";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";

const MultiGamePage = () => {
  const progress  = useSelector(gameProgressSelector);
  const isWin = useSelector(({ multiple: { user } }) => user.isWin);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  const handleHomeButtonClick = () => {
    history.push("/");

    dispatch(resetGame());
  };

  const handleGameRestartButtonClick = () => {};

  return (
    <PageWrapper color="#B9F8FF" src={clouds}>
      <PageCard>
        {progress === gameProgress.GAME_OVER && (
          <Modal>
            <GameOverModalView onClick={handleHomeButtonClick} message={isWin && "WIN"} />
          </Modal>
        )}
        <GameContainer id="game-container" />
      </PageCard>
    </PageWrapper>
  );
};

const GameContainer = styled.div`
  border-radius: 10px;
`;

export default MultiGamePage;

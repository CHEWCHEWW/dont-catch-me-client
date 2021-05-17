import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../../theme/theme";
import StartPage from "../../pages/StartPage";
import GamePage from "../../pages/GamePage";
import MultiPlayPage from "../../pages/MultiplayPage.js";
import JoinPage from "../../pages/JoinPage";
import WaitingPage from "../../pages/WaitingPage";
import RecordPage from "../../pages/RecordPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <StartPage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/join">
          <JoinPage />
        </Route>
        <Route path="/lobby/:id">
          <WaitingPage />
        </Route>
        <Route path="/multiplay">
          <MultiPlayPage />
        </Route>
        <Route path="/records">
          <RecordPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;

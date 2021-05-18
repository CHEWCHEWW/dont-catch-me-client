import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
        <Route path="/game/single">
          <GamePage />
        </Route>
        <Route path="/game" exact>
          <GamePage />
        </Route>
        <Route path="/join">
          <JoinPage />
        </Route>
        <Route path="/waiting/:id">
          <WaitingPage />
        </Route>
        <Route path="/game/:id">
          <MultiPlayPage />
        </Route>
        <Route path="/records">
          <RecordPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
};

export default App;

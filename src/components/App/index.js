import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../../theme/theme";
import StartPage from "../../pages/StartPage";
import GamePage from "../../pages/GamePage";
import DummyPage from "../../pages/DummyPage";

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
        <Route path="/records">
          <DummyPage />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;

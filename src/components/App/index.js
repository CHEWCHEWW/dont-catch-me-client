import React from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../../theme/theme";
import StartPage from "../../page/StartPage";
import GamePage from "../../page/GamePage";

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
      </Switch>
    </ThemeProvider>
  );
};

export default App;

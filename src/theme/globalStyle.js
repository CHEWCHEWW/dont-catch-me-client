import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Fjalla+One&family=Righteous&display=swap");
  
  * {
    font-family: "Righteous", "Ubuntu", cursive;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;

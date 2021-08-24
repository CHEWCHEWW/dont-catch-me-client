import { createGlobalStyle } from "styled-components";
import mainFont from "../../public/font/ConcertOne-Regular.ttf"

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Righteous", "Ubuntu", cursive;

    @font-face {
      font-family: MainFont;
      src: url(${mainFont});
    }
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;

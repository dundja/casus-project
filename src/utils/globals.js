import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 62.5%;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
      font-weight: 400;
      line-height: 1.6;
    }
`;

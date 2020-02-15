import React, { Fragment } from 'react';
import {createGlobalStyle} from "styled-components";
import reset from "styled-reset/lib";

const GlobalStyle = createGlobalStyle`
    ${reset}
`;

const App: React.FC = () => {
  return (
    <Fragment>
        <GlobalStyle/>
      Hello World!
    </Fragment>
  );
};

export default App;

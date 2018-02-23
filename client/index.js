// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Button from 'material-ui/Button';

const StyledButton = styled(Button)`
  && {
    background-color: #3f51b5;
    color: white;
  }
`;

const MainApp = () => (
  <div>
    <Button variant="raised" color="primary">
      <h1>Material-UI</h1>
    </Button>
    <StyledButton>
      <h1>Styled Components</h1>
    </StyledButton>
  </div>
);

ReactDOM.hydrate(<MainApp />, document.getElementById('rootNode'));

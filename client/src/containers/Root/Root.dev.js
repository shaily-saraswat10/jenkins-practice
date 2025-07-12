import React from 'react';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from '../App/App';
import theme from './Theme';

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;

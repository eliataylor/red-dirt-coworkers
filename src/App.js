import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FellowApp from './Components/FellowApp';
import { SnackbarProvider } from 'notistack';

export default function App() {

  const theme =
      createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#90AB43',
            contrastText: '#202020',
          },
          secondary: {
            main: '#495703',
            contrastText: '#202020',
          },
        },
      });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <FellowApp />
    </SnackbarProvider>
    </ThemeProvider>
  );
}

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store.js';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
  },
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

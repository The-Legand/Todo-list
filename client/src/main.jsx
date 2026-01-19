import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import NewTaskButton from './components/NewTaskButton.jsx';



const theme = createTheme({
  palette:{
    mode: "dark",
    primary: {main:"#90caf9"},
    secondary: { main: "#f48fb1" },
  },
  typography:{
    fontFamily: "Roboto, Arial, sans-serif",

  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <App />
    </ThemeProvider>
  </StrictMode>,
)

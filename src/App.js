import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Themes/Theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainPage from './pages/mainPage/MainPage';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Header />
          <MainPage/>
        <Footer />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;

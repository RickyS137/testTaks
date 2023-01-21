import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
  '& .css-npucsi-MuiInputBase-root-MuiOutlinedInput-root': {
    height: 56,
  },
  '& .MuiOutlinedInput-root': {
    'backgroundColor': '#FFFFFF',
    '& fieldset': {
      outline: 'none',
      border: '2px solid #878787',
      borderRadius: 8
    },
    '& input': {
      overflow: 'hidden'
    },
    '& input:focus': {
      caretColor: '#AD02E0',
    },
    '&:hover fieldset': {
      borderColor: '#878787',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #AD02E0',
    },
  },
});

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#AD02E0',
    },
    secondary: {
      main: '#2FE09B'
    },
    primary: {
      main: '#AD02E0',
      color: '#000',
    },
  },
  typography: {
    span: {
      fontFamily: ['Montserrat'],
      fontWeight: 400,
      fontSize: '16px',
      fontStyle: 'normal',
    },
    p: {
      fontFamily: ['Montserrat'],
      fontWeight: 400,
      fontSize: '24px',
      fontStyle: 'normal',
    },
    h2: {
      fontFamily: ['Montserrat'],
      fontWeight: 400,
      fontSize: '45px',
      fontStyle: 'normal',
      color: '#000000',
    },
    h3: {
      fontFamily: ['Montserrat'],
      fontWeight: 400,
      fontSize: '35px',
      fontStyle: 'normal',
      color: '#000000',
    },
    h4: {
      fontFamily: ['Montserrat'],
      fontWeight: 500,
      fontSize: '20px',
      fontStyle: 'normal',
      color: '#000000',
    },
  },
});

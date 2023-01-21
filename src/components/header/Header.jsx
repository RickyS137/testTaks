import React, { useState } from 'react';
import style from './header.module.css';
import logo from '../../media/headerMedia/logo.svg';
import searchLoop from '../../media/headerMedia/searchLoop.svg';
import { CssTextField } from '../../Themes/Theme';
import {
  Typography,
  Box,
  AppBar,
  Container,
  InputAdornment,
  Button,
} from '@mui/material';

const Header = () => {
  const [media, setMedia] = useState(['3px', '1']);
  return (
    <AppBar sx={{ background: '#f3f3f3' }}>
      <Container fixed sx={{'&.MuiContainer-root':{
        padding: 0,
        maxWidth: 1240
      }}}>
        <Box className={style.headerInner}>
          <Box className={style.headerLogo}>
            <Box>
              <img src={logo} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h4">MangoRead</Typography>
              <Typography
                variant="span"
                sx={{ fontSize: '16px', color: '#878787' }}>
                Читай мангу с нами
              </Typography>
            </Box>
          </Box>
          <Box className={style.headerInput}>
            <CssTextField
              sx={{height: '56px', width: '342px'}}
              variant="outlined"
              placeholder="Placeholder"
              onFocus={() => setMedia(['-16px', '0'])}
              onBlur={() => setMedia(['3px', '1'])}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <img
                      src={searchLoop}
                      alt="loop"
                      style={{
                        borderRadius: '8px',
                        opacity: media[1],
                        height: '18px',
                        marginRight: media[0],
                        transition: '0.5s',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className={style.headerAuthReg}>
            <Button
              variant="outlined"
              sx={{
                padding: '12px 40px',
                color: '#000',
                border: '2px solid #AD02E0',
                borderRadius: '8px',
                '&:hover': {
                  color: '#FFFFFF',
                  background: '#AD02E0',
                  border: '2px solid #AD02E0',
                  boxShadow: '0px 0px 20px #AD02E0',
                },
                '&:active': {
                  background: '#740994',
                  boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.25)',
                }
              }}>
              <Typography variant="span">Войти</Typography>
            </Button>
            <Button
              variant="contained"
              color="neutral"
              sx={{
                padding: '12px 40px',
                borderRadius: '8px',
                '&:hover': {
                  color: '#FFFFFF',
                  boxShadow: '0px 0px 20px #AD02E0',
                },
                '&:active': {
                  background: '#740994',
                  boxShadow: 'inset 0px 0px 20px rgba(0, 0, 0, 0.25)',
                }
              }}>
              <Typography variant="span">Регистрация</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;

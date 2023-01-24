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
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchManga, setSearch } from '../../redux/slices/mangasSlice';
import { useEffect } from 'react';
import { getUsers, logOutAcc } from '../../redux/slices/authAndRegSlice';
import SearchModal from '../searchModal/SearchModal';
import AuthAndRegModal from '../authAndRegModal/AuthAndRegModal.jsx';

const Header = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.mangas.search);
  const dataLog = useSelector(state => state.auth.dataLog)
  const search = useSelector((state) => state.mangas.searchText);
  let logined = useSelector(state => state.auth.logined)
  const usersList = useSelector((state) => state.auth.users);
  const [modalSearch, setModalSearch] = useState(false);
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState('Reg')
  const [modalStyle, setModalStyle] = useState(['none','static'])
  let account = usersList?.find(user => user.username === dataLog.username)
  if(!account){
    account = JSON.parse(localStorage.getItem('account'))
  }
  if(logined === false){
    logined = JSON.parse(localStorage.getItem('logined'))
  }

  const logOut = () => {
    dispatch(logOutAcc({
      refresh: JSON.stringify(localStorage.getItem('tokenRefresh'))}))
    localStorage.removeItem('account')
    localStorage.removeItem('logined')
  }

  const closeLogModal = () => {
    setOpen(false)
    setModalStyle(['none','static'])
    setLog('Log')
  }

  const openReg = () => {
    setOpen(true)
    setModalStyle(['block','absolute'])
    setLog('Reg')
  }

  const openLog = () => {
    setOpen(true)
    setModalStyle(['block','absolute'])
    setLog('Log')
  }

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])
  

  const hide = () => {
    setMedia(['3px', '1']);
    setTimeout(() =>{setModalSearch(false)},1000)
  };

  function isLogined(state){
    if(state){
      return <Box className={style.profile}>
        <Box>
          <Typography variant='span' className={style.accountName}>
            {account?.username}
          </Typography>
        </Box>
        <Box className={style.accountImage} sx={{backgroundImage: `url(${account?.image_file})`}}></Box>
        <Button variant='contained' onClick={logOut}>
          <Typography variant='span'>Выйти</Typography>
        </Button>
      </Box>
    }else{
      return <Box className={style.headerAuthReg}>
      <Button
        onClick={openLog}
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
          },
        }}>
        <Typography variant="span">Войти</Typography>
      </Button>
      <AuthAndRegModal account={account && account} openLog={openLog} openReg={openReg} users={usersList} open={open} modalStyle={modalStyle} modalType={log} closeLogModal={closeLogModal}/>
      <Button
        onClick={openReg}
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
          },
        }}>
        <Typography variant="span">Регистрация</Typography>
      </Button>
    </Box>
    }
  }

  function searchModalSet(state) {
    if (state === true) {
      return searchResults?.length > 0 && 
      <SearchModal results={searchResults?.length > 0 && searchResults} className={style.block}/>
    } else {
      return false;
    }
  }

  useEffect(() => {
    dispatch(
      searchManga({
        search: search !== '' && search,
      })
    );
  }, [search, dispatch]);

  const [media, setMedia] = useState(['3px', '1']);
  return (
    <AppBar sx={{ background: '#f3f3f3' }}>
      <Container
        fixed
        sx={{
          '&.MuiContainer-root': {
            padding: 0,
            maxWidth: 1240,
          },
        }}>
        <Box className={style.headerInner}>
          <NavLink to="/">
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
          </NavLink>
          <Box className={style.headerInput}>
            <CssTextField
              sx={{ height: '56px', width: '342px' }}
              variant="outlined"
              placeholder="Placeholder"
              onClick={() => {
                setModalSearch(true);
              }}
              onChange={(e) => {
                dispatch(setSearch(e.target.value));
              }}
              onFocus={() => setMedia(['-16px', '0'])}
              onBlur={() => hide()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
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
            {searchModalSet(modalSearch)}
          </Box>
          {isLogined(logined)}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;

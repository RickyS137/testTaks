import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react';
import style from './filter.module.css';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { setTypes } from '../../redux/slices/mangasSlice';
import { setGenres } from '../../redux/slices/genresSlice';

const SecondFilter = 
({changePage,
  changeFilter,
  confirmGenres,
  selectedGenres,
  genres,
  resetAll,
  }) => {
  const dispatch = useDispatch()
  const [authAndReg, setAuthAndReg] = useState(['Сбросить', 'Применить']);

  const removeResetAll = () => {
    resetAll()
    dispatch(setTypes(''))
    dispatch(setGenres(''))
  }

  useEffect(() => {
    confirmGenres(selectedGenres)
  },[selectedGenres]);

  return (
    <Box className={style.filter}>
      <Box onClick={() => {
          changeFilter()
        }} 
        className={style.back}>
        <ArrowBackIosIcon/>
        <Typography variant="p">Назад</Typography>
      </Box>
      <Box className={style.genres2}>
        <Typography variant="p">Жанры</Typography>
        <RadioGroup sx={{flexWrap: 'nowrap', gap: '2px'}} className={style.genreCheckBoxes}>
        {genres.map((genre) => (
            <FormControlLabel
            key={genre.id}
              onChange={({target}) => {
                target.checked
                  ? dispatch(setGenres(genre.title))
                  : dispatch(setGenres(''))
                  
              }}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '24px',
                },
              }}
              control={
                <Checkbox
                  onClick={changePage}
                  key={genre.id}
                  checked={genre.title === selectedGenres}
                  sx={{
                    color: '#2FE09B',
                    '& svg': {
                      width: 40,
                      height: 40,
                    },
                    '&.Mui-checked': {
                      color: '#2FE09B',
                    },
                    '&.MuiCheckbox-root':{
                      padding: '0 10px'
                    },
                    '&.MuiCheckbox-root:hover': {
                      background: 'none',
                      padding: '0 10px'
                    },
                  }}
                />
              }
              label={genre.title}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box className={style.filterButtons}>
        <Button
          variant="outlined"
          sx={{
            padding: '16px 40px',
            background: '#C94CEE',
            color: '#fff',
            '&:hover': {
              boxShadow: '0px 0px 20px #AD02E0',
              background: '#C94CEE'
            },
          }}
          className={style.filterButton}
          onBlur={() => {
            setAuthAndReg(['Сбросить', 'Применить']);
          }}
          onClick={() => {
            removeResetAll()
          }}>
          <Typography variant="span">{authAndReg[0]}</Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{
            padding: '16px 40px',
            background: '#AD02E0',
            color: '#fff',
            '&:hover': {
              boxShadow: '0px 0px 20px #AD02E0',
              background: '#AD02E0'
            },
          }}
          className={style.filterButton}
          onBlur={() => {
            setAuthAndReg(['Сбросить', 'Применить']);
          }}
          onClick={()=> {
            confirmGenres(selectedGenres)
          }}>
          <Typography variant="span">{authAndReg[1]}</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default SecondFilter;

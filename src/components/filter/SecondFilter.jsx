import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import style from './filter.module.css';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { setEndYear, setStartYear, setTypes } from '../../redux/slices/mangasSlice';
import { setGenres } from '../../redux/slices/genresSlice';

const SecondFilter = 
({
  changeFilter,
  confirmGenres,
  selectedGenres,
  genres,
  resetAll,
  offset,
  changeOffset, 
  filterByYears, 
  startYear,
  endYear,
  }) => {
  const dispatch = useDispatch()
  const [authAndReg, setAuthAndReg] = useState(['Сбросить', 'Применить']);

  const removeResetAll = () => {
    resetAll()
    dispatch(setTypes(''))
    dispatch(setGenres(''))
  }

  const checkGenres = (startYear,endYear) => {
    selectedGenres !== ''
    && filterByYears(startYear,endYear)
  }

  useEffect(() => {
    confirmGenres(selectedGenres)
  },[offset]);

  return (
    <Box className={style.filter}>
      <Box onClick={changeFilter} className={style.genres}>
        <Typography variant="p">Жанры</Typography>
        <Button className={style.genresButton}>
          <Typography
            textTransform="lowercase"
            variant="span"
            sx={{ fontWeight: '400', color: '#878787', fontSize: '24px' }}>
            все
          </Typography>
          <ArrowForwardIosIcon sx={{ color: '#878787' }} />
        </Button>
      </Box>
      <Box className={style.types}>
        <Typography variant="p">Тип</Typography>
        <RadioGroup 

          className={style.checkBoxes}
        >
        {genres.map((genre) => (
            <FormControlLabel
            key={genre.id}
              onChange={({target}) => {
                target.checked
                  ? dispatch(setGenres(genre.title))
                  : dispatch(setGenres('') )
                  changeOffset(0)
              }}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '24px',
                },
              }}
              control={
                <Checkbox
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
                    '&.MuiCheckbox-root:hover': {
                      background: 'none',
                    },
                  }}
                />
              }
              label={genre.title}
            />
          ))}
        </RadioGroup>
        <Box className={style.inputs}>
          <TextField
            value={startYear}
            onChange={(e) => dispatch(setStartYear(e.target.value))}
            className={style.startYear}
            variant="outlined"
            type="number"
            color="secondary"
            placeholder="От 0"
            sx={{
              width: 168,
              height: 55,
              '& input': {
                paddingLeft: '15px',
              },
              '& .MuiInputBase-root': {
                '& fieldset': {
                  border: '2px solid #2FE09B',
                },
              },
              '& .MuiInputBase-root:hover fieldset': {
                borderColor: '#2FE09B',
              },
            }}></TextField>

          <HorizontalRuleIcon />

          <TextField
            className={style.endYear}
            onChange={(e) => dispatch(setEndYear(e.target.value))}
            value={endYear > 0 && endYear}
            variant="outlined"
            type="number"
            color="secondary"
            placeholder="До 2022"
            sx={{
              width: 168,
              height: 55,
              '& input': {
                paddingLeft: '15px',
              },
              '& .MuiInputBase-root': {
                '& fieldset': {
                  border: '2px solid #2FE09B',
                },
              },
              '& .MuiInputBase-root:hover fieldset': {
                borderColor: '#2FE09B',
              },
            }}></TextField>
        </Box>
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
            // !auth && setAuthAndReg(['Регистрация', 'Применить']);
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
            checkGenres(startYear,endYear)
          }}>
          <Typography variant="span">{authAndReg[1]}</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default SecondFilter;

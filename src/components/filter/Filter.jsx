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

const Filter = 
  ({ 
    changePageToTypes,
  changeFilter,
  resetAll,
  confirm,
  offset,
  changeOffset, 
  filterByYears, 
  filterTypeByYear,
  startYear,
  endYear,
  types,
  }) => {
  const dispatch = useDispatch()
  const [authAndReg, setAuthAndReg] = useState(['Сбросить', 'Применить']);

  const mangaTypes = ['Манга', 'Манхва', 'Западный комикс', 'Маньхуа'];

  const removeResetAll = () => {
    resetAll()
    dispatch(setTypes(''))
  }

  const checkType = (startYear,endYear) => {
    types === ''
    ? filterByYears(startYear,endYear)
    : filterTypeByYear(startYear,endYear) 
  }

  useEffect(() => {
    confirm(types)
  },[offset,types]);

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
        {mangaTypes.map((type, i) => (
            <FormControlLabel
            key={i}
              onChange={({target}) => {
                target.checked
                  ? dispatch(setTypes(type))
                  : dispatch(setTypes('') )
                  changeOffset(0)
              }}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '24px',
                },
              }}
              control={
                <Checkbox
                  onClick={changePageToTypes}
                  key={i}
                  checked={type === types}
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
              label={type}
            />
          ))}
        </RadioGroup>
        <Box className={style.inputs}>
          <TextField
            value={startYear > 0 && startYear}
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
            checkType(startYear,endYear)
          }}>
          <Typography variant="span">{authAndReg[1]}</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default Filter;

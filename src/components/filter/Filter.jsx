import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import style from './filter.module.css';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Filter = ({ genres , confirm, offset, changeOffset}) => {
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [authAndReg, setAuthAndReg] = useState(['Сбросить', 'Применить']);
  const [types, setTypes] = useState('')
  let auth = true;

  const mangaTypes = ['Манга', 'Манхва', 'Западный комикс', 'Маньхуа'];

  const changeStartYear = (e) => {
    setStartYear(Number(e.target.value))
  }
  const changeEndYear = (e) => {
    setEndYear(Number(e.target.value))
  }
  // !auth && setAuthAndReg(['Сбросить', 'Регистрация']);


  useEffect(() => {
    confirm(types);
  },[types, offset]);

  return (
    <Box className={style.filter}>
      <Box className={style.genres}>
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
              onChange={({target}) => {
                target.checked
                  ? setTypes(type)
                  : setTypes('') 
                  changeOffset(0)
              }}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '24px',
                },
              }}
              control={
                <Checkbox
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
            onChange={changeStartYear}
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
            onChange={changeEndYear}
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
            !auth && setAuthAndReg(['Регистрация', 'Применить']);
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
            confirm(types)
          }}>
          <Typography variant="span">{authAndReg[1]}</Typography>
        </Button>
      </Box>
    </Box>
  );
};
// '& .MuiOutlinedInput-root': {
//   '& fieldset': {
//     color: '#2FE09B'
//   }
// }
export default Filter;

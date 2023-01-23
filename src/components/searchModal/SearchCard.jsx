import { Box, Typography } from '@mui/material';
import React from 'react';
import style from './searchModal.module.css'

const SearchCard = ({manga}) => {
  return (
    <Box className={style.card}>
      <Box className={style.cardImage} sx={{backgroundImage: `url(${manga?.image})`}}></Box>
      <Box className={style.cardName}><Typography variant='h4'>{manga?.ru_name}</Typography></Box>
    </Box>
  );
}

export default SearchCard;

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import style from './mangaCard.module.css'

const MangaCard = ({manga}) => {
  return (
    <Box className={style.manga} sx={{backgroundImage: `url(${manga?.image})`}}>
      <Typography variant='p' sx={{fontSize: '14px', color: '#FFFFFF'}}>{`Год: ${manga.issue_year}`}</Typography>
      <Typography variant='span' sx={{color: '#FFFFFF', fontWeight: 500}}>{manga.ru_name}</Typography>
    </Box>
  );
}

export default MangaCard;

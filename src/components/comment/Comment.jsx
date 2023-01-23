import { Box, Typography } from '@mui/material';
import React from 'react';
import style from './comment.module.css'

const Comment = ({user}) => {
  return (
    <Box className={style.comment}>
      <Box className={style.userAvatar} sx={{backgroundImage: `url(https://www.meme-arsenal.com/memes/2bb16d2a483b3c99fa7508b789bbbfa3.jpg)`}}></Box>
      <Box className={style.userComment}>
        <Typography variant='h3'>{user?.username}</Typography>
        <Typography paragraph className={style.span}>{user?.text}</Typography>
      </Box>
    </Box>
  );
}

export default Comment;

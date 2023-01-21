import { Box, Pagination } from '@mui/material';
import React from 'react';

const MyPagination = ({count,changePage}) => {
  return (
    <Box sx={{padding: '28px 0 32px'}}>
      <Pagination
        sx={{
        '& button.Mui-selected ': {
        color: '#fff'
      },
      '& button': {
        color: '#A5A5A5',
      }
      }} color='secondary' size='large' count={count} onChange={(_,p) => changePage((p - 1) * 12)}/>
    </Box>
  );
}

export default MyPagination;

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './addCommentModal.module.css'

const AddCommentModal = ({open,closeModal,modalStyle,postReq}) => {
  const mangaId = useSelector(state => state.mangas.mangaId)
  const [lText, setLText] = useState("")
  let data = {
    id: mangaId,
    text: {
      "text": lText
    }
  }

  return (
    <Box sx={{display: `${modalStyle}`}}>
      <Modal className={style.comModal} open={open} onClose={() => closeModal()}>
        <Box className={style.modal}>
          <Typography variant='h4' color='primary'>Напишите ваш прекрасный комментарий</Typography>
          <TextField label='Введите ваш комментарий' variant='outlined' className={style.input}
          onChange={(e) => setLText(e.target.value)}
          sx={{'& .MuiInputBase-root': {
            height: '240px',
            width: '500px'
          }}}>
          </TextField>
          <Box className={style.buttons}>
            <Button className={style.cancel} onClick={() => closeModal()}>Отмена</Button>
            <Button variant='outlined' sx={{backgroundColor: '#AD02E0',color: 'white','&:hover':{
              backgroundColor: '#AD02E0'
            }}} className={style.send} onClick={() => postReq(data)}>Отправить</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddCommentModal;

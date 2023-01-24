import { Box, Button, Checkbox, Modal, TextField, Typography, } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import style from './authAndRegModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert'
import { autharization, registration , setLPassword , setLUsername} from '../../redux/slices/authAndRegSlice';

const AuthAndRegModal = ({ users, openReg, openLog, open, modalType, modalStyle, closeLogModal , account}) => {
  const dispatch = useDispatch()
  const dataLog = useSelector(state => state.auth.dataLog)
  const {lUsername , lPassword} = useSelector(state => state.auth.dataLog)
  const [uplFile,setUplFile] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    setFileURL(fileReader.result)
  }

  const setFile = (e) =>{
    e.preventDefault()
    const file = e.target.files[0]
    setUplFile(file)
    fileReader.readAsDataURL(file)
  }

  function selectLog(state) {
    if (state === 'Log') {
      return <Box className={style.login}>
      <Box className={style.logInputs}>
        <TextField onChange={(e) => dispatch(setLUsername(e.target.value))} placeholder="Username" className={style.regInput}/>
        <TextField onChange={(e) => dispatch(setLPassword(e.target.value))} placeholder="Password" className={style.regInput}/>
      </Box>
      <Box className={style.loginInner}>
        <Box className={style.Checkbox}><Checkbox size='large'/><Typography variant='h4' sx={{color: '#878787'}}>Запомнить меня</Typography></Box>
        <Button onClick={login} variant='contained' className={style.buttonLog}>
          <Typography variant='span'>Войти</Typography>
        </Button>
      </Box>
    </Box>
    }else if(state === 'Reg'){
      return <Box className={style.register}>
      <Box className={style.regImg}>
        <Box className={style.img} sx={{backgroundImage: `url(${fileURL ? fileURL : 'Выберите картинку'})`}}></Box>
        <Button className={style.addPhoto} component='label'>Добавить фото<input onChange={setFile} hidden accept="image/*,.png,.jpg,.gif,.web," multiple type="file"/></Button>
      </Box>
      <Box className={style.regInputs}>
        <TextField onChange={(e) => setUsername(e.target.value)} placeholder="Username" className={style.regInput}/>
        <TextField onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" className={style.regInput}/>
        <TextField onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={style.regInput}/>
        <Button
          onClick={regReguest}
          variant="contained"
          className={style.buttonReg}>
          <Typography variant="span">Регистрация</Typography>
        </Button>
      </Box>
    </Box>
    }
  }

  function regReguest(){
    if(username === '' || password === '' || nickname === '' || uplFile === null){
      swal({text:'Заполните ВСЕ поля!',icon:'warning'})
    }else if(username.length < 9 || password.length < 9 || nickname.length < 9){
      swal({text:'Имя, Никнейм и Пароль должны содержать как минимум 10 символов!',icon:'warning'})
    }else if(
      users.find(u => u.username === username)){
      swal({text: 'Такой пользователь уже зарегистрирован', icon:'warning'})
    }else{
      let dataReg = {
        "username": username,
        "password": password,
        "nickname": nickname,
        "image_file": uplFile
      } 
      dispatch(registration(dataReg))
      swal({text: 'Вы успешно зарегистрировались',icon: 'success'})
    }
  } 

  function login(e){
    e.preventDefault();
    if (lUsername === '' || lPassword === '') {
      swal({text: 'Заполните поля!', icon:'warning'})
    }else{
      localStorage.setItem('account',JSON.stringify(account))
      dispatch(autharization(dataLog))
      swal({text: 'Вы успешно зашли в свой профиль',icon:"success"})
    }
  }
  return (
    <Box
      className={style.modalBox}
      sx={{ display: `${modalStyle[0]}`, position: `${modalStyle[1]}` }}>
      <Modal open={open} className={style.modal} onClose={closeLogModal}>
        <Box className={style.modalInner}>
          <Box className={style.close}>
            <CloseIcon onClick={closeLogModal} />
          </Box>
          <Box className={style.choose}>
            <Button sx={{ color: '#000', borderBottom: `${modalType === 'Log' && '5px solid #AD02E0'}`, transition: '.3s' }}>
              <Typography onClick={openLog} variant="span" sx={{ fontSize: '24px' }}>
                Вход
              </Typography>
            </Button>
            <Button onClick={openReg} sx={{ color: '#000', borderBottom: `${modalType === 'Reg' && '5px solid #AD02E0'}`}}>
              <Typography variant="span" sx={{ fontSize: '24px' }}>
                Регистрация
              </Typography>
            </Button>
          </Box>
          {selectLog(modalType)}
        </Box>
      </Modal>
    </Box>
  );
};

export default AuthAndRegModal

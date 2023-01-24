import {
  Box,
  CircularProgress,
  Container,
  Pagination,
  Typography,
  Button
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../../components/comment/Comment';
import { getGenres } from '../../redux/slices/genresSlice';
import { getComments, getManga, postComm } from '../../redux/slices/mangasSlice';
import style from './aboutPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import AddCommentModal from '../../components/addCommentModal/AddCommentModal';

const AboutPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(1);
  const [open, setOpen] = useState(false)
  const [modalStyle, setModalStyle] = useState('none')

  const manga = useSelector((state) => state.mangas.manga);
  const mangaId = useSelector((state) => state.mangas.mangaId);
  const comments = useSelector((state) => state.mangas.mangaComments);
  const genres = useSelector((state) => state.genres.genres);
  const load = useSelector((state) => state.mangas.load);

  const postReq = (data) => {
    dispatch(postComm(data))
  }

  const substr = (str) => {
    const res = str.substring(3, str?.length - 4);
    return res;
  };

  const openModal = () => {
    setOpen(true)
    setModalStyle('block')
  }

  const closeModal = () => {
    setOpen(false)
    setModalStyle('none')
  }

  const changeOffset = (p) => {
    setOffset(p);
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getManga(mangaId));
  }, [mangaId, dispatch]);

  useEffect(() => {
    dispatch(getComments(mangaId));
  }, [mangaId, dispatch]);

  return (
    <Box sx={{ background: '#F3F3F3' }} className={style.about}>
      {!load ? (
        <Container
          sx={{ '&.MuiContainer-root': { padding: 0, maxWidth: 1240 } }}>
          <NavLink to='/'><Box className={style.backButton}><ArrowBackIcon/><Typography paragraph>Назад</Typography></Box></NavLink>
          <Box className={style.mangaInfo}>
            <Box
              className={style.mangaImage}
              sx={{ backgroundImage: `url(${manga?.image})` }}></Box>
            <Box className={style.mangaInfos}>
              <Typography variant="h2" sx={{ fontSize: '40px' }}>
                {manga?.ru_name}
              </Typography>
              <Typography className={style.info} variant="p">
                Информация:
              </Typography>
              <Typography variant="p">
                Тип:
                <Typography className={style.span} variant="span">
                  {manga?.type}
                </Typography>
              </Typography>
              <Typography variant="p">
                Год:
                <Typography className={style.span} variant="span">
                  {manga?.issue_year}
                </Typography>
              </Typography>
              <Typography sx={{ display: 'flex' }} variant="p">
                Жанр:
                <Box className={style.genres}>
                  {manga?.genre?.map((item) => (
                    <Typography
                      className={style.span}
                      variant="span"
                      key={item}>{`${genres[item]?.title},`}</Typography>
                  ))}
                </Box>
              </Typography>
            </Box>
          </Box>
          <hr className={style.hr} />
          <Box className={style.mangaDesc}>
            <Typography variant="h3">Синопсис</Typography>
            <Typography className={style.p} paragraph>
              {manga?.description && substr(manga?.description)}
            </Typography>
          </Box>
          <hr className={style.hr} />
          <Box className={style.mangaComments}>
            <Box className={style.comAdd}>
              <Typography variant="h3">Топ рецензий</Typography>
              <Button onClick={openModal}><Typography variant='h3' sx={{color: '#AD02E0', fontSize: '18px'}}>Добавить комментарий</Typography></Button>
              <AddCommentModal postReq={postReq} open={open} closeModal={closeModal} modalStyle={modalStyle}/>
            </Box>
            <Box className={style.comments}>
              {comments.length > 0 ? (
                comments
                  .slice(offset * 3 - 3, offset * 3)
                  .map((user) => <Comment key={user.id} user={user} />)
              ) : (
                <Typography variant="h4">
                  Здесь пока нет комментариев
                </Typography>
              )}
            </Box>
            <Box className={style.pagination}>
              <Pagination
                sx={{

                  '& button.Mui-selected ': {
                    color: '#fff',
                  },
                  '& button': {
                    color: '#A5A5A5',
                  },
                }}
                color="secondary"
                size="large"
                onChange={(_, p) => changeOffset(p)}
                count={Math.ceil(manga?.comments_count / 3)}
              />
            </Box>
          </Box>
        </Container>
      ) : (
        <Box className={style.load}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default AboutPage;

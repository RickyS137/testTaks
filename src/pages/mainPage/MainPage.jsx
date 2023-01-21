import { Box, Container, Button, CircularProgress, Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import MangaCard from '../../components/mangaCard/MangaCard';
import style from './mainPage.module.css';
import { getMangas, getMangasByTypes } from '../../redux/slices/mangasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MyPagination from '../../components/pagination/Pagination';
import { getGenres } from '../../redux/slices/genresSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0)
  
  
  const Mangas = useSelector(state => state.mangas.mangas)
  const MangasByType = useSelector(state => state.mangas.mangasByType)
  const Genres = useSelector(state => state.genres.genres)
  const load = useSelector(state => state.mangas.load)

  
  //   const a = () => {
  //     let t = '';
  //     for (let i in your_types) {
  //         t += ?type=${your_types[i]}&;
  //     }
  //     return t.substring(0, t.length-1);
  // };


  useEffect(() => {
    dispatch(getMangas({
      limit: 12,
      offset: offset
    }))
  },[offset,dispatch])

  useEffect(() => {
    dispatch(getGenres())
  },[dispatch])
  

  const confirm = (type) => {
    dispatch(getMangasByTypes({
      limit: 12,
      offset: offset,
      type: type,
    }))
  }

  const changeOffset = (p) => {
    setOffset(p)
  }

  return (
    <Box className={style.mainPage} sx={{ background: '#F3F3F3' }}>
      <Container
        sx={{
          '&.MuiContainer-root': {
            padding: 0,
            maxWidth: 1240,
          },
        }}
        className={style.mainContainer}>
        <Box className={style.mainPageInner}>
          {/* <Button onClick={() => handle()}>showw</Button> */}
          <Filter confirm={confirm} offset={offset} changeOffset={changeOffset}/>
          <Box className={style.mainPageMangas}>
            {
            MangasByType?.results?.length > 0 
            ? !load ? MangasByType?.results?.map((manga) => (
              <MangaCard manga={manga} key={manga.id} />
              ))
              :
              <Box className={style.load}><CircularProgress/></Box> 
            : !load ? Mangas?.results?.map((manga) => (
              <MangaCard manga={manga} key={manga.id} />
              ))
              :
              <Box className={style.load}><CircularProgress/></Box> 
          }
          </Box>
        </Box>
        <Box className={style.Pagination}>
        {/* <Pagination onChange={(_,p) => setOffset((p - 1) * 12)} count={Math.ceil(Mangas?.count / 12)}/> */}
        {MangasByType?.results?.length > 0 
        ? <MyPagination changePage={changeOffset} count={Math.ceil(MangasByType?.count / 12)}/>
        : <MyPagination changePage={changeOffset} count={Math.ceil(Mangas?.count / 12)}/>
      }
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;

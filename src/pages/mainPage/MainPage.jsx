import { Box, Container, CircularProgress} from '@mui/material';
import React, { useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import MangaCard from '../../components/mangaCard/MangaCard';
import style from './mainPage.module.css';
import { getMangas, setMangasByType, getMangasByTypes, setMangasByYear, setResults, getMangasByGenres } from '../../redux/slices/mangasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MyPagination from '../../components/pagination/Pagination';
import { getGenres } from '../../redux/slices/genresSlice';
import SecondFilter from '../../components/filter/SecondFilter';

const MainPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0)
  const [all, setAll] = useState(false)

  const startYear = useSelector(state => state.mangas.startYear)
  const endYear = useSelector(state => state.mangas.endYear)
  const types = useSelector(state => state.mangas.types)
  const Mangas = useSelector(state => state.mangas.mangas)
  const MangasByType = useSelector(state => state.mangas.mangasByType)
  const MangasByYears = useSelector(state => state.mangas.mangasByYears)
  const Genres = useSelector(state => state.genres.genres)
  const selectedGenres = useSelector(state => state.genres.selectedGenres)
  const load = useSelector(state => state.mangas.load)


  useEffect(() => {
    dispatch(getMangas({
      limit: 12,
      offset: offset
    }))
  },[offset,dispatch])

  useEffect(() => {
    dispatch(getGenres())
  },[dispatch])
  
  useEffect(() =>{
    dispatch(getMangasByTypes({
      limit: 12,
      offset: offset,
      type: '',
    }))
  },[offset])
  
  // const asyncconfirm = async(types,startYear,endYear, offset) => {
  //   const response = await dispatch(setMangasByType({
  //     limit: 12,
  //     offset: offset + offset,
  //     type: types,
  //   }))
  //   const filteredResponse = response?.data?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear))
  //   dispatch(setMangasByYear(...MangasByYears,filteredResponse))
  //   console.log(MangasByYears)
  // }

  // useEffect(() => {
  //   Math.ceil(MangasByYears?.length / 12) < 12
  //   && asyncconfirm(types,startYear,endYear)
  // },[MangasByYears])

  const confirm = (type) => {
    dispatch(getMangasByTypes({
      limit: 12,
      offset: offset,
      type: type,
    }))
  }

  const confirmGenres = (genre) =>{
    dispatch(getMangasByGenres({
      limit: 12,
      offset: offset,
      genre: genre
    }))
  }

  const changeFilter = () => {
    setAll(!all)
  }

  const resetAll = () => {
    dispatch(getMangas({
      limit: 12,
      offset: offset
    }))
    dispatch(setMangasByType([]))
    dispatch(setMangasByYear([]))
  }

  const filterTypeMangasByYears = (startYear, endYear) => {
    dispatch(setMangasByYear(MangasByType?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
  }
  const filterMangasByYears = (startYear,endYear) => {
    dispatch(setMangasByYear(Mangas?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
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
          {
            !all
            ? <Filter
            changeFilter={changeFilter}
            types={types}
            mangasByYears={MangasByYears}
            resetAll={resetAll}
            startYear={startYear}
            endYear={endYear}
            confirm={confirm} 
            offset={offset} 
            changeOffset={changeOffset} 
            filterByYears={filterMangasByYears} 
            filterTypeByYear={filterTypeMangasByYears}
            genres={Genres}/>
            : <SecondFilter
            changeFilter={changeFilter}
            confirmGenres={confirmGenres}
            mangasByYears={MangasByYears}
            resetAll={resetAll}
            startYear={startYear}
            endYear={endYear}
            offset={offset} 
            changeOffset={changeOffset} 
            filterByYears={filterMangasByYears} 
            genres={Genres}
            />
          }
          <Box className={style.mainPageMangas}>
            {
              MangasByYears?.length > 0
              ?  MangasByYears?.map((manga) => (
                <MangaCard manga={manga} key={manga.id} />))
              : MangasByType?.results?.length > 0 
                ? !load 
                  ? MangasByType?.results?.map((manga) => (
                  <MangaCard manga={manga} key={manga.id} />))
                  : <Box className={style.load}><CircularProgress/></Box> 
                : !load 
                  ? Mangas?.results?.map((manga) => (
                  <MangaCard manga={manga} key={manga.id} />))
                  : <Box className={style.load}><CircularProgress/></Box> 
          }
          </Box>
        </Box>
        <Box className={style.Pagination}>
        {/* <Pagination onChange={(_,p) => setOffset((p - 1) * 12)} count={Math.ceil(Mangas?.count / 12)}/> */}
        {
        MangasByYears?.length > 0
        ? <MyPagination changePage={changeOffset} count={Math.ceil(MangasByYears?.length / 12)}/>
        : MangasByType?.results?.length > 0 
        ? <MyPagination changePage={changeOffset} count={Math.ceil(MangasByType?.count / 12)}/>
        : <MyPagination changePage={changeOffset} count={Math.ceil(Mangas?.count / 12)}/>
      }
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;

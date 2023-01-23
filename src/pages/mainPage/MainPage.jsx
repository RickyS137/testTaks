import { Box, Container, CircularProgress} from '@mui/material';
import React, { useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import MangaCard from '../../components/mangaCard/MangaCard';
import style from './mainPage.module.css';
import { getMangas, setMangasByType, getMangasByTypes, setMangasByYear, getMangasByGenres, setMangaId, getTopMangas, setMangaByGenre } from '../../redux/slices/mangasSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MyPagination from '../../components/pagination/Pagination';
import { getGenres } from '../../redux/slices/genresSlice';
import SecondFilter from '../../components/filter/SecondFilter';
import { NavLink } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0)
  const [all, setAll] = useState(false)

  const [page, setPage] = useState('TopMangas')

  const startYear = useSelector(state => state.mangas.startYear)
  const endYear = useSelector(state => state.mangas.endYear)
  const types = useSelector(state => state.mangas.types)
  const Mangas = useSelector(state => state.mangas.mangas)
  const TopMangas = useSelector(state => state.mangas.topMangas)
  const MangasByGenres = useSelector(state => state.mangas.mangaByGenres)
  const MangasByType = useSelector(state => state.mangas.mangasByType)
  const MangasByYears = useSelector(state => state.mangas.mangasByYears)
  const Genres = useSelector(state => state.genres.genres)
  const selectedGenres = useSelector(state => state.genres.selectedGenres)
  const load = useSelector(state => state.mangas.load)

  const toManga = (id) => {
    dispatch(setMangaId(id))
  }

  useEffect(() => {
    dispatch(getTopMangas({
      limit:12,
      offset:offset,
    }))
  },[offset,dispatch])

  useEffect(() => {
    dispatch(getMangas({
      limit: 12,
      offset: offset
    }))
  },[offset,dispatch])

  useEffect(() => {
    dispatch(getGenres())
  },[dispatch])

  useEffect(() => {
    dispatch(getMangasByGenres({
      limit:12,
      offset: offset,
      genre__title: selectedGenres
    }))
  },[offset,dispatch,selectedGenres])
  
  useEffect(() =>{
    dispatch(getMangasByTypes({
      limit: 12,
      offset: offset,
      type: '',
    }))
  },[dispatch])

  const confirm = (type) => {
    dispatch(getMangasByTypes({
      limit: 12,
      offset: offset,
      type: type,
    }))
  }

  const confirmGenres = (selectedGenres) =>{
    dispatch(getMangasByGenres({
      limit: 12,
      offset: offset,
      genre__title: selectedGenres
    }))
    setPage('Genres')
  }

  const changeFilter = () => {
    setAll(!all)
    dispatch(setMangasByType({
      count: 0,
      results: []
    }))
    dispatch(setMangasByYear([]))
    setPage('TopMangas')
  }

  const resetAll = () => {
    dispatch(getMangas({
      limit: 12,
      offset: offset
    }))
    dispatch(setMangasByType({
      count: 0,
      results: []
    }))
    dispatch(setMangasByYear([]))
    dispatch(setMangaByGenre({
      count: 0,
      return: []
    }))
  }

  const filterTypeMangasByYears = (startYear, endYear) => {
    dispatch(setMangasByYear(MangasByType?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
    setPage('Years')
  }
  const filterMangasByYears = (startYear,endYear) => {
    dispatch(setMangasByYear(Mangas?.results?.filter(item => item?.issue_year >= startYear && item?.issue_year <= endYear)))
    setPage('Years')
  }
  const changeOffset = (p) => {
    setOffset(p)
  }
  
  const changePage = () => {
    setPage('Genres')
  }

  const changePageToTypes = () => {
    setPage('Types')
  }

  function selectPage(state){
    if(state === 'Mangas'){
      return !load 
      ? Mangas?.results?.map((manga) => (
        <NavLink key={manga.id} to={`${manga?.id}`}><MangaCard toManga={toManga} manga={manga} key={manga?.id} /></NavLink>))
      : <Box className={style.load}><CircularProgress/></Box> 
    }else if(state === 'Types'){
      return !load 
      ? MangasByType?.results?.map((manga) => (
        <NavLink key={manga.id} to={`/${manga?.id}`}><MangaCard toManga={toManga} manga={manga} key={manga?.id} /></NavLink>))
      : <Box className={style.load}><CircularProgress/></Box> 
    }else if(state === 'Genres'){
      return !load 
      ? MangasByGenres?.results?.map((manga) => (
        <NavLink key={manga.id} to={`/${manga?.id}`}><MangaCard toManga={toManga} manga={manga} key={manga?.id} /></NavLink>))
      : <Box className={style.load}><CircularProgress/></Box>
    }else if(state === 'Years'){
      return MangasByYears?.map((manga) => (
      <NavLink key={manga.id} to={`/${manga?.id}`}><MangaCard toManga={toManga} manga={manga} key={manga?.id} /></NavLink>))
    }else if(state === 'TopMangas'){
      return !load 
      ? TopMangas?.results?.map((manga) => (
        <NavLink key={manga.id} to={`${manga?.id}`}><MangaCard toManga={toManga} manga={manga} key={manga?.id} /></NavLink>))
      : <Box className={style.load}><CircularProgress/></Box> 
    }
  }
  function selectPagination(state){
    if(state === 'Mangas'){
      return <MyPagination changePage={changeOffset} count={Math.ceil(Mangas?.count / 12)}/>
    }else if(state === 'Types'){
      return <MyPagination changePage={changeOffset} count={Math.ceil(MangasByType?.count / 12)}/>
    }else if(state === 'Genres'){
      return <MyPagination changePage={changeOffset} count={Math.ceil(MangasByGenres?.count / 12)}/>
    }else if(state === 'Years'){
      return <MyPagination changePage={changeOffset} count={Math.ceil(MangasByYears?.length / 12)}/>
    }else if(state === 'TopMangas'){
      return <MyPagination changePage={changeOffset} count={Math.ceil(TopMangas?.count / 12)}/>
    }
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
            changePageToTypes={changePageToTypes}
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
            />
            : <SecondFilter
            changePage={changePage}
            selectedGenres={selectedGenres}
            changeFilter={changeFilter}
            confirmGenres={confirmGenres}
            resetAll={resetAll}
            offset={offset} 
            changeOffset={changeOffset} 
            filterByYears={filterMangasByYears} 
            genres={Genres}
            />
          }
          <Box className={style.mainPageMangas}>
            {selectPage(page)}
          </Box>
        </Box>
        <Box className={style.Pagination}>
        {selectPagination(page)}
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;


import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getManga, setMangaId } from '../../redux/slices/mangasSlice';
import SearchCard from './SearchCard';
import style from './searchModal.module.css'


const SearchModal = ({results}) => {
  const mangaId = useSelector(state => state.mangas.mangaId)
  
  const dispatch = useDispatch()
  const toManga = (id) => {
    dispatch(setMangaId(id))
    console.log(mangaId);
  }
  useEffect(() => {
    dispatch(getManga(mangaId))
  },[mangaId,dispatch])

  return (
    <Box className={style.results}>
      {results?.length > 12 
      ? results?.slice(0,12).map(manga => <NavLink key={manga.id} to={`${manga.id}`}><SearchCard toManga={toManga} key={manga.id} manga={manga}/></NavLink>)
      : results?.map(manga => <NavLink key={manga.id} to={`${manga.id}`}><SearchCard toManga={toManga} key={manga.id} manga={manga}/></NavLink>)
    }
    </Box>
  );
}

export default SearchModal;

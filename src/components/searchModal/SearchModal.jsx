import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setMangaId } from '../../redux/slices/mangasSlice';
import SearchCard from './SearchCard';
import style from './searchModal.module.css'


const SearchModal = ({results}) => {
  const dispatch = useDispatch()
  const toManga = (id) => {
    dispatch(setMangaId(id))
  }
  return (
    <Box className={style.results}>
      {results?.length > 12 
      ? results?.slice(0,12).map(manga => <NavLink to={`${manga.id}`}><SearchCard onClick={() => toManga(manga.id)} key={manga.id} manga={manga}/></NavLink>)
      : results?.map(manga => <NavLink to={`${manga.id}`}><SearchCard onClick={() => toManga(manga.id)} key={manga.id} manga={manga}/></NavLink>)
    }
    </Box>
  );
}

export default SearchModal;

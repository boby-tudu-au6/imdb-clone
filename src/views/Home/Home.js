import React, { useEffect, useState } from 'react'
import { Button, Toolbar, Grid } from '@mui/material'
import { MovieForm, MovieCard } from 'components'
import { useSelector } from 'react-redux'
import { fetchMovies, fetchActors, fetchProducers } from 'api'

function Home() {
  const [open, setOpen] = useState(false)
  const movies = useSelector(state => state.movie);

  useEffect(() => {
    fetchMovies();
    fetchActors();
    fetchProducers();
  }, []);

  return (
    <div>
      <MovieForm open={open} setOpen={setOpen} />
      <Button sx={{ mb: 2 }} onClick={() => setOpen(true)}>Add New Movie</Button>
      <Grid container spacing={2}>
        {movies.data.map(item => (
          <Grid item key={item._id} xs={6} sm={4} md={3}>
            <MovieCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Home
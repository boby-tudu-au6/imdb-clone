import store from "store/store"
import axios from 'axios'
import { addMovie } from "store/reducers/movie.slice"
import { fetchActors } from "./actor"
import { fetchProducers } from "./producer"

export const fetchMovies = async () => {
    try {
        const { data } = await axios.get('/movies')
        if (data) store.dispatch(addMovie(data))
    } catch (error) {
        if (error) console.log(error)
    }
}

export const createMovie = async (data) => {
    try {
        await axios.post('/movies', data)
        await fetchMovies()
        await fetchActors()
        await fetchProducers()
    } catch (error) {
        if (error) console.log(error)
    }
}
export const updateMovie = async (data) => {
    try {
        await axios.put(`/movies/${data.id}`, data)
        await fetchMovies()
    } catch (error) {
        if (error) console.log(error)
    }
}
export const deleteMovie = async (data) => {
    try {
        await axios.delete(`/movies/${data.id}`)
        await fetchMovies()
    } catch (error) {
        if (error) console.log(error)
    }
}
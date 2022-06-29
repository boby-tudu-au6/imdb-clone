import { configureStore } from '@reduxjs/toolkit'
import actorSlice from './reducers/actor.slice'
import loadingSlice from './reducers/loading.slice'
import movieSlice from './reducers/movie.slice'
import producerSlice from './reducers/producer.slice'
import snackSlice from './reducers/snack.slice'
import userSlice from './reducers/user.slice'

const store = configureStore({
    reducer: {
        loader: loadingSlice,
        snack: snackSlice,
        user: userSlice,
        movie: movieSlice,
        actor: actorSlice,
        producer: producerSlice
    }
})

export default store
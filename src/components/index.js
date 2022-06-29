import axios from 'axios'
import store from '../store/store'
import { startLoading, stopLoading } from '../store/reducers/loading.slice'
import { openSnack } from '../store/reducers/snack.slice'

export { default as Snackbar } from './Snackbar'
export { default as Loader } from './Loader'
export { default as DrawerComponent } from './Drawer/Drawer'
export { default as MovieForm } from './MovieForm'
export { default as ActorForm } from './ActorForm'
export { default as ProducerForm } from './ProducerForm'
export { default as MovieCard } from './MovieCard'


axios.interceptors.request.use(req => {
    store.dispatch(startLoading())
    return {
        ...req,
        baseURL: 'https://imdb-clone123.herokuapp.com',
        // baseURL: 'http://localhost:8080',
        headers: {
            author: localStorage.getItem('user')
        }
    }
}, err => {
    if (err.response && err.response.data && err.response.data.error) { store.dispatch(openSnack({ type: 'error', text: err.response.data.error })) }
    else { store.dispatch(openSnack({ type: 'error', text: err.message })) }
    store.dispatch(stopLoading());
    return err
});

axios.interceptors.response.use(res => {
    store.dispatch(stopLoading());
    return res
}, err => {
    console.log(err.message)
    if (err.response && err.response.data && err.response.data.message) { store.dispatch(openSnack({ type: 'error', text: err.response.data.message })) }
    else if (err.response && err.response.data && err.response.data.error) { store.dispatch(openSnack({ type: 'error', text: err.response.data.error })) }
    else { store.dispatch(openSnack({ type: 'error', text: err.message })) }
    store.dispatch(stopLoading());
    return err
});
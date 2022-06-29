import store from "store/store"
import axios from 'axios'
import { addActor } from "store/reducers/actor.slice"

export const fetchActors = async () => {
  try {
    let { data } = await axios.get('/actors')
    if (data) {
      data = data.data.map(item => ({ ...item, value: item._id, label: item.name }))
      store.dispatch(addActor({ data }))
    }
  } catch (error) {
    if (error) console.log(error)
  }
}
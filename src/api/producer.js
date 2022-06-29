import store from "store/store"
import axios from 'axios'
import { addProducer } from "store/reducers/producer.slice"

export const fetchProducers = async () => {
    try {
        let { data } = await axios.get('/producers')
        if (data) {
            data = data.data.map(item => ({ ...item, value: item._id, label: item.name }))
            store.dispatch(addProducer({ data }))
        }
    } catch (error) {
        if (error) console.log(error)
    }
}
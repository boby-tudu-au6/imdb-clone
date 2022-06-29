
import { Icon } from '@iconify/react'
import { Home, Balcony, } from '@mui/icons-material'
const links = [
    {
        to: '/',
        title: "Home",
        icon: <Home sx={{ fontSize: 30 }} />
    },
    {
        to: '/taxi-service',
        title: "Taxi",
        icon: <Icon icon="bx:taxi" style={{ fontSize: 25 }} />
    },
    {
        to: '/barber',
        title: "Barber",
        icon: <Icon icon="fa6-solid:scissors" style={{ fontSize: 25 }} />
    },
    {
        to: '/doctor',
        title: "Doctor",
        icon: <Icon icon="healthicons:doctor-male-outline" style={{ fontSize: 25 }} />
    },
]

export default links
import React from 'react'
import { NavLink } from 'react-router-dom';
import links from './links';
import { Home, Balcony, } from '@mui/icons-material'
import {
    Drawer,
    Box,
    Typography,
    List,
    Toolbar,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
})

function DrawerComponent({ mobileOpen, handleDrawerToggle }) {
    const classes = useStyles()
    const drawerWidth = 240;
    const drawer = (
        <div>
            <Toolbar>
                <Balcony sx={{ display: 'flex', mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'black',
                        textDecoration: 'none',
                    }}
                >
                    IMDB Clone
                </Typography>
            </Toolbar>
            <List>
                {links.map((item, index) => (
                    <NavLink key={item.to} to={item.to} className={classes.link}>
                        {({ isActive }) => (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton selected={isActive}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </NavLink>
                ))}
            </List>
        </div >
    );
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 'fab' }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default DrawerComponent
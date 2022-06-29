import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom'
import { Balcony, ExitToApp, } from '@mui/icons-material'
// import { DrawerComponent } from 'components';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from 'store/reducers/user.slice';




function Layout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation()
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const drawerWidth = 240;
    const dispatch = useDispatch()
    const authRoutes = ['/login', '/register'];
    const userRoutes = ['/', '/taxi-service', '/barber', '/doctor', '/dentist']

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                elevation={3}
                // position="fixed"
                sx={{
                    background: 'black',
                    zIndex: 'tooptip'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
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
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: 1
                        }}
                    >
                        IMDB Clone
                    </Typography>
                    <Button endIcon={<ExitToApp />} onClick={() => dispatch(logout())}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, background: '#eeeeee',
                    height: 'auto', minHeight: '100vh'
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;

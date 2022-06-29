import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import theme from 'themes/defaultTheme'
import { AuthRoutes, UserRoutes } from './routes'
import SnacbarComponent from 'components/Snackbar/Snackbar';
import { Loader } from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'store/reducers/user.slice';
import jwtDecode from 'jwt-decode'

function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('user')
    if (token) dispatch(setUser(jwtDecode(token)))
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <SnacbarComponent />
      <Loader />
      {user ? <UserRoutes /> : <AuthRoutes />}
    </MuiThemeProvider>
  );
}

export default App;

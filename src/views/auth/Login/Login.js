import React from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@mui/styles'
import FormGenerator from 'components/forms/FormGenerator'
import { Paper, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import axios from 'axios'
import { setUser } from 'store/reducers/user.slice'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  }
})

function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post('/auth/login', values)
      if (data) {
        localStorage.setItem('user', data.data)
        dispatch(setUser(jwtDecode(data.data)))
        reset({
          email: "",
          password: ""
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={classes.root}>
      <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: "auto", minHeight: 500 }}>
        <Typography variant="h3">Login</Typography>
        <br />
        <Icon style={{ fontSize: 200 }} icon="arcticons:lock" />
        <div style={{ textAlign: 'center' }}>
          <i>Dummy data is added for this</i>
          <p><strong>email:</strong> js903783@gmail.com</p>
          <p><strong>password:</strong> 1234</p>
        </div>
        <FormGenerator
          control={control}
          child={[
            { type: 'text', name: 'email', label: "email", gridProps: { xs: 12 } },
            { type: 'password', name: 'password', label: "password", gridProps: { xs: 12 } },
          ]}
        />
        <br />
        <Button onClick={handleSubmit(onSubmit)} fullWidth>Login</Button>
        <br />
        <br />
        <Typography variant="h6" component={Link} to="/register">Not registered? Click here.</Typography>
      </Paper>
    </div >
  )
}

export default Login
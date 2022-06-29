import React from 'react'
import { makeStyles } from '@mui/styles'
import { Paper, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import FormGenerator from 'components/forms/FormGenerator'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { openSnack } from 'store/reducers/snack.slice'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'calc(100vh - 90px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  }
})

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().email('should be perfect email').required("email is required"),
  password: yup.string().required("password is required")
})

function Register() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post('/auth/register', values)
      if (data) dispatch(openSnack({ type: "success", text: data.data }))
      reset({
        name: "",
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={classes.root}>
      <Paper elevation={1} sx={{ width: { xs: '100%', md: 500 }, p: 3, m: "auto" }}>
        <Typography variant="h3">Register</Typography>
        <br />
        <FormGenerator
          control={control}
          child={[
            { type: 'text', name: 'name', label: "Name", gridProps: { xs: 12 } },
            { type: 'email', name: 'email', label: "email", gridProps: { xs: 12 } },
            { type: 'text', name: 'phone', label: "phone", gridProps: { xs: 12 } },
            { type: 'password', name: 'password', label: "password", gridProps: { xs: 12 } },
          ]}
        />
        <br />
        <Button onClick={handleSubmit(onSubmit)} fullWidth>Register</Button>
        <br />
        <br />
        <Typography variant="h6" component={Link} to="/login">Already registered? Click here.</Typography>
      </Paper>
    </div >
  )
}

export default Register
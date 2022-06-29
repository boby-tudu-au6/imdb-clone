import React, { lazy } from "react";
import { Navigate, useRoutes } from 'react-router-dom'
import Layout from "layout";
import { useSelector } from "react-redux";
import Home from 'views/Home'
import Login from 'views/auth/Login/Login'
import Register from 'views/auth/Register/Register'
import NotFound from 'views/NotFound'
// const Home = lazy(() => import('./views/Home'))
// const Login = lazy(() => import('./views/auth/Login/Login'))
// const Register = lazy(() => import("./views/auth/Register/Register"))
// const NotFound = lazy(() => import('./views/NotFound'))

export function UserRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Home />, index: true },
        { path: '*', element: <Navigate to="/" /> },
      ]
    },
  ])
}
export function AuthRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ])
}
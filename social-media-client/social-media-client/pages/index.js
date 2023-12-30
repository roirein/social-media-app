import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.png'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import PasswordResetForm from './components/PasswordResetForm'
import { useRouter } from 'next/router'
import ChangePasswordForm from './components/ChangePasswordForm'

//better structure, styling, and errors handling will be handled later

const AUTH_OPTION = {
  REGISTER: 'register',
  LOGIN: 'login',
  PASSWORD_RESET: 'password_reset',
  PASSWORD_CHANGE: 'password_change'
}

export default function Home() {

  const router = useRouter()

  const {token} = router.query
  const [authOption, setAuthOption] = useState()

  useEffect(() => {
    if (token && token.length > 0) {
      setAuthOption(AUTH_OPTION.PASSWORD_CHANGE)
    } else {
      setAuthOption(AUTH_OPTION.LOGIN)
    }
  }, [token])

  return (
    <Box
      width="100%"
      minHeight="100vh"
    >
      <Stack
        direction="row"
        sx={{
          width:"100%",
          justifyContent: 'center',
          alignItems: 'center',
          pb: '32px'
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Social
        </Typography>
        <Image width="100" height="100" src={logo}/>
      </Stack>
      {authOption === AUTH_OPTION.LOGIN && <LoginForm onSwitchSignup={() => setAuthOption(AUTH_OPTION.REGISTER)} onForgotPassword={() => setAuthOption(AUTH_OPTION.PASSWORD_RESET)}/>}
      {authOption === AUTH_OPTION.REGISTER && <SignupForm onSwithLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>}
      {authOption === AUTH_OPTION.PASSWORD_RESET && <PasswordResetForm/>}
      {authOption === AUTH_OPTION.PASSWORD_CHANGE && <ChangePasswordForm/>}
    </Box>
  )
}

import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import PasswordResetForm from './components/PasswordResetForm'
import { useRouter } from 'next/router'
import ChangePasswordForm from './components/ChangePasswordForm'
import logo from '../public/logo.png'
import Image from 'next/image'

//better structure, styling, and errors handling will be handled later

const AUTH_OPTION = {
  REGISTER: 'register',
  LOGIN: 'login',
  PASSWORD_RESET: 'password_reset',
  PASSWORD_CHANGE: 'password_change'
}

export default function Home() {

  const router = useRouter()
  const theme = useTheme()

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
      sx={{
        background: theme.palette.primary.main,
      }}
      display="flex"
      flexDirection="column"
      alignItems='center'
      rowGap={theme.spacing(10)}
    >
      <Stack
        direction="row"
        sx={{
          width:"100%",
          justifyContent: 'center',
          alignItems: 'center',
          mt: theme.spacing(8)
        }}
      >
        <Typography variant="h2" fontWeight="bold" sx={{mb: theme.spacing(4)}} color={theme.palette.secondary.contrastText}>
          Moment Sphere
        </Typography>
        <Image src={logo} width={100} height={100}/>
      </Stack>
      <Stack
        direction="row"
        width="60rem"
        minHeight="45vh"
        sx={{
          boxShadow: 2,
          borderRadius: theme.spacing(4),
          mt: theme.spacing(10)
        }}
      >
        <Stack
          width="50%"
          bgcolor={theme.palette.primary.light}
          sx={{
            borderTopLeftRadius: theme.spacing(4),
            borderBottomLeftRadius: theme.spacing(4)
          }}
        >
          
        </Stack>
        <Stack
          width="50%"
          bgcolor={theme.palette.secondary.light}
          sx={{
            borderTopRightRadius: theme.spacing(4),
            borderBottomRightRadius: theme.spacing(4)
          }}
        >
            {authOption === AUTH_OPTION.LOGIN && <LoginForm onSwitchSignup={() => setAuthOption(AUTH_OPTION.REGISTER)} onForgotPassword={() => setAuthOption(AUTH_OPTION.PASSWORD_RESET)}/>}
            {authOption === AUTH_OPTION.REGISTER && <SignupForm onSwitchLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>}
            {authOption === AUTH_OPTION.PASSWORD_RESET && <PasswordResetForm onSwitchLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>}
            {authOption === AUTH_OPTION.PASSWORD_CHANGE && <ChangePasswordForm/>}
        </Stack>
      </Stack>
    </Box>
  )
}

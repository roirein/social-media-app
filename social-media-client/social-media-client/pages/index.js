import { useEffect, useState } from 'react'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import PasswordResetForm from './components/PasswordResetForm'
import { useRouter } from 'next/router'
import AuthPageTemplate from '@/components/application/auth-page-template'
import { CircularProgress } from '@mui/material'
import LoadingSpinner from '@/components/UI/loading-spinner/LoadingSpinner'
import { useLoading } from '@/components/UI/loading-spinner/loading-context'

//better structure, styling, and errors handling will be handled later

const AUTH_OPTION = {
  REGISTER: 'register',
  LOGIN: 'login',
  PASSWORD_RESET: 'password_reset',
}

export default function Home() {

  const router = useRouter()

  const {token} = router.query
  const [authOption, setAuthOption] = useState(AUTH_OPTION.LOGIN)
  const {loading, setIsLoading} = useLoading()

  return (
    <>
      <LoadingSpinner open={loading}/>
      <AuthPageTemplate>
        {authOption === AUTH_OPTION.LOGIN && <LoginForm onSwitchSignup={() => setAuthOption(AUTH_OPTION.REGISTER)} onForgotPassword={() => setAuthOption(AUTH_OPTION.PASSWORD_RESET)} loading={loading} setIsLoading={setIsLoading}/>}
        {authOption === AUTH_OPTION.REGISTER && <SignupForm onSwitchLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>}
        {/* {authOption === AUTH_OPTION.LOGIN && <LoginForm onSwitchSignup={() => setAuthOption(AUTH_OPTION.REGISTER)} onForgotPassword={() => setAuthOption(AUTH_OPTION.PASSWORD_RESET)}/>}
        {authOption === AUTH_OPTION.REGISTER && <SignupForm onSwitchLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>}
        {authOption === AUTH_OPTION.PASSWORD_RESET && <PasswordResetForm onSwitchLogin={() => setAuthOption(AUTH_OPTION.LOGIN)}/>} */}
      </AuthPageTemplate>
    </>
  )
}

import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import logo from '../public/logo.png'
import SignupForm from './components/SignupForm'

export default function Home() {
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
      <SignupForm/>
    </Box>
  )
}

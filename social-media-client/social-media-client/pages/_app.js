import { ThemeProvider } from "@mui/material"
import theme from "@/theme/app-theme"

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
      <Component {...pageProps} />
  </ThemeProvider>
}

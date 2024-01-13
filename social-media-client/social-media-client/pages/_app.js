import { ThemeProvider } from "@mui/material"
import theme from "@/theme/app-theme"
import { Provider } from "react-redux"
import store from "@/store"
import AuthPageTemplate from "@/components/application/auth-page-template"

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
      </ThemeProvider>
    </Provider>
  )
}

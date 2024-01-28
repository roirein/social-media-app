import { ThemeProvider } from "@mui/material"
import theme from "@/theme/app-theme"
import { Provider } from "react-redux"
import store from "@/store"
import LoadingContextProvider from "@/components/UI/loading-spinner/loading-context"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LoadingContextProvider>
          <Component {...pageProps}/>
        </LoadingContextProvider>
      </ThemeProvider>
    </Provider>
  )
}

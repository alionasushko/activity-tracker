import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import './styles/index.sass'

const container = document.getElementById('root')!
const root = createRoot(container)

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d4592',
    },
  },
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ThemeProvider,createTheme } from '@mui/material'

const theme  = createTheme({
  palette: {
    primary: {
      main: '#a2dcb2', 
      // main: '#074f34', 
    },
    secondary: {
      main: '#f8f9fa', 
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    color: '#232323 !important'
  },
  components:{
    MuiButton: {
      primary: {
        main:'#cd3030',
      }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <StrictMode>
    <App />
  </StrictMode>
  </ThemeProvider>,
)

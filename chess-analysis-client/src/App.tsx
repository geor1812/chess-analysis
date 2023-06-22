import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { darkTheme } from './utils/theme'
import Homepage from './components/Homepage'
import AnalysisBoardPage from './components/AnalysisBoardPage'
import Auth from './components/Auth/Auth'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/analysis" element={<AnalysisBoardPage />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App


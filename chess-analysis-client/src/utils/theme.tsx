import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Courier New',
      'Lucida Sans Typewriter',
      'Lucida Typewriter',
    ].join(','),
  },

  palette: {
    mode: 'dark',
  },
})

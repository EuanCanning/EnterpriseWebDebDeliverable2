import { createTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

const theme = createTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#30ffe0',
      main: '#00e6c3',
      dark: '#00b096',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff4d96',
      main: '#ff0069',
      dark: '#d10056',
      contrastText: '#000',
    },
      openTitle: '#3f4771',
      protectedTitle: pink['400'],
      type: 'light'
    }
  });

  export default theme

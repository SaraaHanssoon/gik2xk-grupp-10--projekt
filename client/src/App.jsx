import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, Tooltip, createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5dc', 
    },
    primary: {
      main: '#795548', 
    },
  },
  typography: {
    fontFamily: 'Georgia, serif', 
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none', 
        color: 'inherit',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#5d4037', 
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '0 8px', 
        }
      }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ fontSize: '24px', color: 'white', textDecoration: 'none' }}>Coffee Shop</Link>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Endast admin kan skapa ny vara" componentsProps={{ tooltip: { sx: { fontSize: "1rem" } } }}>
                <Button color="inherit">
                  <Link to="/products/new">Create new product</Link>
                </Button>
              </Tooltip>
              <Button color="inherit">
                <Link to="/cart">Shopping Cart</Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

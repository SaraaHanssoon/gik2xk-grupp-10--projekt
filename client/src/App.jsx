import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container, Tooltip, createTheme, ThemeProvider } from '@mui/material';

// Skapa ett anpassat tema
const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5dc', // En lattebrun färg för sidans bakgrund
    },
    primary: {
      main: '#795548', // En mörkare brun färg för AppBar etc.
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none', // Tar bort understrykningen från länkar
        color: 'inherit', // Använder den ärftliga färgen, användbart för AppBar
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar sx={{ paddingLeft: '10px', paddingRight: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ color: 'white', fontSize: '25px' }}>
              <Link to="/">Kaffe Shoppen!</Link>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Tooltip title="Endast admin kan skapa ny vara" componentsProps={{ tooltip: { sx: { fontSize: "1rem" } } }}>
                <Button color="inherit" sx={{ marginBottom: '5px' }}>
                  <Link to="/products/new" style={{ fontSize: '16px', color: 'inherit', textDecoration: 'none' }}>Skapa ny produkt</Link>
                </Button>
              </Tooltip>
              <Button color="inherit">
                <Link to="/cart" style={{ fontSize: '16px', color: 'inherit', textDecoration: 'none' }}>Varukorg</Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;

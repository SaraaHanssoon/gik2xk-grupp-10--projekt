import ProductList from "../components/ProductList";
import { Alert, Grid, Paper, Typography, Container } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const message = location.state?.message;
    const [open, setOpen] = useState(true);

    function clearMessage() {
        window.history.replaceState({}, "");
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {message && open && (
                <Alert
                    onClose={() => {
                        setOpen(false);
                        clearMessage();
                    }}
                    variant='filled'
                    severity='success'
                    sx={{ mb: 2 }} 
                >
                    {message}
                </Alert>
            )}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#fff8e1' }}>
                <Typography variant='h4' sx={{ mb: 3, color: '#6d4c41' }}>Premium Coffee Selections</Typography>
                <ProductList />
            </Paper>
        </Container>
    );
}

export default Home;

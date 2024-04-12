import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOne, create, update, remove } from '../services/ProductService';
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const emptyProduct = {
    id: 0,
    title: '',
    body: '',
    price: 0,  // Assuming price should be a number, setting initial value to 0
    imageUrl: ''
};

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(emptyProduct);

    useEffect(() => {
        if (id) {
            console.log(`Fetching product with id: ${id}`);
            getOne(Number(id)).then((product) => {
                setProduct(product);
                console.log(`Product fetched: `, product);
            }).catch(error => {
                console.error("Failed to fetch product", error);
            });
        } else {
            setProduct(emptyProduct);
        }
    }, [id]);

    function onChange(e) {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    }

    function onSave() {
        const action = product.id === 0 ? create : update;
        action(product).then(response => {
            console.log(`Product saved: `, response);
            const redirectPath = product.id === 0 ? '/' : `/products/${product.id}`;
            navigate(redirectPath, { replace: true, state: response });
        });
    }

    function onDelete() {
        remove(product.id).then(response => {
            console.log(`Product deleted: `, response);
            navigate('/', { replace: true, state: response });
        });
    }

    return (
        <Container maxWidth='lg'>
            <Typography variant='h4' component='h2'>
                {product.id ? "Ändra vara" : "Skapa vara"}
            </Typography>
            <Box mt={4}>
                <form>
                    <Box>
                        <TextField
                            fullWidth
                            margin='normal'
                            onChange={onChange}
                            value={product.title}
                            name='title'
                            id='title'
                            label='Titel'
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            margin='normal'
                            onChange={onChange}
                            value={product.body}
                            multiline
                            minRows={5}
                            name='body'
                            id='body'
                            label='Beskrivning'
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            margin='normal'
                            onChange={onChange}
                            value={product.price}
                            name='price'
                            id='price'
                            label='Pris'
                            type='number'
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            margin='normal'
                            onChange={onChange}
                            value={product.imageUrl}
                            name='imageUrl'
                            id='imageUrl'
                            label='Sökväg till bild'
                        />
                    </Box>
                    <Box display='flex' mt={2}>
                        <Box flexGrow={1}>
                            <Button
                                startIcon={<ChevronLeftIcon />}
                                sx={{ mr: 1 }}
                                variant='contained'
                                onClick={() => navigate(-1)}
                            >
                                Tillbaka
                            </Button>
                            {id && (
                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={onDelete}
                                    variant='contained'
                                    color='error'
                                >
                                    Ta bort
                                </Button>
                            )}
                        </Box>
                        <Button
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                            variant='contained'
                            color='success'
                        >
                            Spara
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default ProductEdit;

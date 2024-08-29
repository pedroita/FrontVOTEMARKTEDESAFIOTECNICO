import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Typography, Container, Snackbar, Rating, Box, Grid, Paper, Card, CardMedia } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const VoteForm = () => {
    const [markets, setMarkets] = useState([]);
    const [form, setForm] = useState({
        hygiene: 0,
        queues: 0,
        service: 0,
        prices: 0,
        marketId: '',
        clientId: ''  // Mantenha como string para o controle do input
    });
    const [selectedMarketImage, setSelectedMarketImage] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = () => {
        fetch('http://localhost:3000/markets')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar mercados');
                }
                return response.json();
            })
            .then(data => {
                setMarkets(data);
            })
            .catch(error => {
                console.error('Error fetching markets:', error);
            });
    };

    const handleMarketChange = (event) => {
        const selectedMarketId = event.target.value;
        setForm({ ...form, marketId: selectedMarketId });

        const selectedMarket = markets.find(market => market.marketId === parseInt(selectedMarketId, 10));
        if (selectedMarket) {
            setSelectedMarketImage(selectedMarket.image || ''); // Assumindo que a imagem está disponível no objeto market
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.clientId) {
            setMessage('Por favor, forneça seu ID de cliente.');
            setOpen(true);
            return;
        }

        if (!form.marketId) {
            setMessage('Por favor, selecione um mercado.');
            setOpen(true);
            return;
        }

        // Converter clientId para número inteiro antes de enviar
        const clientIdNumber = parseInt(form.clientId, 10);

        fetch('http://localhost:3000/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: clientIdNumber, // Enviar como inteiro
                marketId: form.marketId,
                hygiene: form.hygiene,
                queues: form.queues,
                service: form.service,
                prices: form.prices,
                date: new Date().toISOString()
            })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    return response.json().then(data => {
                        setMessage(data.error || 'Você já votou hoje.');
                        setOpen(true);
                        throw new Error(data.error || 'Você já votou hoje.');
                    });
                } else {
                    return response.json().then(data => {
                        setMessage(data.error || 'Erro ao registrar voto.');
                        setOpen(true);
                        throw new Error(data.error || 'Erro ao registrar voto.');
                    });
                }
            } else {
                return response.json().then(data => {
                    setMessage('Voto registrado com sucesso!');
                    setOpen(true);
                    fetchMarkets(); 
                });
            }
        })
        .catch(error => {
            console.error('Error posting vote:', error);
        });
    };

    return (
        <Container>
            <Box my={4}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Formulário de Votação
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="ID do Cliente"
                            value={form.clientId}
                            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            type="number" // Garante que apenas números possam ser inseridos
                        />
                        <TextField
                            select
                            label="Mercado"
                            value={form.marketId}
                            onChange={handleMarketChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        >
                            {markets.map((market) => (
                                <MenuItem 
                                    key={market.marketId} 
                                    value={market.marketId}
                                >
                                    {market.marketName}
                                </MenuItem>
                            ))}
                        </TextField>
                        {selectedMarketImage && (
                            <Box mt={2} textAlign="center">
                                <Card sx={{ maxWidth: 300, margin: 'auto' }}>
                                    <CardMedia
                                        component="img"
                                        alt="Imagem do Mercado"
                                        height="200"
                                        image={selectedMarketImage}
                                        title="Imagem do Mercado"
                                        sx={{ objectFit: 'cover' }}
                                    />
                                </Card>
                            </Box>
                        )}
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography component="legend">Higiene</Typography>
                                    <Rating
                                        name="hygiene"
                                        value={form.hygiene}
                                        onChange={(event, newValue) => setForm({ ...form, hygiene: newValue })}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography component="legend">Filas</Typography>
                                    <Rating
                                        name="queues"
                                        value={form.queues}
                                        onChange={(event, newValue) => setForm({ ...form, queues: newValue })}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography component="legend">Serviço</Typography>
                                    <Rating
                                        name="service"
                                        value={form.service}
                                        onChange={(event, newValue) => setForm({ ...form, service: newValue })}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box>
                                    <Typography component="legend">Preços</Typography>
                                    <Rating
                                        name="prices"
                                        value={form.prices}
                                        onChange={(event, newValue) => setForm({ ...form, prices: newValue })}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                            >
                                Enviar Voto
                            </Button>
                        </Box>
                    </form>
                    <Box mt={2}>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => navigate('/')}
                            fullWidth
                        >
                            Voltar
                        </Button>
                    </Box>
                </Paper>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity={message.includes('sucesso') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default VoteForm;

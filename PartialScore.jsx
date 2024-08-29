import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, CardContent, CircularProgress, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PartialScore = () => {
    const [leadingMarkets, setLeadingMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/leading-market')
            .then(response => response.json())
            .then(data => {
                setLeadingMarkets(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching leading markets:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (leadingMarkets.length === 0) {
        return (
            <Container>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
                    <Typography variant="h6" color="textSecondary" align="center">
                        Nenhum mercado encontrado
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                            sx={{ borderRadius: 20, px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            Voltar
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" mt={4}>
                <Typography variant="h4" gutterBottom align="center" mb={4}>
                    Placar Parcial
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {leadingMarkets.map(market => (
                        <Grid item xs={12} sm={6} md={4} key={market.marketId}>
                            <Card sx={{ borderRadius: 10, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {market.marketName}
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Total de votos: {market.totalVotes}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{ borderRadius: 20, px: 4, py: 1.5, fontSize: '1rem' }}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PartialScore;

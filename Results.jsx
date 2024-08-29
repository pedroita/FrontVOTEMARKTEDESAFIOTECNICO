import React, { useEffect, useState } from 'react';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await fetch('http://localhost:3000/results');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Erro ao carregar resultados.');
            console.error('Error fetching results:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );
    if (error) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Alert severity="error">{error}</Alert>
        </Box>
    );

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Resultados Parciais
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Mercado</Typography></TableCell>
                            <TableCell><Typography variant="h6">Total de Votos</Typography></TableCell>
                            <TableCell><Typography variant="h6">Higiene</Typography></TableCell>
                            <TableCell><Typography variant="h6">Filas</Typography></TableCell>
                            <TableCell><Typography variant="h6">Serviço</Typography></TableCell>
                            <TableCell><Typography variant="h6">Preços</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map(result => (
                            <TableRow key={result.marketId}>
                                <TableCell>{result.marketName}</TableCell>
                                <TableCell>{result.totalVotes}</TableCell>
                                <TableCell>{result.hygiene}</TableCell>
                                <TableCell>{result.queues}</TableCell>
                                <TableCell>{result.service}</TableCell>
                                <TableCell>{result.prices}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={4}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/')}
                >
                    Voltar
                </Button>
            </Box>
        </Container>
    );
};

export default Results;

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Container
} from '@mui/material';
import axios from '../api/axios';

interface Classe {
  id: string;
  nome: string;
  descricao: string;
}

export default function ListaClasses() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get('/classes')
      .then(res => setClasses(res.data))
      .catch((err) => {
        console.error(err); // log completo no console
        setErro('Erro ao carregar classes');
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <CircularProgress />;

  if (erro) return <Typography color="error">{erro}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>
        Listagem de Classes
      </Typography>
      <Grid container spacing={2}>
        {classes.map(classe => (
          <Grid item xs={12} sm={6} md={4} key={classe.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{classe.nome}</Typography>
                <Typography variant="body2">{classe.descricao}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
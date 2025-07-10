import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Experimento {
  id: number;
  name: string;
  status: number;
  circuitos: { circuito: Circuito }[];
}

interface Circuito {
  id: number;
  name: string;
  descricao: string;
}

interface SimulationResult {
  statevector?: any;
  counts?: any;
  circuit_image?: string;
  error?: string;
}

export default function ExperimentoCRUD() {
  const [experimentos, setExperimentos] = useState<Experimento[]>([]);
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState<Experimento | null>(null);
  const [form, setForm] = useState({ name: '', status: 0, circuitoId: '' });

  const [simulando, setSimulando] = useState<number | null>(null); 
  const [resultado, setResultado] = useState<SimulationResult | null>(null);
  const [openResultado, setOpenResultado] = useState(false);

  const carregarDados = () => {
    api.get('/experimentos')
      .then(res => setExperimentos(res.data))
      .catch(err => console.error('Erro ao carregar experimentos:', err));

    api.get('/circuitos')
      .then(res => setCircuitos(res.data))
      .catch(err => console.error('Erro ao carregar circuitos:', err));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const salvar = () => {
    if (editando) {
      api.put(`/experimentos/${editando.id}`, { name: form.name, status: form.status })
        .then(() => {
          carregarDados();
          fechar();
        });
    } else {
      const payload = {
        name: form.name,
        status: form.status,
        circuitoId: Number(form.circuitoId)
      };
      api.post('/experimentos', payload)
        .then(() => {
          carregarDados();
          fechar();
        });
    }
  };

  const excluir = (id: number) => {
    if (window.confirm('Deseja realmente excluir?')) {
      api.delete(`/experimentos/${id}`).then(() => carregarDados());
    }
  };

  const simular = (experimentoId: number) => {
    setSimulando(experimentoId);
    setResultado(null);
    api.post(`/experimentos/${experimentoId}/simular`)
      .then(res => {
        setResultado(res.data);
        setOpenResultado(true);
      })
      .catch(err => {
        console.error("Erro na simulação:", err);
        setResultado({ error: err.response?.data?.message || "Falha ao simular o experimento." });
        setOpenResultado(true);
      })
      .finally(() => {
        setSimulando(null);
      });
  };

  const abrirNovo = () => {
    setEditando(null);
    setForm({ name: '', status: 0, circuitoId: '' });
    setOpen(true);
  };

  const abrirEditar = (exp: Experimento) => {
    setEditando(exp);
    setForm({ name: exp.name, status: exp.status, circuitoId: '' });
    setOpen(true);
  };

  const fechar = () => {
    setOpen(false);
    setEditando(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Gerenciar Experimentos</Typography>
      <Button variant="contained" onClick={abrirNovo} sx={{ mb: 2 }}>
        Novo Experimento
      </Button>

      <Grid container spacing={3}>
        {experimentos.map((exp) => (
          <Grid item xs={12} md={6} lg={4} key={exp.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">{exp.name}</Typography>
                <Typography variant="body2" color="text.secondary">Status: {exp.status}</Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Circuito: {exp.circuitos[0]?.circuito.name || 'N/A'}
                </Typography>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <IconButton size="small" color="primary" onClick={() => abrirEditar(exp)}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => excluir(exp.id)}><DeleteIcon /></IconButton>
                  <IconButton size="small" color="secondary" onClick={() => simular(exp.id)} disabled={simulando !== null}>
                    {simulando === exp.id ? <CircularProgress size={20} /> : <PlayArrowIcon />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para Novo/Editar Experimento */}
      <Dialog open={open} onClose={fechar} fullWidth maxWidth="sm">
        <DialogTitle>{editando ? 'Editar' : 'Novo'} Experimento</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth margin="dense" label="Nome do Experimento" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {!editando && (
            <FormControl fullWidth margin="dense">
              <InputLabel id="circuito-select-label">Circuito</InputLabel>
              <Select labelId="circuito-select-label" value={form.circuitoId} label="Circuito" onChange={(e) => setForm({ ...form, circuitoId: e.target.value })}>
                <MenuItem value=""><em>Selecione um circuito</em></MenuItem>
                {circuitos.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.name} - {c.descricao}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField fullWidth margin="dense" type="number" label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: Number(e.target.value) })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={fechar}>Cancelar</Button>
          <Button onClick={salvar} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para exibir o Resultado da Simulação */}
      <Dialog open={openResultado} onClose={() => setOpenResultado(false)} fullWidth maxWidth="md">
        <DialogTitle>Resultado da Simulação</DialogTitle>
        <DialogContent>
          {resultado?.error && (
            <Alert severity="error">{resultado.error}</Alert>
          )}
          {resultado?.circuit_image && (
            <Box textAlign="center" my={2}>
              <Typography variant="h6">Diagrama do Circuito</Typography>
              <img src={`data:image/png;base64,${resultado.circuit_image}`} alt="Diagrama do Circuito" style={{ maxWidth: '100%', border: '1px solid #ddd', borderRadius: '4px' }} />
            </Box>
          )}
          {resultado?.counts && (
            <Box my={2}>
              <Typography variant="h6">Contagens (Counts)</Typography>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>{JSON.stringify(resultado.counts, null, 2)}</pre>
            </Box>
          )}
          {resultado?.statevector && (
            <Box my={2}>
              <Typography variant="h6">Vetor de Estado (Statevector)</Typography>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>{JSON.stringify(resultado.statevector, null, 2)}</pre>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResultado(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

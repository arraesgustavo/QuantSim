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
    IconButton
    } from '@mui/material';
    import { useEffect, useState } from 'react';
    import api from '../api/axios';
    import DeleteIcon from '@mui/icons-material/Delete';
    import EditIcon from '@mui/icons-material/Edit';

    interface Experimento {
    id: number;
    name: string;
    status: number;
    }

    export default function ExperimentoCRUD() {
    const [experimentos, setExperimentos] = useState<Experimento[]>([]);
    const [open, setOpen] = useState(false);
    const [editando, setEditando] = useState<Experimento | null>(null);
    const [form, setForm] = useState({ name: '', status: 0 });

    const carregar = () => {
        api.get('/experimentos')
        .then(res => setExperimentos(res.data))
        .catch(err => {
            console.error('Erro ao carregar experimentos:', err); // <- adicionado
            alert('Erro ao carregar experimentos');
            });
    };

    useEffect(() => {
        carregar();
    }, []);

    const salvar = () => {
        if (editando) {
        api.put(`/experimentos/${editando.id}`, form)
            .then(() => {
            carregar();
            fechar();
            });
        } else {
        api.post('/experimentos', form)
            .then(() => {
            carregar();
            fechar();
            });
        }
    };

    const excluir = (id: number) => {
        if (confirm('Deseja realmente excluir?')) {
        api.delete(`/experimentos/${id}`)
            .then(() => carregar());
        }
    };

    const abrirNovo = () => {
        setEditando(null);
        setForm({ name: '', status: 0 });
        setOpen(true);
    };

    const abrirEditar = (exp: Experimento) => {
        setEditando(exp);
        setForm({ name: exp.name, status: exp.status });
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

        <Grid container spacing={2}>
            {experimentos.map((exp) => (
            <Grid item={true} xs={12} md={6} lg={4} key={exp.id}>
                <Card>
                <CardContent>
                    <Typography variant="h6">{exp.name}</Typography>
                    <Typography variant="body2">Status: {exp.status}</Typography>
                    <Box mt={2}>
                    <IconButton color="primary" onClick={() => abrirEditar(exp)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => excluir(exp.id)}>
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>

        <Dialog open={open} onClose={fechar}>
            <DialogTitle>{editando ? 'Editar' : 'Novo'} Experimento</DialogTitle>
            <DialogContent>
            <TextField
                fullWidth
                margin="normal"
                label="Nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
                fullWidth
                margin="normal"
                type="number"
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={fechar}>Cancelar</Button>
            <Button onClick={salvar} variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
    }

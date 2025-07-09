import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from '../api/axios';

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', { email, senha });
      setToken(response.data.token);
      navigate('/menu');
    } catch (err) {
      alert('Login inválido');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #f3e7f3, #d4d7f5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="Logo"
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 1,
          }}
        />

        {/* Título */}
        <Typography variant="h4" fontWeight="bold" mb={3}>
          QuantSim
        </Typography>

        {/* Texto login */}
        <Typography variant="h6" textAlign="left">
          Log In
        </Typography>
        <Typography variant="body2" textAlign="left" mb={2}>
          Get started for free
        </Typography>

        {/* Campos */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>

        <Box mt={2} display="flex" justifyContent="space-between">


        </Box>
      </Paper>
    </Box>
  );
}

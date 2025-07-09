import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ExperimentoCRUD from '../pages/ExperimentoCRUD';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MenuPrincipal() {
  const [abaAtiva, setAbaAtiva] = useState<'experimentos' | null>(null);
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogoClick = () => {
    setAbaAtiva(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(to bottom right, #fce1f3, #e1c0fa)',
      }}
    >
      {/* Lado esquerdo - Sidebar */}
      <Box
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: '#fff',
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box>
          {}
          <Link 
            to="/menu" 
            onClick={handleLogoClick} 
            style={{ textDecoration: 'none' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pl: 1, cursor: 'pointer' }}>
              <img src="/logo.png" alt="Logo" style={{ width: 40, marginRight: 12 }} />
              <Typography variant="h6" color="text.primary" fontWeight="bold">
                QuantSim
              </Typography>
            </Box>
          </Link>

          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={abaAtiva === 'experimentos'}
                onClick={() => setAbaAtiva('experimentos')}
                sx={{ borderRadius: 2 }}
              >
                <ListItemIcon>
                  <ScienceOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Experimentos" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={sair} sx={{ borderRadius: 2 }}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Sair" sx={{ color: 'error.main' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Lado direito - Conteúdo */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          overflowY: 'auto',
        }}
      >
        {abaAtiva === 'experimentos' ? (
          <ExperimentoCRUD />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h5" color="text.secondary">
              Selecione uma opção no menu à esquerda
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
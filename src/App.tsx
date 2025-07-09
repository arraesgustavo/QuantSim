import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ListaClasses from './pages/ListaClasses';
import PrivateRoute from './routes/PrivateRoute';
import MenuPrincipal from './pages/MenuPrincipal';
import ExperimentoCRUD from './pages/ExperimentoCRUD';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/classes" element={<PrivateRoute><ListaClasses /></PrivateRoute>} />
          <Route path="/menu" element={
            <PrivateRoute>
              <MenuPrincipal />
            </PrivateRoute>
          } />
          <Route path="/experimentos" element={
            <PrivateRoute>
                <ExperimentoCRUD />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

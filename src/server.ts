import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import quantumGateRoutes from './routes/quantumGate.route';
import qubitRoutes from './routes/qubit.route';
import authRoutes from './routes/auth.route';
import { authMiddleware } from './middleware/auth.middleware';
import classRoutes from './routes/class.route';
import cors from 'cors';
import experimentoRoutes from './routes/experimento.route';
import circuitoRoutes from './routes/circuitoQuantico.route';

const app = express();


app.use(cors({
  origin: ['http://localhost:5173'], // seu frontend
  credentials: true
}));

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quantum Computing API',
      version: '1.0.0',
      description: 'API para gerenciamento de Qubits e Quantum Gates',
    },
  },
  apis: ['./src/schemas/swagger.ts'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/circuitos', authMiddleware, circuitoRoutes);
app.use('/qubits', authMiddleware, qubitRoutes);
app.use('/quantum-gates', authMiddleware , quantumGateRoutes);
app.use('/auth', authRoutes);
app.use('/classes', authMiddleware, classRoutes);
app.use('/experimentos', authMiddleware, experimentoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
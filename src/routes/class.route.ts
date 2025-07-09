import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /classes → retorna os experimentos com info básica
router.get('/', async (req, res) => {
  try {
    const experimentos = await prisma.experimento.findMany({
      include: {
        usuario: {
          select: { name: true }
        },
        circuitos: {
          include: {
            circuito: {
              select: {
                name: true,
                descricao: true
              }
            }
          }
        }
      }
    });

    // Formatar os dados como "classes"
    const classes = experimentos.map((exp) => ({
      id: exp.id,
      nome: exp.name,
      status: exp.status,
      usuario: exp.usuario?.name || 'Desconhecido',
      circuitos: exp.circuitos.map(c => ({
        nome: c.circuito.name,
        descricao: c.circuito.descricao
      }))
    }));

    res.json(classes);
  } catch (error) {
    console.error('Erro ao buscar classes:', error);
    res.status(500).json({ error: 'Erro ao buscar classes' });
  }
});

export default router;

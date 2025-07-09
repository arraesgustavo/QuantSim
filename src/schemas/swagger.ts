/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Qubit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         estado:
 *           type: integer
 *         stateVector:
 *           type: string
 *         portas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuantumGate'
 *       example:
 *         id: 1
 *         estado: 0
 *         stateVector: '[{"real":0.7071,"imag":0},{"real":0,"imag":0.7071}]'
 *         portas: []
 *
 *     QubitInput:
 *       type: object
 *       required:
 *         - estado
 *       properties:
 *         estado:
 *           type: integer
 *           enum: [0, 1]
 *         stateVector:
 *           type: string
 *           description: |
 *             Vetor de estado em formato JSON.
 *             Exemplo: '[{"real":0.5,"imag":0},{"real":0.5,"imag":0}]'
 *       example:
 *         estado: 0
 *         stateVector: '[{"real":0.7071,"imag":0},{"real":0,"imag":0.7071}]'
 *
 *     QubitUpdate:
 *       type: object
 *       properties:
 *         estado:
 *           type: integer
 *           enum: [0, 1]
 *         stateVector:
 *           type: string
 *           nullable: true
 *           description: |
 *             Vetor de estado em formato JSON.
 *             Exemplo: '[{"real":0.5,"imag":0},{"real":0.5,"imag":0}]'
 *       example:
 *         estado: 1
 *         stateVector: null
 *
 *     MeasurementResult:
 *       type: object
 *       properties:
 *         classicalState:
 *           type: integer
 *           enum: [0, 1]
 *       example:
 *         classicalState: 1
 *
 *     AssociateGate:
 *       type: object
 *       required:
 *         - gateId
 *       properties:
 *         gateId:
 *           type: integer
 *       example:
 *         gateId: 1
 *
 *     QuantumGate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         type:
 *           type: string
 *           enum: [SGATE, HGATE, ZGATE, XGATE]
 *         duration:
 *           type: number
 *         errorRate:
 *           type: number
 *         qubitId:
 *           type: integer
 *           nullable: true
 *         circuitoId:
 *           type: integer
 *           nullable: true
 *         phase:
 *           type: number
 *           nullable: true
 *         isClifford:
 *           type: boolean
 *           nullable: true
 *         phaseShift:
 *           type: number
 *           nullable: true
 *         isDiagonal:
 *           type: boolean
 *           nullable: true
 *         pulseAmplitude:
 *           type: number
 *           nullable: true
 *         isPauli:
 *           type: boolean
 *           nullable: true
 *
 *     QuantumGateInput:
 *       type: object
 *       required:
 *         - type
 *         - duration
 *         - errorRate
 *       properties:
 *         type:
 *           type: string
 *           enum: [SGATE, HGATE, ZGATE, XGATE]
 *         duration:
 *           type: number
 *         errorRate:
 *           type: number
 *         phase:
 *           type: number
 *           nullable: true
 *         isClifford:
 *           type: boolean
 *           nullable: true
 *         phaseShift:
 *           type: number
 *           nullable: true
 *         isDiagonal:
 *           type: boolean
 *           nullable: true
 *         pulseAmplitude:
 *           type: number
 *           nullable: true
 *         isPauli:
 *           type: boolean
 *           nullable: true
 *
 *     AssociateQubit:
 *       type: object
 *       required:
 *         - qubitId
 *       properties:
 *         qubitId:
 *           type: integer
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         error:
 *           type: string
 *           nullable: true
 */

/**
 * @openapi
 * /qubits:
 *   get:
 *     tags: [Qubits]
 *     summary: Lista todos os qubits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de qubits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Qubit'
 *       500:
 *         description: Erro ao buscar qubits
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags: [Qubits]
 *     summary: Cria um novo qubit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QubitInput'
 *     responses:
 *       201:
 *         description: Qubit criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /qubits/{id}:
 *   get:
 *     tags: [Qubits]
 *     summary: Obtém um qubit pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Qubit encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       404:
 *         description: Qubit não encontrado
 *       500:
 *         description: Erro ao buscar qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     tags: [Qubits]
 *     summary: Atualiza um qubit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QubitUpdate'
 *     responses:
 *       200:
 *         description: Qubit atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Qubit não encontrado
 *       500:
 *         description: Erro ao atualizar qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags: [Qubits]
 *     summary: Remove um qubit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Qubit removido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       404:
 *         description: Qubit não encontrado
 *       500:
 *         description: Erro ao remover qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /qubits/{id}/measure:
 *   get:
 *     tags: [Qubits]
 *     summary: Realiza a medição de um qubit
 *     description: Mede o qubit com o ID fornecido e retorna o estado clássico (0 ou 1) resultante.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do qubit a ser medido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultado da medição do qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MeasurementResult'
 *       404:
 *         description: Qubit não encontrado
 *       500:
 *         description: Erro ao medir qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /qubits/{qubitId}/gates:
 *   get:
 *     tags: [Qubits]
 *     summary: Lista as portas associadas a um qubit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qubitId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de portas do qubit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuantumGate'
 *       404:
 *         description: Qubit não encontrado
 *       500:
 *         description: Erro ao buscar portas do qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags: [Qubits]
 *     summary: Associa uma porta ao qubit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qubitId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssociateGate'
 *     responses:
 *       200:
 *         description: Porta associada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       404:
 *         description: Qubit ou porta não encontrados
 *       500:
 *         description: Erro ao associar porta ao qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags: [Qubits]
 *     summary: Remove uma porta do qubit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: qubitId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssociateGate'
 *     responses:
 *       200:
 *         description: Porta removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Qubit'
 *       404:
 *         description: Qubit ou porta não encontrados
 *       500:
 *         description: Erro ao remover porta do qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @openapi
 * /quantum-gates:
 *   get:
 *     tags: [QuantumGates]
 *     summary: Listar todas as portas quânticas
 *     responses:
 *       200:
 *         description: Lista de portas quânticas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuantumGate'
 * 
 *   post:
 *     tags: [QuantumGates]
 *     summary: Criar uma nova porta quântica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuantumGateInput'
 *     responses:
 *       201:
 *         description: Porta quântica criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 */

/**
 * @openapi
 * /quantum-gates/{id}:
 *   get:
 *     tags: [QuantumGates]
 *     summary: Obter uma porta quântica pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Porta quântica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 *       404:
 *         description: Porta quântica não encontrada
 * 
 *   put:
 *     tags: [QuantumGates]
 *     summary: Atualizar uma porta quântica
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuantumGateInput'
 *     responses:
 *       200:
 *         description: Porta quântica atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 * 
 *   delete:
 *     tags: [QuantumGates]
 *     summary: Deletar uma porta quântica
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Porta quântica deletada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 */

/**
 * @openapi
 * /quantum-gates/{gateId}/associate-qubit:
 *   post:
 *     tags: [QuantumGates]
 *     summary: Associar uma porta a um qubit
 *     parameters:
 *       - name: gateId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qubitId:
 *                 type: integer
 *             required:
 *               - qubitId
 *     responses:
 *       200:
 *         description: Porta associada ao qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 */

/**
 * @openapi
 * /quantum-gates/{gateId}/disassociate-qubit:
 *   post:
 *     tags: [QuantumGates]
 *     summary: Desassociar uma porta de um qubit
 *     parameters:
 *       - name: gateId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Porta desassociada do qubit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuantumGate'
 */


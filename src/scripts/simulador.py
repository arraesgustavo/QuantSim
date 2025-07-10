import sys
import json
import base64
from io import BytesIO
import matplotlib
matplotlib.use('Agg')

from qiskit import QuantumCircuit, transpile
from qiskit.visualization import circuit_drawer
from qiskit_aer import AerSimulator

def simulate_circuit(gates_data):
    try:
        qubit_ids = sorted(set(g['qubitId'] for g in gates_data))
        qubit_map = {qid: i for i, qid in enumerate(qubit_ids)}
        num_qubits = len(qubit_map)

        if num_qubits == 0:
            return {"error": "Nenhum qubit associado aos gates do circuito."}

        # 1. Criação do circuito base
        qc_base = QuantumCircuit(num_qubits)
        for gate in gates_data:
            idx = qubit_map[gate['qubitId']]
            gtype = gate['type'].upper()

            if gtype == 'HGATE':
                qc_base.h(idx)
            elif gtype == 'XGATE':
                qc_base.x(idx)
            elif gtype == 'ZGATE':
                qc_base.z(idx)
            elif gtype == 'SGATE':
                qc_base.s(idx)

        # 2. Simulador de vetor de estado (com transpile)
        from qiskit.quantum_info import Statevector
        statevector = Statevector.from_instruction(qc_base)


        # 3. Cópia do circuito para medição
        qc_counts = qc_base.copy()
        qc_counts.measure_all()
        transpiled_counts = transpile(qc_counts, sim_sv)
        result_counts = sim_sv.run(transpiled_counts, shots=1024).result()
        counts = result_counts.get_counts(transpiled_counts)

        # 4. Imagem do circuito com medições
        fig = circuit_drawer(qc_counts, output='mpl')
        buf = BytesIO()
        fig.savefig(buf, format='png')
        image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        buf.close()

        return {
            "statevector": [list(val) for val in statevector.data],
            "counts": counts,
            "circuit_image": image_base64
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    input_json = sys.argv[1]
    gates = json.loads(input_json)
    result = simulate_circuit(gates)
    print(json.dumps(result))

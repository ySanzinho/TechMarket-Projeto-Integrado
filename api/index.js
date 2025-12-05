const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());

// Simulação de banco de dados
let contas = [
  { id: 1, nome: "Cliente A", saldo: 8000 },
  { id: 2, nome: "Cliente B", saldo: 2000 }
];

let transacoes = [];

// Endpoint de transferência
app.post("/transferencia", (req, res) => {
  const { contaOrigem, contaDestino, valor } = req.body;

  const origem = contas.find(c => c.id === contaOrigem);
  const destino = contas.find(c => c.id === contaDestino);

  if (!origem || !destino) {
    return res.status(404).json({ erro: "Conta não encontrada" });
  }

  if (origem.saldo < valor) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }

  // Atualiza saldos
  origem.saldo -= valor;
  destino.saldo += valor;

  // Gera código único
  const codigoTransacao = uuidv4();

  // Registra transação
  const registro = {
    codigo: codigoTransacao,
    origem: contaOrigem,
    destino: contaDestino,
    valor,
    data: new Date()
  };

  transacoes.push(registro);

  return res.status(200).json({
    mensagem: "Transferência realizada com sucesso",
    transacao: registro
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

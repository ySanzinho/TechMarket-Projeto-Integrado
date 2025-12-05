-- 01 Criação da DATABASE
CREATE DATABASE techmarket;
USE techmarket;


-- 02 Criação das tabelas
CREATE TABLE contas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  saldo DECIMAL(10,2)
);

CREATE TABLE transacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  conta_id INT,
  tipo VARCHAR(10), -- 'credito' ou 'debito'
  valor DECIMAL(10,2),
  data_transacao DATETIME,
  FOREIGN KEY (conta_id) REFERENCES contas(id)
);


-- 03 Criação e Usando PROCEDURE
DELIMITER $$

CREATE PROCEDURE sp_extrato_conta (
  IN p_conta_id INT,
  IN p_data_inicio DATE,
  IN p_data_fim DATE
)
BEGIN
  -- Retorna o saldo da conta
  SELECT 
    c.id AS conta,
    c.nome AS titular,
    c.saldo AS saldo_atual
  FROM contas c
  WHERE c.id = p_conta_id;

  -- Retorna as 10 últimas transações no período
  SELECT 
    t.id,
    t.tipo,
    t.valor,
    t.data_transacao
  FROM transacoes t
  WHERE t.conta_id = p_conta_id
    AND t.data_transacao BETWEEN p_data_inicio AND p_data_fim
  ORDER BY t.data_transacao DESC
  LIMIT 10;
END$$

DELIMITER ;
document.getElementById("formCadastro").addEventListener("submit", function(e){
  e.preventDefault();

  let cpf = document.getElementById("cpf").value.trim();
  let dataNascimento = document.getElementById("dataNascimento").value;
  let telefone = document.getElementById("telefone").value.trim();

  let erroCpf = document.getElementById("erroCpf");
  let erroData = document.getElementById("erroData");
  let erroTelefone = document.getElementById("erroTelefone");
  let msgSucesso = document.getElementById("mensagemSucesso");

  erroCpf.textContent = "";
  erroData.textContent = "";
  erroTelefone.textContent = "";
  msgSucesso.textContent = "";

  let valido = true;

  // Validação de CPF (11 dígitos)
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) {
    erroCpf.textContent = "CPF deve conter 11 dígitos.";
    valido = false;
  }

  // Validação da Data de Nascimento
  if (!dataNascimento) {
    erroData.textContent = "Informe a data de nascimento.";
    valido = false;
  } else {
    let data = new Date(dataNascimento);
    let hoje = new Date();

    if (data >= hoje) {
      erroData.textContent = "Data de nascimento inválida.";
      valido = false;
    }
  }

  // Validação de Telefone (mínimo 10 dígitos)
  telefone = telefone.replace(/\D/g, "");
  if (telefone.length < 10 || telefone.length > 11) {
    erroTelefone.textContent = "Telefone inválido.";
    valido = false;
  }

  if (valido) {
    msgSucesso.textContent = "Cadastro realizado com sucesso!";
  }
});

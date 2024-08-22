const cep = document.querySelector("#cep");
const address = document.querySelector("#address");
const bairro = document.querySelector("#bairro");
const city = document.querySelector("#city");
const estado = document.querySelector("#estado");
const buscar = document.querySelector("#buscar");
const error = document.querySelector("#error");
const xhr = new XMLHttpRequest();

function completarEndereco(event) {
  //Pegar o valor do input do CEP
  if (cep.value.length < 8) {
    error.innerText = "Caracteres insuficientes para CEP";
    return;
  } else if (cep.value.length > 8) {
    error.innerText = "Número de caracteres excedido para CEP";
    return;
  }
  error.innerText = "";

  //Criar a URL para fazer a requisição
  let url = "https://viacep.com.br/ws/" + cep.value + "/json/";

  //Fazer a requisição para a ViaCEP utilizando a string da URL construída
  xhr.open("GET", url, true);

  //Preencher os campos do formulário - cidade, estado, rua e bairro.
  //Logradouro = address
  //bairro = bairro
  //localidade = city
  //uf = estado
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      //Fluxo de quando o CEP for inválido - não preencher os campos de rua, bairro, cidade, estado
      //Saber qual é o retorno de quando o CEP for inválido
      // {
      // "erro": "true"
      // }

      //Criar um argumento no "if" para quando o CEP for inválido
      if (data.erro == "true") {
        //Colocar uma mensagem de erro para CEP inválido
        error.innerText = "CEP inválido";
        //Condição de que os campos não serão preenchidos
        return;
      }
      address.value = data.logradouro;
      bairro.value = data.bairro;
      city.value = data.localidade;
      estado.value = data.uf;
    } else {
    }
  };

  //Limpar os campos quando o input CEP não constar nenhum valor

  //Tirar a habilitação de selecionar o campo que não pode ser editado

  xhr.onerror = function () {};

  xhr.send();
}

buscar.addEventListener("click", completarEndereco);

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
  cep;
  console.log(cep.value);

  if (cep.value.length < 8) {
    error.innerText = "Caracteres insuficientes";
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
      address.value = data.logradouro;
      bairro.value = data.bairro;
      city.value = data.localidade;
      estado.value = data.uf;
    } else {
    }
  };

  xhr.onerror = function () {};

  xhr.send();
}

buscar.addEventListener("click", completarEndereco);

const infoPersonagem = "https://rickandmortyapi.com/api/character";
const localizacao = "https://rickandmortyapi.com/api/location";
const episodios = "https://rickandmortyapi.com/api/episode";

const inputBusca = document.getElementById("input-busca");
const botaoBusca = document.getElementById("basic-addon2");
const paginacao = document.getElementById("paginacao");

let paginaAtual = 1;

function filtrarPersonagens(pagina, nome = "") {
  const url = `${infoPersonagem}?page=${pagina}&name=${nome}`;

  axios
    .get(url)
    .then(function (response) {
      const personagens = response.data.results;
      const informacoes = response.data.info;
      const listaPersonagens = document.getElementById("container-dos-cards");

      listaPersonagens.innerHTML = "";

      personagens.forEach(function (item, index) {
        const modalId = `staticBackdrop${index}`;
        listaPersonagens.innerHTML += ` 
        <div class="col-lg-3">
            <button class="card "data-bs-toggle="modal" data-bs-target="#${modalId}" >
              <img src="${item.image}"class="card-img-top;"style="height:200px">
            </button>
        </div>
        <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
           <div class="modal-content">
             <div class="modal-header">
               <h1 class="modal-title fs-5" id="staticBackdropLabel">Informações</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
             <p class="p-lista"><strong>Nome: </strong><strong style="color:rgb(21, 105, 21)">${item.name}</strong></p>
             <p class="p-lista"><strong>Gênero: </strong>${item.gender}</p>   
             <p class="p-lista"><strong>Status: </strong>${item.status}</p>
             <p class="p-lista"><strong>Espécie: </strong>${item.species}</p>
             <p class="p-lista"><strong>Origem: </strong>${item.origin.name}</p>
             <p class="p-lista"><strong>Localização: </strong>${item.location.name}</p>
             <p class="p-lista"><strong>Aparece em: </strong>${item.episode.length} episódios</p>
             </div>
           </div>
         </div>
       </div>
    `;
    
      });

      paginacao.innerHTML = "";

      if (informacoes.prev) {
        const botaoAnterior = document.createElement("button");
        botaoAnterior.textContent = "Anterior";
        botaoAnterior.classList.add("botaoPagina");
        botaoAnterior.addEventListener("click", function () {
          filtrarPersonagens(informacoes.prev.split("=")[1], nome);
        });
        paginacao.appendChild(botaoAnterior);
      }

      if (informacoes.next) {
        const botaoProximo = document.createElement("button");
        botaoProximo.textContent = "Próximo";
        botaoProximo.classList.add("botaoPagina");
        botaoProximo.addEventListener("click", function () {
          filtrarPersonagens(informacoes.next.split("=")[1], nome);
        });
        paginacao.appendChild(botaoProximo);
      }
    })
    .catch(function (erro) {
      erro.response;
    });
}

axios
  .get(localizacao)
  .then(function (response) {
    const informacoes = response.data.info;
    const totalLocalizacoes = document.getElementById("localizacoes");

    totalLocalizacoes.innerHTML = "";

    totalLocalizacoes.innerHTML += `     
    <div class="info-lista">
      <p class="p-lista"><strong>Localizações: </strong>${informacoes.count}</p>  
    </div> 
  `;
  })
  .catch(function (erro) {
    console.log(erro.response);
  });

axios
  .get(episodios)
  .then(function (response) {
    const episodios = response.data.info;
    const totalEpisodio = document.getElementById("episodios");

    totalEpisodio.innerHTML = "";

    totalEpisodio.innerHTML += `     
    <div class="info-lista">
      <p class="p-lista"><strong>Episódios: </strong>${episodios.count}</p>  
    </div> 
  `;
  })
  .catch(function (erro) {
    console.log(erro.response);
  });

axios
  .get(infoPersonagem)
  .then(function (response) {
    const infoPersonagem = response.data.info;
    const totalPersonagens = document.getElementById("personagens");

    totalPersonagens.innerHTML = "";

    totalPersonagens.innerHTML += `     
    <div class="info-lista">
      <p class="p-lista"><strong>Personagens: </strong>${infoPersonagem.count}</p>  
    </div> 
  `;
  })
  .catch(function (erro) {
    console.log(erro.response);
  });
botaoBusca.addEventListener("click", function () {
  const termoBusca = inputBusca.value;
  filtrarPersonagens(paginaAtual, termoBusca);
});
filtrarPersonagens(paginaAtual);

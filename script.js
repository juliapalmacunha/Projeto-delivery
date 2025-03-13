 const menu = document.getElementById("menu")
 const botaocarrinho = document.getElementById("botao-carrinho")//cart-btn
 const carrinho = document.getElementById("carrinho")//cart-modal
 const quantItensCarrinho = document.getElementById("quantid-itens-carrinho")//cart-count
 const itensCarrinho = document.getElementById("itens-carrinho") //cart-itens
 const precototal = document.getElementById("preço-total")//cart-total
 const endereco = document.getElementById("endereço")//adress
 const enderecoerrado = document.getElementById("endereço-errado")//adresswarn 
 const fecharcarrinho = document.getElementById("fechar-carrinho")//close-modal-btn
 const finalizarcarrinho = document.getElementById("finalizar-carrinho")//checkout-btn
 const caixadohorario = document.getElementById("caixadohorario")
 const rodapecarrinho = document.getElementById("rodape-carrinho")


//LISTA QUE VAI CONTER OS ITENS QUANDO O BOTAO DE COMPRA DE CADA ITEM FOR CLICADO
let listaCarrinho = []




//ABRINDO CARRINHO CASO CLIQUE EM QUALQUER LUGAR DO RODAPE OU EM UM FILHO DELE ( QUE NO CASO É O BOTÃO) ONDE ESTÁ O BOTÃO DO CARRINHO
rodapecarrinho.addEventListener("click",function(evento){

    let botaopai2 = evento.target.closest(".rodape");

    if(botaopai2){
        carrinho.style.display = "flex"
    }
})


//FECHANDO O CARRINHO ATRAVES DE UM CLIQUE FORA DELE 
carrinho.addEventListener("click", function(evento){
//recebe um evento

    if(evento.target === carrinho){
        carrinho.style.display = "none"
        //carrinho => seu estilo => caracterisica do estilo = a
    }    
})


//FECHAR O CARRINHO ATRAVES DO BOTAO FECHAR
fecharcarrinho.addEventListener("click", function(){
    carrinho.style.display = "none"
})


//MANIPULANDO O BOTÃO DE COMPRAR ITEM
menu.addEventListener("click", function(evento){
//console.log(evento.target) => evento.target serve para pegar exatamente o elemento que esta sendo clicado e mostrar no console

    let botaopai = evento.target.closest(".botao-comprar-item")
    //essa variavel ela esta aqui para termos acesso ao botao de compra do item
    //se voce quer olhar um evento classe tem que botar o . e se for id o #
    //criando uma variavel para quando o evento target do canto clicado for botao-comprar-item ou um filho dele, oq porporciona incluir um filho dele é o closets

    //SE O BOTÃO DE COMPRAR ITEM FOR CLICADO
    if(botaopai){ 
       //se voce clicar no botapai
       const nome = botaopai.getAttribute("data-name")
       //acessando o nome do item
       const preco = botaopai.getAttribute("data-price")
       // acessando o valor do item
       
       //CHAMANDO A FUNÇAO PARA ADICIONAR O ITEM CASO O BOTAO DE COMPRAR ITEM SEJA CLICADO
       adicionarCarrinho(nome, preco)

    }

})


//ADICIONANDO OS ITENS NO CARRINHO
function adicionarCarrinho(nome, preco){
    //recebe o nome e o preço como parametro para nao termos que criar as variaveis de novo aqui dentro, com eles prontos  para manipularmos aqui dentro
    //Função para adicionar no carrinho e colocarmos dentro no "se o botaopai for clicado, que é o botao-comprar-item"

    //VERIFICANDO SE O ITEM JA EXISTE
    const itemJaExiste = listaCarrinho.find(item => item.nome === nome)
    //o find vai percorrer toda a lista e o item e uma variavel criada dentro dele que vai ser cada item, e se dentro de cada item ele vai encontrar um nome igual ao nome que estamos recebendo

    //CASO ALGUM ITEM JA EXISTA, AUMENTAR A QUANTIDADE DELE AO INVES DE ADD MAIS UM IGUAL A ELE
    if(itemJaExiste){
        itemJaExiste.quantidade +=1;
    }else{
        //ACESSANDO A LISTA E ADD ITENS (PUSH=ADD)
        listaCarrinho.push({
        nome, //esse e o parametro que esta sendo recebido na função
        preco,
        quantidade:1
        })
    }
    atualizarcarrinho()
}


//FUNÇÃO PARA ATUALIZAR O CARRINHO CONFORME NOVOS INTENS SÃO ADICIONADOS
function atualizarcarrinho(){
    itensCarrinho.innerHTML = "";
    let total = 0;

    listaCarrinho.forEach(item => {
    //foreach é uma funçao para percorrer a lista e fazer alguma coisa
    //o "item" ali dentro é a criação de uma variavel, e ele se refere aos itens dentro do array que esta na variavel listaCarrinho
        const caixadoitem = document.createElement("div")
        //ESTA SENDO CRIADA UMA DIV PARA GUARDAR AS DIVS DOS ITENS, OU SEJA, UMA CAIXA ENORME QUE  VAI ARMAZENAR AS CAIXAS ITENS DENTRO DELA, UMA CAIXA COM CAIXAS DO HAMBURGUER DENTRO, ONDE CONTEM TODAS AS INFOS DO BURGUER

        caixadoitem.classList.add("flex", "justify-between", "mb-4", "flex-col")

        let trocatroca = '';
        if (item.quantidade > 1) {
            trocatroca = '<i class="fa-solid fa-minus"></i>';
        } else {
            trocatroca = '<i class="fa-solid fa-trash-can"></i>';
        }

        //CAIXA DO HAMBURGUER+INFORMSÇÕES
        caixadoitem.innerHTML = `
         <div class="flex items-center justify-between">

            <div>

              <p class="font-medium">${item.nome}</p>
              <p>Qtd: ${item.quantidade}</p>
              <p class="font-medium mt-2">R$ ${item.preco}</p>
            </div>

             <div>

              <div class= "flex space-x-4 justify-center items-center rounded hover:bg-[#e4e4e4] py-[1px] px-4 border border-slate-400" data-name="${item.nome}" 
              data-price="${item.preco}" >

               <button class= "removeritem">
               ${trocatroca}
               </button>

               <p> ${item.quantidade} </p>

               <button class= "adicionandoitem">
                 <i class="fa-solid fa-plus"></i>
               </button>
              </div>

            </div>

         </div>

        `
        total += item.preco * item.quantidade;

        itensCarrinho.appendChild(caixadoitem)
    })

    precototal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });
    //o textcontent é para adicionar um texto no espaçpo ja existente no html

    quantItensCarrinho.innerHTML = listaCarrinho.length;
}


//FUNÇÃO PARA REMOVER O ITEM DO CARRINHO E ADICIONAR TAMBEM
//entra dentro do carrinho que o removeritem esta, se clicar no evento onde a classe é removeritem, que é o botao entao faça algo
itensCarrinho.addEventListener("click", function (event){
    let botaoadicionando = event.target.closest(".adicionandoitem");
    let botaoremover = event.target.closest(".removeritem");
    if(botaoadicionando){
        const nomedoitem = botaoadicionando.closest("[data-name]").getAttribute("data-name")
        const preitem = botaoadicionando.closest("[data-price]").getAttribute("data-price")
        adicionarCarrinho(nomedoitem, preitem);
    }

    if(botaoremover){
        const nomeitem2 = botaoremover.closest("[data-name]").getAttribute("data-name")
        removeItemCarrinho(nomeitem2)
    }
})

//FUNÇÃO QUE REMOVE DE FATO O ITEM DO CARRINHO
function removeItemCarrinho(nomedoitem){
    const index = listaCarrinho.findIndex(item => item.nome === nomedoitem );
    //quando é -1 é pq nao encontrou o nome na lista, entao se for diferente do nao encontrado, que quer dizer que encontrou faça...
    if(index !== -1){
        const item = listaCarrinho[index];

        if(item.quantidade > 1){
            item.quantidade -= 1;
        }else{
            listaCarrinho.splice(index, 1);
        }
        atualizarcarrinho();
    }
}

//NAO MOSTRAR MENSAGEM DE ERRO CASO ELE ESTEJA DIGITANDO NO ENDEREÇO JA
endereco.addEventListener("input", function(event){
    let valorinput = event.target.value
    if(valorinput !== ""){
        endereco.classList.remove("border-red-500")
        enderecoerrado.classList.add("hidden")
    }
})


//FINALIZAR CARRINHO
//ALERT
//MOSTRAR QUANDO O ENDEREÇO NAO ESTIVER PREENCHIDO
finalizarcarrinho.addEventListener("click", function(){

    const aberto = restauranteaberto()
    if(!aberto){
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "#ef4444",
            },
        }).showToast(); //para exibir o toast

        return;
        
    }

    
    //CASO A LISTA DO CARRINHO ESTEJA VAZIA OU A CAIXA DE ENDEREÇO ESTIVER VAZIA
    if(listaCarrinho.length === 0 ) return;
    if(endereco.value === ""){
        enderecoerrado.classList.remove("hidden");
        endereco.classList.add("border-red-500")
    }else{

        //ENVIAR PEDIDO PARA APO WHATS
     const pedido = listaCarrinho.map((item) => {
        return(
         `${item.nome} \n Quantidade: ${item.quantidade} \n Preço: ${item.preco} | \n`
        )
     }).join("")

     const mensagem = encodeURIComponent(pedido)
     const telefone = "998890088"

     window.open(`https://wa.me/${telefone}?text=${mensagem} Endereço: ${endereco.value}`, "_blank")
     //blank serve para abrir em uma nova aba

     //LIMPAR CARRINHO POS FINALIZAÇÃO
     listaCarrinho = [];
     atualizarcarrinho();

    }

    
})


//FUNÇÃO VALIDANDO SE O RESTAURANTE ESTÁ ABERTO
function restauranteaberto(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22 //se retornar isso, ira retornar true 
}

//MUDANDO A COR DA CAIXA DO HORARIO
const estaaberto = restauranteaberto();
if(estaaberto){
    caixadohorario.classList.remove("bg-red-500");
    caixadohorario.classList.add("bg-green-600");
}else{
    caixadohorario.classList.remove("bg-green-600");
    caixadohorario.classList.add("bg-red-500");
}


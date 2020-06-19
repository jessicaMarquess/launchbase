//criando objeto:
const empresa = {
    nome: "Rocketseat",
    cor: "Roxo",
    foco: "Programação",
    endereço: {
        rua: "Rua Guilherme Gembala",
        num: 260
    }
};
//mostrando os dados:
console.log (`A empresa ${empresa.nome} está localizada em ${empresa.endereço.rua}, ${empresa.endereço.num}.`);
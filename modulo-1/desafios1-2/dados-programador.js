//criando objeto:

const programador = {
    nome: "Jessica",
    idade: 22,
    tecnologia: [
        {
        nome: 'C',
        especialidade: 'Desktop',
       },
       {
        nome: 'Python',
        especialidade: 'Data Science'
       }
    ]
};
console.log (`A usuária ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologia[0].nome} com especialidade em ${programador.tecnologia[0].especialidade}.`);
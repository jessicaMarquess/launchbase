//chamando o objeto usuarios:
const usuarios = [
    {
        nome: 'Jessica',
        tecnologias: ["HTML", "CSS", "Javascript", "Python", "C"]
    },
    {
        nome: 'Italo',
        tecnologias: ['Python']
    },
    {
        nome: 'Izidorio',
        tecnologias: ['Java', 'Javascript', 'Python', 'CSS']
    },
    {
        nome: 'Lucicreuda',
        tecnologias: ['Java', 'C', 'C#']
    }
]
//criando a estrutura de repetição:
function mostrarEmTela(nome, tecnologia){
    for (let i = 0; i < usuarios.length; i++){
        console.log (`${usuarios[i].nome}, tecnologias: ${usuarios[i].tecnologias.join(', ')}.`);
    }
}
mostrarEmTela();
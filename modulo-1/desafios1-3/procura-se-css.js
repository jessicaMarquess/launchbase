//chamando o objeto usuarios:
const usuarios = [
    {
        nome: 'Jessica',
        tecnologias: ["HTML", "CSS", "Javascript", "Python", "C"]
    },
    {
        nome: 'Italo',
        tecnologias: ['Python'],
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

function checkUsersForCSS (usuario){
    for (let tecnologia of usuario.tecnologias){
        if (tecnologia == 'CSS'){
            return true;
        }else {}
    }   
}

for (let i = 0; i < usuarios.length; i++) {
    const usuarioTrabalhaComCSS = checkUsersForCSS(usuarios[i]);
  
    if (usuarioTrabalhaComCSS) {
      console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
    }
  } 
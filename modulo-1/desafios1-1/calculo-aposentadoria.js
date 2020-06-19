//CALCULANDO UMA APOSENTADORIA FICTICIA
//iniciando as variaveis:
const nome = 'Jessica';
const sexo = 'F';
const idade = 22;
const contribuicao = 0;

// soma idade+contribuição:

somaIdaCont = idade + contribuicao;

//condicionais para o sexo masculino:
if ( sexo === 'M'){
    if (contribuicao >= 35 && somaIdaCont >= 95){
        console.log (`${nome}, você pode se aposentar.`);
    }else{
        console.log (`${nome}, você não pode se aposentar.`);
    }
}else{
    //condicionais para o sexo feminino:
    if (sexo === 'F'){
        if (contribuicao >= 35 && somaIdaCont >= 85){
            console.log (`${nome}, você pode se aposentar.`);
        }else{
            console.log (`${nome}, você não pode se aposentar.`);
        }
    }
}
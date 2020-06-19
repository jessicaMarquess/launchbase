// CALCULANDO O IMC
//iniciando variaveis:
const nome = "Carlos";
const peso = 150;
const altura = 1.88;

//criando uma variavel para o calculo do imc:
const imc = peso/(altura*altura);

//aplicando condicionais:
if (imc >= 30){
    console.log (`${nome}, você está acima do peso`);
}else {
    console.log (`${nome}, você não está acima do peso.`);
}
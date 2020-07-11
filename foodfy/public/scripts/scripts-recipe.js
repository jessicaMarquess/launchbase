const show = document.querySelector('.container .hide_show p');
const cardRecipe = document.querySelectorAll('.container .item_info');

for (let i = 0; i < cardRecipe.length; i++){
    show[i].addEventListener('click', () => {
        if (show.innerHTML == "ESCONDER"){
            show.innerHTML = "MOSTRAR";    
        }else{
            show.innerHTML = "ESCONDER";
        }    
        cardRecipe.classList.toggle('active');
});
}
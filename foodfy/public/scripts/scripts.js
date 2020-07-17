const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', function() {
        window.location.href = `/recipe/${i}`;
    });
}

const infoRecipes = document.querySelectorAll('.item_info');
const hideShow = document.querySelectorAll('a .hide_show');

for (let i = 0; i < hideShow.length; i++){
    hideShow[i].addEventListener('click', () => {
        if (hideShow[i].innerHTML == 'ESCONDER'){
            infoRecipes[i].classList.add('hidden');
            hideShow[i].innerHTML = "MOSTRAR";
        } else {
            infoRecipes.classList.remove('hidden');
            hideShow.textContent = "ESCONDER";
        }
    });
}
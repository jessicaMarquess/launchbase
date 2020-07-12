const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', function() {
        window.location.href = `/recipe/${i}`;
    });
}

const infoRecipes = document.querySelectorAll ('.info_container');

for (let info of infoRecipes){
    const visible = info.querySelector ('visible');
    const hideShow = info.querySelector ('hide_show');

    showHide.addEventListener('click', () => {
        if ( visible.classList.contains ('visible')){
            visible.classList.add ('hidden');
            visible.classList.remove ('visible');
            hideShow.textContent = "MOSTRAR";
        } else {
            visible.classList.add ('visible');
            visible.classList.remove ('hidden');
            hideShow.textContent = "ESCONDER";
        }
    });
}
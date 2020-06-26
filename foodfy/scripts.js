const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener('click', function(){
        const imageId = card.getAttribute("id");
        const title = card.children[1].textContent;
        const author = card.children[2].textContent;

        modalOverlay.classList.add('active');

        modalOverlay.querySelector('img').src = `assets/${imageId}.png`;
        modalOverlay.querySelector('h3').textContent = title;
        modalOverlay.querySelector('p').textContent = author;
     });
};

document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove("active")
});

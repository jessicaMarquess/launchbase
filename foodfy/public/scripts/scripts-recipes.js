const cards = document.querySelectorAll('.card');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', function() {
        window.location.href = `/recipe/${i}`;
});
}


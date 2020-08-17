const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for(item of menuItems){
    if (currentPage.includes(item.getAttribute('href'))){
        item.classList.add("active");
    }
}

//paginacao
//totalPages = 20
//selectedPage = 15
// [ 1, ..., 13, 14, 15, 16, 17, ..., 20]

let totalPages = 20,
    selectedPage = 6,
    pages = [],
    oldPage;

for (let currentPage = 1; currentPage <= totalPages; currentPage++){

    const firstAndLastPages = currentPage == 1 || currentPage == totalPages;
    const pageAfterSelectedPages = currentPage <= selectedPage + 2; 
    const pageBeforeSelectedPages =  currentPage >= selectedPage - 2; 
    
    if( firstAndLastPages || pageBeforeSelectedPages && pageAfterSelectedPages){
        if(oldPage && currentPage - oldPage > 2){
            pages.push("...");
        }
        if(oldPage && currentPage - oldPage == 2){
            pages.push(currentPage - 1);
        }

        pages.push(currentPage);
        oldPage = currentPage;
    }
}

console.log(pages);

const $ = document.querySelectorAll



const pages = document.querySelectorAll('.page')

function handleClick(currentPage){
  currentPage.style.zIndex = 1
  currentPage.classList.toggle('is-visible')
}

pagesLength =  pages.length

pages[0].classList.toggle('is-visible')

for(let p = 0; p < pagesLength-1; p++ ){
  const prevPage = pages[p -1]
  const currentPage = pages[p]
  const nextPage = pages[p +1]


  nextPageButton = currentPage.querySelector(".button__next")
  prevPageButton = currentPage.querySelector(".button__prev")

  if(p == 0){
    prevPageButton.classList.toggle("fade-in-element")
  }

  nextPageButton.addEventListener("click", (e)=> {
    console.log("clicked")
    currentPage.classList.toggle('is-visible'); 
    nextPage.classList.toggle('is-visible');
  })

  prevPageButton.addEventListener("click", (e) => {
    currentPage.classList.toggle('is-visible'); 
    prevPage.classList.toggle('is-visible');
  })


}


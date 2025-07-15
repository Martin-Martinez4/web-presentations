
const pages = document.querySelectorAll('.page')
const pagesLength =  pages.length

class CurrentPageMediator{
  constructor(pages, currentPage = 0){

    this.pages = pages
    this.currentPage = currentPage
  }

  setCurrentPage(number){
    
    if(number > pagesLength-1){
      return
    }
    if(number < 0){
      return
    }
    const lastPage = this.currentPage
    this.currentPage = number
    pages[lastPage].classList.toggle('is-visible');
    pages[this.currentPage].classList.toggle('is-visible');
  }
}

const currentPageMediator = new CurrentPageMediator(pages, 0)

function handleClick(currentPage){
  currentPage.style.zIndex = 1
  currentPage.classList.toggle('is-visible')
}

pages[0].classList.toggle('is-visible')

for(let p = 0; p < pagesLength; p++ ){
  const currentPage = pages[p]


  const nextPageButton = currentPage.querySelector(".button__next")
  const prevPageButton = currentPage.querySelector(".button__prev")

  if(p == 0){
    prevPageButton.classList.toggle("opacity-0")
    prevPageButton.classList.toggle("pointer-events-none")

  }

  if(p == pagesLength-1){
    nextPageButton.classList.toggle("fade-in-element")

  }

  nextPageButton.addEventListener("click", (e)=> {
    currentPageMediator.setCurrentPage(p+1)
  })

  prevPageButton.addEventListener("click", (e) => {
    currentPageMediator.setCurrentPage(p-1)
  })

}

document.addEventListener("keyup", (e)=>{
  if(e.code == "Space"){
    e.preventDefault()
    currentPageMediator.setCurrentPage(currentPageMediator.currentPage+1)
  }
})


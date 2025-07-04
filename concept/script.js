
const pages = document.querySelectorAll('.page')
const pagesLength =  pages.length

class CurrentPageMediator{
  constructor(pages, currentPage = 0){

    this.pages = pages
    this.currentPage = currentPage
  }

  setCurrentPage(number){
    const lastPage = this.currentPage
    this.currentPage = number

    console.log(lastPage)
    console.log(this.currentPage)

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

for(let p = 0; p < pagesLength-1; p++ ){
  const currentPage = pages[p]


  const nextPageButton = currentPage.querySelector(".button__next")
  const prevPageButton = currentPage.querySelector(".button__prev")

  if(p == 0){
    prevPageButton.classList.toggle("fade-in-element")
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


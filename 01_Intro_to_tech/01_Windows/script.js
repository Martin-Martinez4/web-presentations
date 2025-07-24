
class PresentationPage extends HTMLElement {
  constructor() {
    super();
    
  }
}

class PrevNextButtons extends HTMLElement {
  constructor() {
    super();

    this.classList.add("buttons")
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
    <style>
      .button{
        padding: .5rem 1rem;
        text-align: center;
        border-radius: 5px;
        opacity: .8;
        background: inherit;
        width: 4rem;
        height: 2rem;
        line-height: 2rem;
        color: white;
        border: 1px solid whitesmoke;
        box-shadow: black 1px 1px 2px;
        cursor: pointer;

      }

      .button__prev{
        margin-left: 1rem;
      }

      .button__next{
        margin-right: 1rem;
      }

      .opacity-0 {
        opacity: 0;
      }

      .pointer-events-none {
        pointer-events: none;
      }
      .fade-in-element {
        opacity: 0;
        display: none;
        transition: opacity .5s ease-in-out; /* Defines the transition effect */
        pointer-events: none
      }
    </style>
      <div class="button button__prev">prev</div>
      <div class="button button__next">next</div>
    `
  }
}

class CurrentPageMediator {
  constructor(pages, currentPage = 0) {

    this.pages = pages
    this.currentPage = currentPage
  }

  setCurrentPage(number) {

    if (number > pagesLength - 1) {
      return
    }
    if (number < 0) {
      return
    }
    const lastPage = this.currentPage
    this.currentPage = number
    pages[lastPage].classList.toggle('is-visible');
    pages[this.currentPage].classList.toggle('is-visible');
  }
}

customElements.define("presentation-page", PresentationPage)
customElements.define("prev-next-buttons", PrevNextButtons)

const pages = document.querySelectorAll('presentation-page')
const pagesLength = pages.length


const currentPageMediator = new CurrentPageMediator(pages, 0)

function handleClick(currentPage) {
  currentPage.style.zIndex = 1
  currentPage.classList.toggle('is-visible')
}

pages[0].classList.toggle('is-visible')


for (let p = 0; p < pagesLength; p++) {
  const currentPage = pages[p]

  const buttons = currentPage.querySelector(".buttons")
  const nextPageButton = buttons.shadowRoot.querySelector(".button__next")
  const prevPageButton = buttons.shadowRoot.querySelector(".button__prev")

  if (p == 0) {
    prevPageButton.classList.toggle("opacity-0")
    prevPageButton.classList.toggle("pointer-events-none")
  }

  if (p == pagesLength - 1) {
    nextPageButton.classList.toggle("fade-in-element")
    nextPageButton.classList.toggle("opacity-0")
    nextPageButton.classList.toggle("pointer-events-none")

  }

  nextPageButton.addEventListener("click", (e) => {
    currentPageMediator.setCurrentPage(p + 1)
  })

  prevPageButton.addEventListener("click", (e) => {
    currentPageMediator.setCurrentPage(p - 1)
  })

}

document.addEventListener("keyup", (e) => {
  if (e.code == "Space") {
    e.preventDefault()
    currentPageMediator.setCurrentPage(currentPageMediator.currentPage + 1)
  }
})


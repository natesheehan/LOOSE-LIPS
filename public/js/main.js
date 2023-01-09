import '../design/style.css'

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("../data/data.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const img = card.querySelector("[data-img]")
      const text = card.querySelector("[data-text]")

      header.textContent = user.name
      body.textContent = user.date
      img.src = user.img
      text.textContent = user.text


      userCardContainer.append(card)
      
      return {
        name: user.name,
        email: user.date,
        text: user.text,
        element: card
      }
    })
  })


function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

waitForElm('#btn').then((elm) => {

  let moreText = document.querySelector(".text")
  let btn = document.querySelector('#btn');

  btn.addEventListener('click', function () {
    if (moreText.style.display === 'none') {
      moreText.style.display = 'block';
      btn.textContent = 'Read less';
    } else {
      moreText.style.display = 'none';
      btn.textContent = 'Read more';
    }
  });
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

let video = document.getElementById("video")
let playButton = document.querySelector("play-button")

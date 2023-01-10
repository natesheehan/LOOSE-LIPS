import '../design/style.css'

// const searchInput = document.querySelector("[data-search]")

let users = []

// searchInput.addEventListener("input", e => {
//   const value = e.target.value.toLowerCase()
//   users.forEach(user => {
//     const isVisible =
//       user.name.toLowerCase().includes(value) ||
//       user.email.toLowerCase().includes(value)
//     user.element.classList.toggle("hide", !isVisible)
//   })
// })

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")

fetch("../data/data.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const img = card.querySelector("[data-img]")
      const text = card.querySelector("[data-text]")
      const label = card.querySelector("[data-label]")

      header.textContent = user.name
      body.textContent = user.date
      img.src = user.img
      text.textContent = user.text
      label.textContent = user.labels


      userCardContainer.append(card)

      return {
        name: user.name,
        email: user.date,
        text: user.text,
        label: user.labels,
        element: card
      }
    })
  })


const eventCardTemplate = document.querySelector("[data-events-template")
const eventCardContainer = document.querySelector("[data-event-cards-container]")

fetch("../data/events.json")
  .then(res => res.json())
  .then(events => {
    events = events.map(event => {
      const event_card = eventCardTemplate.content.cloneNode(true).children[0]
      
      const e_name = event_card.querySelector("[data-eventname]")
      const e_date = event_card.querySelector("[data-eventdate]")
      const e_artist = event_card.querySelector("[data-eventartist]")
      const e_location = event_card.querySelector("[data-eventlocation]")
      const e_img = event_card.querySelector("[data-eventimg]")

      e_name.textContent = event.name
      e_date.textContent = event.date
      e_artist.textContent = event.artists
      e_location.textContent = event.location
      e_img.src = event.img


      eventCardContainer.append(event_card)

      return {
        name: event.name,
        date: event.date,
        artists: event.artists,
        location: event.location,
        element: event_card
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
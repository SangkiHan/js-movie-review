import { starMessage } from "../domain/StarMessage";
import { starImage } from "../Image";

export function openModal(movieInstance) {
  const body = document.body;
  const div = document.createElement("div");
  div.classList.add("modal-background");
  div.classList.add("active");
  div.id = "modalBackground";

  const starImagePath =
    movieInstance.voteAverage === "0.0"
      ? starImage["empty"]
      : starImage["filled"];

  div.innerHTML = /*html*/ `
    <div class="modal">
        <button class="close-modal" id="closeModal">
            <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
            <div class="modal-image">
            <img
                class="thumbnail"
                src=${movieInstance.posterPath}
                alt=${movieInstance.title}
            />
            </div>
            <div class="modal-description">
            <h2>${movieInstance.title}</h2>
            <p class="category">
            </p>
            <p class="rate">
                <img src="${starImagePath}" class="star" /><span
                    >${movieInstance.voteAverage}</span
                >
            </p>
            <hr />
            <h3>내 평점</h3>
            <div class="my-rating">${renderStars(movieInstance.myVote)}</div>
            <hr />
            <h3>줄거리</h3>
            <p class="detail">
                ${movieInstance.overView}
            </p>
            </div>
        </div>
    </div>
    `;

  body.appendChild(div);
  clickCloseModal();
  clickStar(movieInstance);
}

function clickCloseModal() {
  const closeButton = document.querySelector(".close-modal");
  closeButton.addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  const div = document.querySelector(".modal-background");
  div.remove();
}

function renderStars(rate) {
  return (
    Array.from({ length: 5 }, (_, index) => {
      return `<img src="${
        index < rate ? starImage["filled"] : starImage["empty"]
      }" class="star" 
    data-index="${index}"/>`;
    }).join("") + starMessage[rate]
  );
}

function clickStar(movieInstance) {
  const starElements = document.querySelectorAll(".my-rating .star");
  starElements.forEach((star) => {
    star.addEventListener("click", (event) => {
      const clickedIndex = event.target.dataset.index;
      const newRate = parseInt(clickedIndex) + 1;
      movieInstance.updateMyVote(newRate);
      updateRating(newRate, movieInstance);
    });
  });
}

function updateRating(newRate, movieInstance) {
  const myRatingContainer = document.querySelector(".my-rating");
  myRatingContainer.innerHTML = renderStars(newRate);
  clickStar(movieInstance);
}

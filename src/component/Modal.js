export function openModal(movieInstance) {
  const body = document.body;
  const div = document.createElement("div");
  div.classList.add("modal-background");
  div.id.add("modalBackground");

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
            <p class="detail">
                ${movieInstance.overview}
            </p>
            </div>
        </div>
    </div>
    `;

  body.appendChild(div);
}

export function closeModal() {}

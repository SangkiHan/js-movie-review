export function initIndicator() {
  const movieSection = document.querySelector(".movie-list");

  const div = document.createElement("div");
  div.id = "loading";
  div.style = "display: none;";
  div.innerHTML = /*html*/ `
        Loading...
    `;
  movieSection.appendChild(div);
}

export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block";
}

export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "none";
}

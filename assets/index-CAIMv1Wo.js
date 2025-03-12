var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _id, _posterPath, _title, _voteAverage, _MovieModel_instances, formatToTwoDecimals_fn, _totalPages, _totalResults, _page, _movieModels, _includeAdult, _includeVideo, _page2, _sortBy, _page3, _movieApiQuery, _Main_instances, enrollClickEvent_fn, clickMoreButton_fn;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const _MovieModel = class _MovieModel {
  constructor(result) {
    __privateAdd(this, _MovieModel_instances);
    __privateAdd(this, _id);
    __privateAdd(this, _posterPath);
    __privateAdd(this, _title);
    __privateAdd(this, _voteAverage);
    __privateSet(this, _id, result.id);
    __privateSet(this, _posterPath, _MovieModel.IMAGE_URL + result.poster_path);
    __privateSet(this, _title, result.title);
    __privateSet(this, _voteAverage, __privateMethod(this, _MovieModel_instances, formatToTwoDecimals_fn).call(this, result.vote_average));
  }
  get id() {
    return __privateGet(this, _id);
  }
  get posterPath() {
    return __privateGet(this, _posterPath);
  }
  get title() {
    return __privateGet(this, _title);
  }
  get voteAverage() {
    return __privateGet(this, _voteAverage);
  }
};
_id = new WeakMap();
_posterPath = new WeakMap();
_title = new WeakMap();
_voteAverage = new WeakMap();
_MovieModel_instances = new WeakSet();
formatToTwoDecimals_fn = function(voteAverage) {
  return Number(voteAverage).toFixed(1);
};
__publicField(_MovieModel, "IMAGE_URL", "https://image.tmdb.org/t/p/w440_and_h660_face");
let MovieModel = _MovieModel;
class MovieListModel {
  constructor(response) {
    __privateAdd(this, _totalPages);
    __privateAdd(this, _totalResults);
    __privateAdd(this, _page);
    __privateAdd(this, _movieModels);
    console.log(response);
    __privateSet(this, _page, response.page);
    __privateSet(this, _totalPages, response.total_results);
    __privateSet(this, _totalPages, response.total_pages);
    __privateSet(this, _movieModels, []);
    response.results.forEach((result) => {
      __privateGet(this, _movieModels).push(new MovieModel(result));
    });
  }
  get totalResults() {
    return __privateGet(this, _totalResults);
  }
  get movieModels() {
    return __privateGet(this, _movieModels);
  }
  get page() {
    return __privateGet(this, _page);
  }
  isLastPage() {
    return __privateGet(this, _totalResults) === __privateGet(this, _page);
  }
}
_totalPages = new WeakMap();
_totalResults = new WeakMap();
_page = new WeakMap();
_movieModels = new WeakMap();
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
async function movieApiCall(movieApiQuery) {
  const apiUrl = `${BASE_URL}?${movieApiQuery.toQueryString()}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjE4ODViMmQwZmI1Njk0ZTg3NGM3OGQ1MzdlODUxNiIsIm5iZiI6MTc0MTU4MjI1NS42NDQsInN1YiI6IjY3Y2U2ZmFmZmYxYTg0MGI5OTExMGYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fu87SnyDcUukl3Bb0gHSBiJ43DQ_OuyjpRK28jqs_iU"}`
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return new MovieListModel(await response.json());
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
const starImage = {
  filled: "star_filled.png",
  empty: "star_empty.png"
};
function initMovieRender(movieListInstance, title) {
  const movieSection = document.querySelector(".movie-list");
  movieSection.innerHTML = "";
  movieSection.appendChild(createTitle(title));
  const fragment = document.createDocumentFragment();
  const movieUl = document.createElement("ul");
  movieUl.classList.add("thumbnail-list");
  movieListRender(movieUl, movieListInstance);
  fragment.appendChild(movieUl);
  movieSection.appendChild(fragment);
}
function addMovieRender(movieListInstance) {
  const movieUl = document.querySelector(".thumbnail-list");
  movieListRender(movieUl, movieListInstance);
}
function movieListRender(movieUl, movieListInstance) {
  const fragment = document.createDocumentFragment();
  movieListInstance.movieModels.forEach((movieInstance) => {
    const movieElement = createMovie(movieInstance);
    fragment.appendChild(movieElement);
  });
  movieUl.appendChild(fragment);
}
function createTitle(title) {
  const item = document.createElement("h2");
  item.innerHTML = /*html*/
  `
        ${title}
    `;
  return item;
}
function createMovie(movieInstance) {
  const item = document.createElement("li");
  const starImagePath = movieInstance.voteAverage === "0.0" ? starImage["empty"] : starImage["filled"];
  item.innerHTML = /*html*/
  `
    <div class="item">
        <img
            class="thumbnail"
            src=${movieInstance.posterPath}
            alt=${movieInstance.title}
        />
        <div class="item-desc">
            <p class="rate">
            <img src="${starImagePath}" class="star" /><span
                >${movieInstance.voteAverage}</span
            >
            </p>
            <strong>${movieInstance.title}</strong>
        </div>
    </div>
    `;
  return item;
}
class MovieApiQuery {
  constructor(includeAdult, includeVideo, page, sortBy) {
    __privateAdd(this, _includeAdult);
    __privateAdd(this, _includeVideo);
    __privateAdd(this, _page2);
    __privateAdd(this, _sortBy);
    __privateSet(this, _includeAdult, includeAdult);
    __privateSet(this, _includeVideo, includeVideo);
    __privateSet(this, _page2, page);
    __privateSet(this, _sortBy, sortBy);
  }
  toQueryString() {
    return `include_adult=${__privateGet(this, _includeAdult)}&include_video=${__privateGet(this, _includeVideo)}&page=${__privateGet(this, _page2)}&sort_by=${__privateGet(this, _sortBy)}`;
  }
  nextPage() {
    __privateSet(this, _page2, __privateGet(this, _page2) + 1);
  }
}
_includeAdult = new WeakMap();
_includeVideo = new WeakMap();
_page2 = new WeakMap();
_sortBy = new WeakMap();
class Main {
  constructor() {
    __privateAdd(this, _Main_instances);
    __privateAdd(this, _page3);
    __privateAdd(this, _movieApiQuery);
  }
  async init() {
    addEventListener("load", async () => {
      __privateMethod(this, _Main_instances, enrollClickEvent_fn).call(this);
      __privateSet(this, _movieApiQuery, new MovieApiQuery(
        false,
        false,
        1,
        "popularity.desc"
      ));
      const movieListInstance = await movieApiCall(__privateGet(this, _movieApiQuery));
      __privateSet(this, _page3, movieListInstance.page);
      initMovieRender(movieListInstance, "지금 인기있는 영화 ");
    });
  }
}
_page3 = new WeakMap();
_movieApiQuery = new WeakMap();
_Main_instances = new WeakSet();
enrollClickEvent_fn = function() {
  __privateMethod(this, _Main_instances, clickMoreButton_fn).call(this);
};
clickMoreButton_fn = function() {
  document.querySelector(".more-btn").addEventListener("click", async () => {
    __privateGet(this, _movieApiQuery).nextPage();
    const movieListInstance = await movieApiCall(__privateGet(this, _movieApiQuery));
    __privateSet(this, _page3, movieListInstance.page);
    addMovieRender(movieListInstance);
    if (movieListInstance.isLastPage()) {
      document.querySelector(".more-btn").classList.add("none");
    }
  });
};
const main = new Main();
main.init();

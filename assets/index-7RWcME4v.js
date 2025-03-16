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
var _id, _posterPath, _title, _voteAverage, _backdropPath, _MovieModel_instances, formatToTwoDecimals_fn, _totalPages, _totalResults, _page, _movieModels, _apiUrl, _includeAdult, _page2, _includeVideo, _sortBy, _name, _url, _selected, _tabs, _TabListModel_instances, initData_fn, _keyword, _page3, _movieApiQuery, _Main_instances, enrollClickEvent_fn, clickMoreButton_fn, clickSearchButton_fn, searchMovie_fn, nextPage_fn, initPage_fn;
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
    __privateAdd(this, _backdropPath);
    __privateSet(this, _id, result.id);
    __privateSet(this, _posterPath, _MovieModel.POSTER_URL + result.poster_path);
    __privateSet(this, _title, result.title);
    __privateSet(this, _voteAverage, __privateMethod(this, _MovieModel_instances, formatToTwoDecimals_fn).call(this, result.vote_average));
    __privateSet(this, _backdropPath, _MovieModel.BACKDROP_IMAGE_URL + result.backdrop_path);
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
  get backdropPath() {
    return __privateGet(this, _backdropPath);
  }
};
_id = new WeakMap();
_posterPath = new WeakMap();
_title = new WeakMap();
_voteAverage = new WeakMap();
_backdropPath = new WeakMap();
_MovieModel_instances = new WeakSet();
formatToTwoDecimals_fn = function(voteAverage) {
  return Number(voteAverage).toFixed(1);
};
__publicField(_MovieModel, "POSTER_URL", "https://image.tmdb.org/t/p/w440_and_h660_face");
__publicField(_MovieModel, "BACKDROP_IMAGE_URL", "https://media.themoviedb.org/t/p/w1920_and_h1080_face");
let MovieModel = _MovieModel;
const FIRST_INDEX = 0;
class MovieListModel {
  constructor(response) {
    __privateAdd(this, _totalPages);
    __privateAdd(this, _totalResults);
    __privateAdd(this, _page);
    __privateAdd(this, _movieModels);
    __privateSet(this, _page, response.page);
    __privateSet(this, _totalResults, response.total_results);
    __privateSet(this, _totalPages, response.total_pages);
    __privateSet(this, _movieModels, []);
    __privateSet(this, _movieModels, response.results.map(
      (result) => new MovieModel(result)
    ));
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
  get firstMovie() {
    return __privateGet(this, _movieModels)[FIRST_INDEX];
  }
  isLastPage() {
    return __privateGet(this, _totalPages) === __privateGet(this, _page);
  }
}
_totalPages = new WeakMap();
_totalResults = new WeakMap();
_page = new WeakMap();
_movieModels = new WeakMap();
const movieApi = "https://api.themoviedb.org/3";
const getMoviePopularApiUrl = movieApi + "/discover/movie";
const getMovieSearchKeyowrdApiUrl = movieApi + "/search/movie";
const movieApiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjE4ODViMmQwZmI1Njk0ZTg3NGM3OGQ1MzdlODUxNiIsIm5iZiI6MTc0MTU4MjI1NS42NDQsInN1YiI6IjY3Y2U2ZmFmZmYxYTg0MGI5OTExMGYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fu87SnyDcUukl3Bb0gHSBiJ43DQ_OuyjpRK28jqs_iU";
async function getMovie(movieApiQuery) {
  const apiUrl = `${movieApiQuery.apiUrl}?${movieApiQuery.toQueryString()}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + movieApiKey
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
  if (!movieListInstance.isLastPage()) {
    movieSection.appendChild(createMoreButton());
  }
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
function createMoreButton() {
  const div = document.createElement("div");
  div.innerHTML = /*html*/
  `
    <button class="more-btn">더보기</button>
  `;
  return div;
}
class MovieApiQuery {
  constructor(request) {
    __privateAdd(this, _apiUrl);
    __privateAdd(this, _includeAdult);
    __privateAdd(this, _page2);
    __privateSet(this, _apiUrl, this.getApiUrl());
    __privateSet(this, _includeAdult, request.includeAdult);
    __privateSet(this, _page2, request.page);
  }
  get apiUrl() {
    return __privateGet(this, _apiUrl);
  }
  get page() {
    return __privateGet(this, _page2);
  }
  get includeAdult() {
    return __privateGet(this, _includeAdult);
  }
  updatePage(page) {
    __privateSet(this, _page2, page);
  }
  toQueryString() {
    throw new Error(
      "toQueryString() 메소드는 자식 클래스에서 구현되어야 합니다."
    );
  }
  getApiUrl() {
    throw new Error("getApiUrl() 메소드는 자식 클래스에서 구현되어야 합니다.");
  }
}
_apiUrl = new WeakMap();
_includeAdult = new WeakMap();
_page2 = new WeakMap();
class MoviePopularApiQuery extends MovieApiQuery {
  constructor(request) {
    super(request);
    __privateAdd(this, _includeVideo);
    __privateAdd(this, _sortBy);
    __privateSet(this, _includeVideo, request.includeVideo);
    __privateSet(this, _sortBy, request.sortBy);
  }
  getApiUrl() {
    return getMoviePopularApiUrl;
  }
  toQueryString() {
    return `include_adult=${this.includeAdult}&include_video=${__privateGet(this, _includeVideo)}&language=ko-KR&page=${this.page}&sort_by=${__privateGet(this, _sortBy)}`;
  }
}
_includeVideo = new WeakMap();
_sortBy = new WeakMap();
function initHeader(movieInstance) {
  const header = document.querySelector("header");
  const starImagePath = movieInstance.voteAverage === "0.0" ? starImage["empty"] : starImage["filled"];
  header.innerHTML = /*html*/
  `
    <div class="background-container" style="background-image: url('${movieInstance.backdropPath}'); background-size: cover; background-position: center;">
        <div class="overlay" aria-hidden="true"></div>
            <div class="top-rated-container">
                <div class="header-bar">
                    <h1 class="logo">
                        <img src="logo.png" alt="MovieList" />
                    </h1>
                    <div class="search-container">
                    <input
                        class="search-input"
                        type="search"
                        placeholder="검색어를 입력하세요."
                    />
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
                    </svg>
                    </div>
                </div>
                
                <div class="top-rated-movie">
                <div class="rate">
                    <img src="${starImagePath}" class="star" />
                    <span class="rate-value">${movieInstance.voteAverage}</span>
                </div>
                <div class="title">${movieInstance.title}</div>
                <button class="primary detail">자세히 보기</button>
            </div>
        </div>s
    </div>
  `;
}
class TabModel {
  constructor(request) {
    __privateAdd(this, _name);
    __privateAdd(this, _url);
    __privateAdd(this, _selected);
    __privateSet(this, _name, request.name);
    __privateSet(this, _url, request.url);
    __privateSet(this, _selected, request.selected);
  }
  get name() {
    return __privateGet(this, _name);
  }
  get url() {
    return __privateGet(this, _url);
  }
  get selected() {
    return __privateGet(this, _selected);
  }
}
_name = new WeakMap();
_url = new WeakMap();
_selected = new WeakMap();
class TabListModel {
  constructor() {
    __privateAdd(this, _TabListModel_instances);
    __privateAdd(this, _tabs);
    __privateMethod(this, _TabListModel_instances, initData_fn).call(this);
  }
  get tabs() {
    return __privateGet(this, _tabs);
  }
}
_tabs = new WeakMap();
_TabListModel_instances = new WeakSet();
initData_fn = function() {
  __privateSet(this, _tabs, [
    new TabModel({
      url: "#",
      name: "상영중",
      selected: true
    }),
    new TabModel({
      url: "#",
      name: "인기순",
      selected: false
    }),
    new TabModel({
      url: "#",
      name: "평점순",
      selected: false
    }),
    new TabModel({
      url: "#",
      name: "상영예정",
      selected: false
    })
  ]);
};
function initTab(tabModel) {
  const selectedClass = tabModel.selected ? "selected" : "";
  return (
    /*html*/
    `
          <li>
              <a href="${tabModel.url}">
              <div class="tab-item ${selectedClass}"><h3>${tabModel.name}</h3></div>
              </a>
          </li>
      `
  );
}
function initNav() {
  document.querySelector(".container");
  const tab = document.querySelector(".tab");
  const tabListModel = new TabListModel();
  tabListModel.tabs.forEach((tabModel) => {
    tab.innerHTML += initTab(tabModel);
  });
}
function initFooter() {
  const footer = document.querySelector(".footer");
  footer.innerHTML = /*html*/
  `
        <p>&copy; 우아한테크코스 All Rights Reserved.</p>
        <p><img src="woowacourse_logo.png" width="180" /></p>
    `;
}
class MovieSearchApiQuery extends MovieApiQuery {
  constructor(request) {
    super(request);
    __privateAdd(this, _keyword);
    __privateSet(this, _keyword, request.keyword);
  }
  getApiUrl() {
    return getMovieSearchKeyowrdApiUrl;
  }
  toQueryString() {
    return `query=${__privateGet(this, _keyword)}&includeAdult=${this.includeAdult}&page=${this.page}&language=ko-KR`;
  }
}
_keyword = new WeakMap();
const NEXTPAGE_NUM = 1;
const FIRST_PAGE = 1;
class Main {
  constructor() {
    __privateAdd(this, _Main_instances);
    __privateAdd(this, _page3);
    __privateAdd(this, _movieApiQuery);
  }
  async init() {
    addEventListener("load", async () => {
      __privateMethod(this, _Main_instances, initPage_fn).call(this);
      __privateSet(this, _movieApiQuery, new MoviePopularApiQuery({
        includeAdult: false,
        includeVideo: false,
        page: __privateGet(this, _page3),
        sortBy: "popularity.desc"
      }));
      const movieListInstance = await getMovie(__privateGet(this, _movieApiQuery));
      __privateSet(this, _page3, movieListInstance.page);
      initHeader(movieListInstance.firstMovie);
      initNav();
      initMovieRender(movieListInstance, "지금 인기있는 영화 ");
      initFooter();
      __privateMethod(this, _Main_instances, enrollClickEvent_fn).call(this);
    });
  }
}
_page3 = new WeakMap();
_movieApiQuery = new WeakMap();
_Main_instances = new WeakSet();
enrollClickEvent_fn = function() {
  __privateMethod(this, _Main_instances, clickMoreButton_fn).call(this);
  __privateMethod(this, _Main_instances, clickSearchButton_fn).call(this);
};
clickMoreButton_fn = function() {
  document.querySelector(".more-btn").addEventListener("click", async () => {
    __privateMethod(this, _Main_instances, nextPage_fn).call(this);
    __privateGet(this, _movieApiQuery).updatePage(__privateGet(this, _page3));
    const movieListInstance = await getMovie(__privateGet(this, _movieApiQuery));
    __privateSet(this, _page3, movieListInstance.page);
    addMovieRender(movieListInstance);
    if (movieListInstance.isLastPage()) {
      document.querySelector(".more-btn").classList.add("none");
    }
  });
};
clickSearchButton_fn = function() {
  const searchInput = document.querySelector(".search-input");
  document.querySelector(".search-icon").addEventListener("click", async () => {
    __privateMethod(this, _Main_instances, initPage_fn).call(this);
    await __privateMethod(this, _Main_instances, searchMovie_fn).call(this, searchInput.value);
  });
  searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      __privateMethod(this, _Main_instances, initPage_fn).call(this);
      await __privateMethod(this, _Main_instances, searchMovie_fn).call(this, searchInput.value);
    }
  });
};
searchMovie_fn = async function(inputValue) {
  __privateSet(this, _movieApiQuery, new MovieSearchApiQuery({
    includeAdult: false,
    keyword: inputValue,
    page: __privateGet(this, _page3)
  }));
  const movieListInstance = await getMovie(__privateGet(this, _movieApiQuery));
  initMovieRender(movieListInstance, inputValue + " 검색결과");
  __privateMethod(this, _Main_instances, enrollClickEvent_fn).call(this);
};
nextPage_fn = function() {
  __privateSet(this, _page3, __privateGet(this, _page3) + NEXTPAGE_NUM);
};
initPage_fn = function() {
  __privateSet(this, _page3, FIRST_PAGE);
};
const main = new Main();
main.init();

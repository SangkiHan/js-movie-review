class MovieModel {
  static POSTER_URL = "https://image.tmdb.org/t/p/w440_and_h660_face";
  static BACKDROP_IMAGE_URL =
    "https://media.themoviedb.org/t/p/w1920_and_h1080_face";

  #id;
  #posterPath;
  #title;
  #voteAverage;
  #backdropPath;
  #myVote;
  #overView;

  constructor(result) {
    this.#id = result.id;
    this.#posterPath = MovieModel.POSTER_URL + result.poster_path;
    this.#title = result.title;
    this.#voteAverage = this.#formatToTwoDecimals(result.vote_average);
    this.#backdropPath = MovieModel.BACKDROP_IMAGE_URL + result.backdrop_path;
    this.#overView = result.overview;
    this.#myVote = 0;
  }

  get id() {
    return this.#id;
  }

  get posterPath() {
    return this.#posterPath;
  }

  get title() {
    return this.#title;
  }

  get voteAverage() {
    return this.#voteAverage;
  }

  get backdropPath() {
    return this.#backdropPath;
  }

  get overView() {
    return this.#overView;
  }

  get myVote() {
    return this.#myVote;
  }

  updateMyVote(myVote) {
    this.#myVote = myVote;
  }

  #formatToTwoDecimals(voteAverage) {
    return Number(voteAverage).toFixed(1);
  }
}

export default MovieModel;

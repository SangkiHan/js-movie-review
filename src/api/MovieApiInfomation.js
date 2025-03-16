const movieApi = "https://api.themoviedb.org/3";

export const getMoviePopularApiUrl = movieApi + "/discover/movie";
export const getMovieSearchKeyowrdApiUrl = movieApi + "/search/movie";
export const movieApiKey = import.meta.env.VITE_API_KEY;

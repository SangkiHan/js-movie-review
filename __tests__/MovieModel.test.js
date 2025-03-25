import MovieModel from "../src/domain/MovieModel.js";

describe("MovieModel Class 테스트", () => {
  it("영화정보를 초기세팅 한다.", () => {
    const result = {
      id: 1,
      poster_path: "/test.png",
      title: "테스트",
      vote_average: 4.234,
      backdrop_path: "/test.png",
      overview: "줄거리",
    };
    const movieModel = new MovieModel(result);

    expect(movieModel.id).toEqual(1);
    expect(movieModel.posterPath).toEqual(
      "https://image.tmdb.org/t/p/w440_and_h660_face/test.png"
    );
    expect(movieModel.title).toEqual("테스트");
    expect(movieModel.voteAverage).toEqual("4.2");
    expect(movieModel.backdropPath).toEqual(
      "https://media.themoviedb.org/t/p/w1920_and_h1080_face/test.png"
    );
    expect(movieModel.overView).toEqual("줄거리");
    expect(movieModel.myVote).toEqual(0);
  });
});

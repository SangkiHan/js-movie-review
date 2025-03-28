import { starMessage } from "../../src/domain/StarMessage";
import { starImage } from "../../src/Image";

describe("Header 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Header 떴는지 확인", () => {
    cy.get("h2").should("contain", "지금 인기있는 영화");
  });
});

describe("Nav 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Nav 떴는지 확인", () => {
    cy.get("h2").should("contain", "지금 인기있는 영화");
  });

  it("탭 메뉴가 제대로 떴는지 확인", () => {
    cy.get(".tab-item").should("have.length", 4);

    cy.get(".tab-item").eq(0).should("contain", "상영중");
    cy.get(".tab-item").eq(1).should("contain", "인기순");
    cy.get(".tab-item").eq(2).should("contain", "평점순");
    cy.get(".tab-item").eq(3).should("contain", "상영예정");
  });
});
describe("영화목록", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("영화 목록에 li가 20개 있는지 확인", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("최하단 이동시 추가 20개 총 40개의 영화가 뜨는지 확인", () => {
    cy.wait(2000);
    cy.scrollTo("bottom");
    cy.get(".thumbnail-list li").should("have.length", 40);
  });
});

describe("영화검색", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("소닉 검색 시 영화 목록에 li가 8개 있는지 확인", () => {
    cy.get(".search-input").type("소닉");
    cy.get(".search-icon").click();
    cy.get(".thumbnail-list li").should("have.length", 8);
  });
});

describe("영화상세", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("모달이 클릭 시 열리는지 확인", () => {
    cy.get(".movie").first().click();

    cy.get("#modalBackground").should("be.visible");

    cy.get(".modal-description h2").should("exist");
  });

  it("4번째 별 클릭시 별 4개가 채워지고 메시지가 잘 뜨는지 확인", () => {
    cy.get(".movie").first().click();

    cy.get("#modalBackground").should("be.visible");

    cy.get(".modal-description h2").should("exist");

    cy.get(".my-rating img").eq(3).click();

    cy.get(".my-rating img")
      .eq(0)
      .should("have.attr", "src", starImage["filled"]);
    cy.get(".my-rating img")
      .eq(1)
      .should("have.attr", "src", starImage["filled"]);
    cy.get(".my-rating img")
      .eq(2)
      .should("have.attr", "src", starImage["filled"]);
    cy.get(".my-rating img")
      .eq(3)
      .should("have.attr", "src", starImage["filled"]);
    cy.get(".my-rating img")
      .eq(4)
      .should("have.attr", "src", starImage["empty"]);

    cy.get(".modal-description").contains(starMessage[4]);
  });
});

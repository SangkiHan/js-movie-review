import TabModel from "./TabModel";

class TabListModel {
  #tabs;

  constructor() {
    this.#initData();
  }

  #initData() {
    this.#tabs = [
      new TabModel({
        url: "#",
        name: "상영중",
        selected: true,
      }),
      new TabModel({
        url: "#",
        name: "인기순",
        selected: false,
      }),
      new TabModel({
        url: "#",
        name: "평점순",
        selected: false,
      }),
      new TabModel({
        url: "#",
        name: "상영예정",
        selected: false,
      }),
    ];
  }

  get tabs() {
    return this.#tabs;
  }
}

export default TabListModel;

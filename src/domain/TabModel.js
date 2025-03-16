class TabModel {
  #name;
  #url;
  #selected;

  constructor(request) {
    this.#name = request.name;
    this.#url = request.url;
    this.#selected = request.selected;
  }

  get name() {
    return this.#name;
  }

  get url() {
    return this.#url;
  }

  get selected() {
    return this.#selected;
  }
}

export default TabModel;

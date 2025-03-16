import TabListModel from "../domain/TabListModel";
import { initTab } from "./Tab.js";

export function initNav() {
  const container = document.querySelector(".container");
  const tab = document.querySelector(".tab");

  const tabListModel = new TabListModel();
  tabListModel.tabs.forEach((tabModel) => {
    tab.innerHTML += initTab(tabModel);
  });
}

export function initTab(tabModel) {
  const selectedClass = tabModel.selected ? "selected" : "";
  return /*html*/ `
          <li>
              <a href="${tabModel.url}">
              <div class="tab-item ${selectedClass}"><h3>${tabModel.name}</h3></div>
              </a>
          </li>
      `;
}

const searchInput = document.querySelector("#searchInput");
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const cards = Array.from(document.querySelectorAll(".source-card"));
const form = document.querySelector("#sourceForm");
const output = document.querySelector("#formOutput");

let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const matchesType = activeFilter === "all" || card.dataset.type === activeFilter;
    const searchable = `${card.innerText} ${card.dataset.keywords}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);

    card.classList.toggle("is-hidden", !(matchesType && matchesQuery));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const title = data.get("title") || "未填写标题";
  const status = data.get("status");
  const updated = data.get("updated") || "未填写日期";
  const source = data.get("source") || "未填写正式依据链接";

  output.value = `校验摘要：${title}，状态为${status}，最近更新 ${updated}，正式依据：${source}。发布前请同步 sitemap.xml、llms.txt 与 JSON-LD。`;
});

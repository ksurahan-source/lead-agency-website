import { LEGACY_HASHES, helpHref } from "./routes.mjs";
import { searchHelp } from "./helpTopics.mjs";

// The old hash was never sent to the server. Map only known legacy routes.
function migrateHash() {
  if (!["/help", "/help/"].includes(location.pathname)) return;
  const id = location.hash.slice(1);
  const target = Object.hasOwn(LEGACY_HASHES, id) ? LEGACY_HASHES[id] : null;
  if (target) location.replace(target);
}
migrateHash();
window.addEventListener("hashchange", migrateHash);
document.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-copy]");
  if (!button) return;
  const status = button.nextElementSibling;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    status.textContent = "복사했습니다.";
  } catch {
    status.textContent = "복사하지 못했습니다. 문구를 직접 선택해 복사하세요.";
  }
});
const form = document.querySelector("[data-help-search]");
if (form) {
  const input = form.querySelector("input");
  const clear = form.querySelector("[data-search-clear]");
  const section = document.querySelector("[data-search-results]");
  const list = document.querySelector("[data-search-list]");
  const status = document.querySelector("[data-search-status]");
  function search() {
    const query = input.value.trim();
    section.hidden = !query;
    clear.hidden = !query;
    list.replaceChildren();
    if (!query) return;
    const matches = searchHelp(query);
    status.textContent =
      "‘" +
      query +
      "’ 관련 도움말 " +
      matches.length +
      "개" +
      (matches.length
        ? ""
        : ". ‘설치’, ‘크레딧’, ‘음성’처럼 짧은 단어로 검색하세요.");
    for (const article of matches) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = helpHref(article.id);
      const span = document.createElement("span");
      span.textContent = article.title;
      const small = document.createElement("small");
      small.textContent = article.summary;
      span.append(small);
      a.append(span);
      li.append(a);
      list.append(li);
    }
  }
  input.value = new URLSearchParams(location.search).get("q") || "";
  search();
  input.addEventListener("input", search);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    search();
  });
  clear.addEventListener("click", () => {
    input.value = "";
    search();
    input.focus();
  });
}

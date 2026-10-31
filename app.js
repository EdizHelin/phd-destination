const PAGE_SIZE = 4;
const $ = id => document.getElementById(id);
const uniq = k => [...new Set(PROGRAMS.map(p => p[k]))].sort();
const count = (k, v) => PROGRAMS.filter(p => p[k] === v).length;

let saved = new Set(JSON.parse(localStorage.getItem("saved") || "[]"));
let page = 1;
const st = { q:"", country:"", field:"", start:"", countries:new Set(), types:new Set(), cats:new Set(), funds:new Set() };

function fillSelect(el, vals){ vals.forEach(v => el.add(new Option(v, v))); }
function checks(box, vals, set, label){
  box.innerHTML = vals.map(v => `<label><input type="checkbox" value="${v}"> ${label ? label(v) : v}</label>`).join("");
  box.addEventListener("change", e => { e.target.checked ? set.add(e.target.value) : set.delete(e.target.value); page = 1; render(); });
}

function filtered(){
  const q = st.q.toLowerCase();
  return PROGRAMS.filter(p => {
    if (q && !`${p.name} ${p.program} ${p.country} ${p.city}`.toLowerCase().includes(q)) return false;
    if (st.country && p.country !== st.country) return false;
    if (st.field && p.field !== st.field) return false;
    if (st.start && p.start !== st.start) return false;
    if (st.countries.size && !st.countries.has(p.country)) return false;
    if (st.cats.size && !st.cats.has(p.cat)) return false;
    if (st.funds.size && !st.funds.has(p.funding)) return false;
    if (st.types.size) {
      const ok = (st.types.has("Top-Ranked") && p.qs <= 50) || st.types.has("Research");
      if (!ok) return false;
    }
    return true;
  });
}

function card(p){
  const id = p.name + p.program, on = saved.has(id);
  const initials = p.name.split(" ").filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join("").slice(0,3);
  return `<article class="card">
    <div class="badge" style="background:${p.color}">${initials}</div>
    <div>
      <h4>${p.name}</h4>
      <p class="meta">📍 ${p.city} | QS Ranking: #${p.qs}</p>
      <p>"${p.program}"</p>
      <p>${p.funding}${p.fundNote ? ` (${p.fundNote})` : ""}</p>
    </div>
    <button class="mark ${on ? "on" : ""}" data-id="${id}" aria-label="Save">${on ? "🔖" : "🔖"}</button>
    <div class="actions">
      <a href="${p.url}" target="_blank" rel="noopener">EXPLORE PROGRAM</a>
      <button data-id="${id}" class="save">${on ? "SAVED" : "SAVE"}</button>
    </div>
  </article>`;
}

function pager(pages){
  if (pages <= 1) { $("pager").innerHTML = ""; return; }
  let h = `<button data-p="${page-1}" ${page===1?"disabled":""}>Prev</button>`;
  for (let i = 1; i <= pages; i++) h += `<button data-p="${i}" class="${i===page?"on":""}">${i}</button>`;
  h += `<button data-p="${page+1}" ${page===pages?"disabled":""}>Next</button>`;
  $("pager").innerHTML = h;
}

function render(){
  const list = filtered(), pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  page = Math.min(page, pages);
  $("count").textContent = `FOUND ${list.length} RESULTS`;
  const slice = list.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  $("grid").innerHTML = slice.length ? slice.map(card).join("") : `<div class="empty">No programs match these filters. Try clearing one.</div>`;
  pager(pages);
}

// events
$("grid").addEventListener("click", e => {
  const id = e.target.dataset.id; if (!id) return;
  saved.has(id) ? saved.delete(id) : saved.add(id);
  localStorage.setItem("saved", JSON.stringify([...saved]));
  render();
});
$("pager").addEventListener("click", e => { const p = +e.target.dataset.p; if (p) { page = p; render(); } });
$("searchForm").addEventListener("submit", e => { e.preventDefault(); st.q = $("q").value.trim(); page = 1; render(); });
$("btnFilter").addEventListener("click", () => { st.country = $("selCountry").value; st.field = $("selField").value; st.start = $("selStart").value; page = 1; render(); });
$("btnReset").addEventListener("click", () => {
  Object.assign(st, { q:"", country:"", field:"", start:"" });
  ["countries","types","cats","funds"].forEach(k => st[k].clear());
  document.querySelectorAll("aside input").forEach(c => c.checked = false);
  ["q","selCountry","selField","selStart"].forEach(id => $(id).value = "");
  page = 1; render();
});

// init
fillSelect($("selCountry"), uniq("country"));
fillSelect($("selField"), uniq("field"));
fillSelect($("selStart"), uniq("start"));
checks($("boxCountry"), uniq("country"), st.countries, v => `${v} (${count("country", v)})`);
checks($("boxType"), ["Research","Top-Ranked"], st.types);
checks($("boxCat"), ["STEM","Humanities"], st.cats);
checks($("boxFunding"), uniq("funding"), st.funds);
render();

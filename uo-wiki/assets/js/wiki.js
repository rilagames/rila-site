const form = document.querySelector('.wiki-search');
const field = document.querySelector('#wiki-search');
const results = document.querySelector('#search-results');
const list = results.querySelector('ul');
const status = document.querySelector('#search-status');
let indexPromise;
let timer;
let revision = 0;
const normalize = text => text.toLocaleLowerCase('en').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
form.addEventListener('submit', event => event.preventDefault());
async function search() {
  const current = ++revision;
  const query = field.value.trim();
  list.replaceChildren();
  results.hidden = true;
  if (!query) { status.textContent = ''; return; }
  status.textContent = 'Searching…';
  try {
    if (!indexPromise) {
      indexPromise = fetch(form.dataset.index).then(response => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }).catch(error => { indexPromise = undefined; throw error; });
    }
    const pages = await indexPromise;
    if (current !== revision) return;
    const terms = normalize(query).split(/\s+/);
    const matches = pages.map(page => {
      const title = normalize(page.title);
      const text = normalize(`${page.title} ${page.category} ${page.text}`);
      return { page, score: terms.every(term => text.includes(term)) ? 1 + terms.filter(term => title.includes(term)).length * 5 : 0 };
    }).filter(item => item.score).sort((a,b) => b.score - a.score || a.page.title.localeCompare(b.page.title));
    matches.slice(0,12).forEach(({ page }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = page.url;
      link.textContent = page.title;
      const category = document.createElement('small');
      category.textContent = page.category;
      link.append(category);
      item.append(link);
      list.append(item);
    });
    results.hidden = !matches.length;
    status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'}${matches.length > 12 ? ', showing the first 12' : ''}.` : 'No matches. Try an item or system name.';
  } catch {
    if (current === revision) status.textContent = 'Search is unavailable. Browse the topics below.';
  }
}
field.addEventListener('input', () => {
  // Invalidate an older request immediately, before the debounce expires.
  revision++;
  clearTimeout(timer);
  timer = setTimeout(search, 150);
});
form.addEventListener('reset', () => {
  revision++;
  clearTimeout(timer);
  list.replaceChildren();
  results.hidden = true;
  status.textContent = '';
});
const navigation = document.querySelector('.wiki-navigation');
const mobile = matchMedia('(max-width: 760px)');
function setNavigation() { navigation.open = !mobile.matches; }
setNavigation();
mobile.addEventListener('change', setNavigation);
const headings = [...document.querySelectorAll('.wiki-prose h2, .wiki-prose h3')];
const toc = document.querySelector('.wiki-toc');
const usedIds = new Set([...document.querySelectorAll('[id]')].map(element => element.id));
headings.forEach((heading, i) => {
  if (!heading.id) {
    let id = `section-${i + 1}`;
    while (usedIds.has(id)) id += '-section';
    heading.id = id;
    usedIds.add(id);
  }
  const link = document.createElement('a');
  link.href = `#${heading.id}`;
  link.textContent = heading.textContent;
  link.dataset.depth = heading.tagName === 'H3' ? '3' : '2';
  toc.querySelector('nav').append(link);
});
toc.hidden = headings.length === 0;

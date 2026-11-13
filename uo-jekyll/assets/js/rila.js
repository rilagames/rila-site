const equipment = {
  vampiric: { name: 'Vampiric zırhı', effect: 'Arşiv görseli; güncel PVP özelliği olarak sunulmaz.', armor: 'Doğrulanacak', loot: 'Duyurulacak' },
  fire: { name: 'Fire zırhı', effect: 'Arşiv görseli; güncel PVP özelliği olarak sunulmaz.', armor: 'Doğrulanacak', loot: 'Duyurulacak' },
  arcane: { name: 'Arcane zırhı', effect: 'Arşiv görseli; güncel PVP özelliği olarak sunulmaz.', armor: 'Doğrulanacak', loot: 'Duyurulacak' }
};
const image = document.querySelector('#selected-armor');
const wiki = document.querySelector('#armor-wiki');
document.querySelectorAll('[data-armor]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.armor;
    const item = equipment[key];
    document.querySelectorAll('[data-armor]').forEach(choice => {
      const active = choice === button;
      choice.classList.toggle('is-active', active);
      choice.setAttribute('aria-pressed', String(active));
    });
    image.src = `${image.dataset.assetRoot}armor_${key}.png`;
    image.alt = item.name;
    image.removeAttribute('width');
    document.querySelector('#armor-name').textContent = item.name;
    document.querySelector('#armor-effect').textContent = item.effect;
    document.querySelector('#armor-value').textContent = item.armor;
    document.querySelector('#armor-loot').textContent = item.loot;
    wiki.href = `${wiki.dataset.wikiRoot}${key}-armor/`;
  });
});
const copy = document.querySelector('[data-copy]');
copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(copy.dataset.copy);
    status.textContent = 'Sunucu adresi kopyalandı.';
  } catch {
    status.textContent = `Bu adresi kopyala: ${copy.dataset.copy}`;
  }
});

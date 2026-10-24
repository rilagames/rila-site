const equipment = {
  vampiric: { name: 'Vampiric armor', effect: 'Life drain.', armor: '300', loot: 'Lord Vampires, Lord Vlad' },
  fire: { name: 'Fire armor', effect: 'Full resistance to the extra damage of fire weapons.', armor: '350', loot: 'Fire Warrior' },
  arcane: { name: 'Arcane armor', effect: 'A chance to deal 100 extra damage to NPCs and 30 to 50 extra damage to players.', armor: '300', loot: 'Arcane Warrior' }
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
    status.textContent = 'Server address copied.';
  } catch {
    status.textContent = `Copy this address: ${copy.dataset.copy}`;
  }
});

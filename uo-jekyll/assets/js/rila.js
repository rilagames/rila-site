const copy = document.querySelector('[data-copy]');
if (copy) copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(copy.dataset.copy); status.textContent = 'Sunucu adresi kopyalandı.'; }
  catch { status.textContent = `Bu adresi kopyala: ${copy.dataset.copy}`; }
});

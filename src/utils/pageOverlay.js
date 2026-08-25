export function openOverlayPage(id) {
  document.getElementById(id)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeOverlayPage(id) {
  document.getElementById(id)?.classList.remove('active');
  const site = document.querySelector('.site');
  if (site) site.style.display = '';
  document.body.style.overflow = document.body.classList.contains('signup-gate-active')
    ? 'hidden'
    : '';
}

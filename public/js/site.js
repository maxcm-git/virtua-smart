// Click-to-play for the client's YouTube videos: nothing loads from YouTube until a visitor presses play,
// and then only from youtube-nocookie.com (no tracking cookie before consent).
for (const btn of document.querySelectorAll('[data-yt]')) {
  btn.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(btn.dataset.yt)}?autoplay=1&rel=0&hl=${document.documentElement.lang}`;
    frame.title = btn.getAttribute('aria-label');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    btn.parentElement.querySelector('img')?.remove();
    btn.replaceWith(frame);
    frame.focus();
  });
}

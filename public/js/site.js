// Click-to-play for the client's YouTube videos: nothing loads from YouTube until a visitor presses play,
// and then only from youtube-nocookie.com (no tracking cookie before consent).
// Vimeo plays the same way, with dnt=1 (no tracking cookies).
for (const btn of document.querySelectorAll('[data-yt], [data-vimeo]')) {
  btn.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = btn.dataset.yt
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(btn.dataset.yt)}?autoplay=1&rel=0&hl=${document.documentElement.lang}`
      : `https://player.vimeo.com/video/${encodeURIComponent(btn.dataset.vimeo)}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
    frame.title = btn.getAttribute('aria-label');
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    btn.parentElement.querySelector('img')?.remove();
    btn.replaceWith(frame);
    frame.focus();
  });
}

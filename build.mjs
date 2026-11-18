// Static site generator for virtua-smart.com: no dependency, `node build.mjs` writes dist/.
// Pages: home, examples, contact, privacy, each in FR (root), EN (/en/) and PT (/pt/).
import { writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { LANGS, routes, content, videos, VIMEO } from './src/content.mjs';
import { vimeoVideos } from './src/vimeo.mjs';

const SITE = 'https://virtua-smart.com';
// The contact form posts here (Formspree, Web3Forms, Basin...). Empty: the form falls back to mailto.
const FORM_ENDPOINT = process.env.FORM_ENDPOINT || '';
const FORM_MAILTO = process.env.FORM_MAILTO || 'contact@virtua-smart.com';
const OUT = 'dist';
const YEAR = new Date().getFullYear();

// The client's YouTube videos (titles, publish dates, length) for the VideoObject markup.
const VIDEO_META = {
  psIVjywkfKg: ['Bienvenue chez VirtuaSmart', '2026-01-15', 61, 'welcome-fr'],
  '0lklS5a7Vk8': ['Welcome to VirtuaSmart', '2026-01-15', 57, 'welcome-en'],
  GJ8TZEpLSRU: ['Bem-vindo à VirtuaSmart', '2026-01-15', 58, 'welcome-pt'],
  iRO6OOhSSAs: ['VirtuaSmart - Simple et Sans Contrainte', '2026-01-17', 51, 'simple-fr'],
  Prq5asiGm58: ['VirtuaSmart - Simple and Constraint-Free', '2026-01-17', 49, 'simple-en'],
  ZjYvUxow2LU: ['VirtuaSmart - Simples e sem Complicações', '2026-01-17', 52, 'simple-pt'],
  HtN5cOF0NS8: ['Here Comes VirtuaSmart - your virtual studio!', '2026-01-27', 44, 'avatar-pub'],
};

const esc = s => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = s => String(s).replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '');
const arrow = '<svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path class="m-arrow__stem" d="M1 6h8"/><path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
const chev = '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// The client's mark: the blue rounded play triangle of the current favicon.
const logoMark = '<svg class="logo-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 3.6c-.9-.5-2 .1-2 1.2v14.4c0 1.1 1.1 1.7 2 1.2l12.5-7.2c.9-.5.9-1.9 0-2.4z" fill="#184ee2"/></svg>';
const logo = href => `<a class="nav__logo" href="${href}">${logoMark}VirtuaSmart</a>`;

// intrinsic sizes of the 1280px files: 4:5 generated portraits, 4:3 generated scenes, 16:9 video stills
const DIMS = name => /^(hero|offre-)/.test(name) ? [1280, 1600] : /^(etape-|plateau|faq)/.test(name) ? [1280, 956] : [1280, 720];
const img = (name, alt, { sizes = '(min-width: 1024px) 628px, 640px', eager = false, attrs = '' } = {}) =>
  `<img class="frame__img" src="/img/${name}.webp" srcset="/img/${name}-640.webp 640w, /img/${name}.webp 1280w" sizes="${sizes}" width="${DIMS(name)[0]}" height="${DIMS(name)[1]}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'} data-source="client" data-subject="${esc(alt)}"${attrs}>`;

// data-yt: a YouTube id; data-vimeo: a Vimeo id. site.js swaps the still for the player on click.
const playBtn = (id, label, provider = 'yt') =>
  `<button class="yt-play" type="button" data-${provider}="${id}" aria-label="${esc(label)}"><span class="ly-play__disc"><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 2.2v13.6L15.5 9z" fill="currentColor"/></svg></span></button>`;

// A video card: its title above, the client's still with a play disc; YouTube loads only on click (site.js).
const videoCard = (t, lang, id, label) => {
  const [title, , , still] = VIDEO_META[id];
  return `<article class="card card--open span-4">
          <h3>${label}</h3>
          <div class="panel video">${img(still, `${title}, ${label}`, { sizes: '(min-width: 1280px) 410px, 640px' })}${playBtn(id, `${t.ui.play} : ${title}`)}</div>
        </article>`;
};

function head(lang, key, t, page, extraLd = []) {
  const url = SITE + routes[key][lang];
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE + routes[key][l]}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE + routes[key].fr}">`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#org`, name: 'VirtuaSmart', url: SITE + '/',
    logo: `${SITE}/favicon-270.png`, description: strip(content[lang].home.description),
    knowsLanguage: ['fr', 'en', 'pt'], sameAs: [VIMEO],
  }, ...extraLd];
  return `<!doctype html>
<html lang="${t.htmlLang}" data-type="service" data-radius="soft" data-buttons="arrow" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(strip(page.title))}</title>
<meta name="description" content="${esc(strip(page.description))}">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="VirtuaSmart">
<meta property="og:locale" content="${t.ogLocale}">
${LANGS.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${content[l].ogLocale}">`).join('\n')}
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(strip(page.title))}">
<meta property="og:description" content="${esc(strip(page.description))}">
<meta property="og:image" content="${SITE}/share.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/favicon-180.png">
<meta name="theme-color" content="#ffffff">
<meta name="site-kind" content="other">
<meta name="page-type" content="service">
<link rel="preload" href="/fonts/hanken-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/system.css">
<link rel="stylesheet" href="/assets/ui/cards.css">
<link rel="stylesheet" href="/assets/motion/motion.css">
<link rel="stylesheet" href="/assets/layout/layout.css">
<link rel="stylesheet" href="/css/site.css">
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
${page.moments ? `<script>document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)</script>
<link rel="modulepreload" href="/assets/moments/moments.js"><link rel="modulepreload" href="/assets/moments/lib.js">
${page.moments.map(m => `<link rel="modulepreload" href="/assets/moments/${m}/moment.js">`).join('')}` : ''}
<script type="application/ld+json">${JSON.stringify(ld.length > 1 ? ld : ld[0])}</script>
</head>`;
}

function nav(lang, key, t) {
  const r = k => routes[k][lang];
  const home = key === 'home' ? '' : r('home');
  const id = t.nav.ids, m = t.nav.menu;
  const cur = k => (k === key ? ' aria-current="page"' : '');
  return `<header class="nav">
  <div class="wrap nav__bar">
    <a class="skip-link" href="#top">${t.ui.skip}</a>
    ${logo(r('home'))}
    <nav class="nav__links" aria-label="${t.ui.mainNav}">
      <div class="nav__item">
        <a class="nav__link" href="${home}#${id.offer}">${t.nav.offer} ${chev}</a>
        <div class="nav__menu">
          <div class="wrap grid">
            <div class="menu-col span-3">
              <p class="t-label">${m.formats}</p>
              ${m.items.map(([a, b]) => `<a href="${home}#${id.offer}">${a}<span>${b}</span></a>`).join('\n              ')}
            </div>
            <div class="menu-col span-3">
              <p class="t-label">${m.how}</p>
              ${m.howItems.map(([a, b]) => `<a href="${home}#${id.method}">${a}<span>${b}</span></a>`).join('\n              ')}
            </div>
            <a class="menu-card span-3 start-10" href="${r('examples')}">
              <div class="panel"><img class="frame__img" src="/img/simple-${lang}-640.webp" alt="" loading="lazy" width="640" height="360"></div>
              <span class="t-card">${m.cardTitle}</span>
              <span class="t-small muted">${m.cardLine}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nav__item"><a class="nav__link" href="${home}#${id.method}">${t.nav.method}</a></div>
      <div class="nav__item"><a class="nav__link" href="${r('examples')}"${cur('examples')}>${t.nav.examples}</a></div>
      <div class="nav__item"><a class="nav__link" href="${r('motion')}"${cur('motion')}>${t.nav.motion}</a></div>
      <div class="nav__item"><a class="nav__link" href="${home}#${id.agency}">${t.nav.agency}</a></div>
      <div class="nav__item"><a class="nav__link" href="${r('contact')}"${cur('contact')}>${t.nav.contact}</a></div>
    </nav>
    <div class="nav__actions">
      ${langLinks(lang, key, 'nav__link nav__lang')}
      <a class="btn btn--primary" href="${r('contact')}">${t.ui.cta}</a>
    </div>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-label="${t.ui.menu}">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>`;
}

const langLinks = (lang, key, cls) => LANGS.map(l =>
  `<a class="${cls}" href="${routes[key][l]}" hreflang="${l}" lang="${content[l].htmlLang}"${l === lang ? ' aria-current="true"' : ''} aria-label="${content[l].langName}">${content[l].short}</a>`).join('');

function footer(lang, key, t, closeHref) {
  const r = k => routes[k][lang];
  const home = key === 'home' ? '' : r('home');
  const id = t.nav.ids, c = t.home.close, ex = t.examples;
  return `<footer class="footer closing g2m" id="contact" aria-labelledby="close-h">
  <div class="wrap">
    <div class="closing__cta close--type">
      <div class="section-head">
        <h2 id="close-h">${c.h2}</h2>
        <p>${c.line}</p>
      </div>
      <a class="btn btn--primary btn--xl" href="${closeHref}">${t.ui.cta}${arrow}</a>
    </div>
    <div class="closing__links">
      <div class="grid">
        <div class="span-4 stack-4">
          ${logo(r('home'))}
          <p class="footer__lede">${t.footer.lede}</p>
        </div>
        <div class="span-2 footer__col"><h3>${t.nav.offer}</h3><ul>${t.nav.menu.items.map(([a]) => `<li><a href="${home}#${id.offer}">${a}</a></li>`).join('')}</ul></div>
        <div class="span-2 footer__col"><h3>${t.nav.method}</h3><ul><li><a href="${home}#${id.method}">${t.home.method.steps[0][0]}</a></li><li><a href="${home}#${id.faq}">${t.home.faq.h2.split(' ')[0]}</a></li></ul></div>
        <div class="span-2 footer__col"><h3>${t.nav.examples}</h3><ul><li><a href="${r('examples')}#${ex.welcome.id}">${ex.welcome.h2.split(',')[0]}</a></li><li><a href="${r('examples')}#${ex.ad.id}">${t.home.offer.rows[3][0]}</a></li><li><a href="${r('motion')}">${t.footer.motion}</a></li></ul></div>
        <div class="span-2 footer__col"><h3>${t.nav.agency}</h3><ul><li><a href="${home}#${id.agency}">${t.nav.agency}</a></li><li><a href="${r('contact')}">${t.nav.contact}</a></li></ul></div>
      </div>
      <div class="footer__legal">
        <span>&copy; ${YEAR} VirtuaSmart &nbsp; <a href="${r('privacy')}">${t.ui.privacy}</a> &nbsp; <a href="${r('legal')}">${t.ui.legal}</a></span>
        <nav class="footer__langs" aria-label="${t.ui.langNav}">${langLinks(lang, key, 'footer__lang')}</nav>
      </div>
    </div>
  </div>
</footer>
<nav class="actionbar" aria-label="${t.ui.cta}">
  <a class="btn btn--primary" href="${closeHref}">${t.ui.cta}</a>
</nav>
<script type="module" src="/assets/system.js"></script>
<script type="module" src="/assets/motion/motion.js"></script>
<script type="module" src="/assets/layout/layout.js"></script>
<script type="module" src="/js/site.js"></script>
</body>
</html>`;
}

const deal = `<!-- type: service (AI avatar videos for asset managers; people hire the studio)
     deal: hero split, nav nav-mega, close close-type, footer footer-columns, rhythm space, buttons arrow,
     mark: the client's own play mark (replaces the dealt "dots"); palette: the client's brand (start.mjs brand,
     blue #184ee2 from the logo on white), type hanken
     moments: pinned-chapters (home #method), picture-develops (home #agency, examples #advert) -->`;

// ---------- pages ----------

function homePage(lang) {
  const t = content[lang], h = t.home, id = t.nav.ids, r = k => routes[k][lang];
  const imgs = ['offre-rapport', 'offre-marche', 'offre-social', 'offre-pub'];
  const steps = ['etape-avatar', 'etape-texte', 'etape-montage'];
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: h.faq.items.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };
  const serviceLd = {
    '@context': 'https://schema.org', '@type': 'Service', name: strip(h.hero.h1), serviceType: strip(h.hero.h1),
    description: strip(h.description), provider: { '@id': `${SITE}/#org` }, areaServed: 'Worldwide',
    audience: { '@type': 'BusinessAudience', audienceType: strip(h.faq.h2.split(' ').slice(2).join(' ')) },
    availableLanguage: ['fr', 'en', 'pt'],
  };
  const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'VirtuaSmart', url: SITE + r('home'), inLanguage: t.htmlLang };
  return `${head(lang, 'home', t, { ...h, moments: ['pinned-chapters', 'picture-develops'] }, [siteLd, serviceLd, faqLd])}
<body>
${deal}
${nav(lang, 'home', t)}

<main id="top">
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <p class="hero__kicker"><span class="dot" aria-hidden="true"></span>${h.hero.kicker}</p>
        <h1 id="hero-h">${h.hero.h1}</h1>
        <p class="hero__lead">${h.hero.lead}</p>
        <div class="btn-row"><a class="btn btn--primary" href="${r('contact')}">${t.ui.cta}${arrow}</a><a class="btn btn--secondary" href="${r('examples')}">${h.hero.second}</a></div>
      </div>
      <div class="hero__media span-6 start-7">
        ${img('hero', h.hero.alt, { eager: true, attrs: ' style="--ly-pos: 50% 30%"' })}
        <div class="ly-float">
          <div class="ly-float__row"><span>${h.hero.floatLabel}</span><span>${h.hero.floatValue}</span></div>
          <div class="ly-float__title">${h.hero.floatTitle}</div>
        </div>
      </div>
    </div></div>
  </section>

  <section class="section" id="${id.offer}" style="--hm: 2" aria-labelledby="offer-h">
    <div class="wrap">
      <div class="grid grid--top fill" data-peek>
        <div class="span-5 offer__text">
          <div class="section-head"><h2 id="offer-h">${h.offer.h2}</h2><p>${h.offer.lead}</p></div>
          <ul class="rows">
            ${h.offer.rows.map(([n, p], i) => `<li data-peek-to="f${i}" tabindex="0"><span class="rows__name">${n}</span><p>${p}</p></li>`).join('\n            ')}
          </ul>
        </div>
        <div class="frame frame--photo frame--fill span-6 start-7">
          ${h.offer.rows.map(([, , alt], i) => img(imgs[i], alt).replace('<img ', `<img data-peek-for="f${i}"${i ? ' hidden' : ''} `)).join('\n          ')}
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="${id.method}" style="--h: 2; --hm: 2" data-moment="pinned-chapters" aria-labelledby="method-h">
    <div class="wrap mo-pc__grid">
      <div class="mo-pc__text">
        <h2 id="method-h">${h.method.h2}</h2>
        <ol class="mo-pc__steps">
          ${h.method.steps.map(([s, p, alt], i) => `<li class="mo-pc__step">
            <h3>${s}</h3>
            <p>${p}</p>
            <figure class="mo-pc__visual"><img src="/img/${steps[i]}.webp" srcset="/img/${steps[i]}-640.webp 640w, /img/${steps[i]}.webp 1280w" sizes="(min-width: 1024px) 628px, 100vw" alt="${esc(alt)}" width="1280" height="956" loading="lazy" decoding="async"></figure>
          </li>`).join('\n          ')}
        </ol>
      </div>
      <div class="mo-pc__visuals frame"></div>
    </div>
  </section>

  <section class="section" id="langues" style="--hm: 2" aria-labelledby="langs-h">
    <div class="wrap">
      <div class="section-head"><h2 id="langs-h">${h.langs.h2}</h2><p>${h.langs.lead}</p></div>
      <div class="grid">
        ${LANGS.map(l => videoCard(t, l, videos.welcome[l], t.ui.versions[l])).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section" id="${id.agency}" aria-labelledby="agency-h">
    <div class="wrap grid grid--top">
      <div class="span-5 agency__text">
        <div class="section-head"><h2 id="agency-h">${h.agency.h2}</h2><p>${h.agency.lead}</p></div>
        <dl class="facts">
          ${h.agency.facts.map(([n, l]) => `<div><dt>${l}</dt><dd>${n}</dd></div>`).join('')}
        </dl>
        <p><a class="link" href="${r('motion')}">${h.agency.link}</a></p>
      </div>
      <figure class="develop span-6 start-7" data-moment="picture-develops"><img src="/img/plateau.webp" srcset="/img/plateau-640.webp 640w, /img/plateau.webp 1280w" sizes="(min-width: 1024px) 628px, 100vw" alt="${esc(h.agency.alt)}" width="1280" height="956" loading="lazy" decoding="async" data-source="client" data-subject="${esc(h.agency.alt)}"></figure>
    </div>
  </section>

  <section class="section" id="${id.faq}" style="--hm: 2" aria-labelledby="faq-h">
    <div class="wrap">
      <div class="section-head"><h2 id="faq-h">${h.faq.h2}</h2></div>
      <div class="grid grid--top">
        <div class="span-6 faq__col">
          <div class="faq">
            ${h.faq.items.map(([q, a]) => `<div class="faq__item"><h3>${q}</h3><p>${a}</p></div>`).join('\n            ')}
          </div>
        </div>
        <figure class="faq__still span-6 start-7">${img('faq', h.faq.alt)}</figure>
      </div>
    </div>
  </section>
</main>

${footer(lang, 'home', t, r('contact') + '#demo')}`;
}

function crumbLd(lang, key, name) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'VirtuaSmart', item: SITE + routes.home[lang] },
    { '@type': 'ListItem', position: 2, name, item: SITE + routes[key][lang] },
  ] };
}

function examplesPage(lang) {
  const t = content[lang], e = t.examples, r = k => routes[k][lang];
  const ids = [...LANGS.map(l => videos.welcome[l]), ...LANGS.map(l => videos.simple[l]), videos.ad];
  const videoLd = ids.map(id => {
    const [name, date, secs, still] = VIDEO_META[id];
    return { '@context': 'https://schema.org', '@type': 'VideoObject', name, description: strip(e.description),
      thumbnailUrl: `${SITE}/img/${still}.webp`, uploadDate: date, duration: `PT${secs}S`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`, contentUrl: `https://www.youtube.com/watch?v=${id}` };
  });
  return `${head(lang, 'examples', t, { ...e, moments: ['picture-develops'] }, [crumbLd(lang, 'examples', e.crumb), ...videoLd])}
<body>
${deal}
${nav(lang, 'examples', t)}

<main id="top">
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <p class="hero__kicker"><span class="dot" aria-hidden="true"></span>${e.hero.kicker}</p>
        <h1 id="hero-h">${e.hero.h1}</h1>
        <p class="hero__lead">${e.hero.lead}</p>
        <div class="btn-row"><a class="btn btn--primary" href="${r('contact')}">${t.ui.cta}${arrow}</a><a class="btn btn--secondary" href="#${e.ad.id}">${e.hero.second}</a></div>
      </div>
      <div class="hero__media span-6 start-7">
        ${img('plateau', e.hero.alt, { eager: true, sizes: '(min-width: 1024px) 1280px, 640px', attrs: ' style="--ly-pos: 50% 50%"' })}
      </div>
    </div></div>
  </section>

  <section class="section" id="${e.welcome.id}" aria-labelledby="welcome-h">
    <div class="wrap">
      <div class="section-head"><h2 id="welcome-h">${e.welcome.h2}</h2><p>${e.welcome.lead}</p></div>
      <div class="grid">
        ${LANGS.map(l => videoCard(t, l, videos.welcome[l], t.ui.versions[l])).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section" id="${e.simple.id}" aria-labelledby="simple-h">
    <div class="wrap">
      <div class="section-head"><h2 id="simple-h">${e.simple.h2}</h2><p>${e.simple.lead}</p></div>
      <div class="grid">
        ${LANGS.map(l => videoCard(t, l, videos.simple[l], t.ui.versions[l])).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section" id="${e.ad.id}" aria-labelledby="ad-h">
    <div class="wrap grid grid--top">
      <div class="span-5">
        <div class="section-head"><h2 id="ad-h">${e.ad.h2}</h2></div>
        <ol class="rows rows--steps">
          ${e.ad.steps.map(s => `<li><p>${s}</p></li>`).join('\n          ')}
        </ol>
      </div>
      <figure class="develop develop--video span-6 start-7" data-moment="picture-develops"><img src="/img/avatar-pub.webp" alt="${esc(e.ad.alt)}" width="1280" height="720" loading="lazy" decoding="async" data-source="client" data-subject="${esc(e.ad.alt)}">${playBtn(videos.ad, `${t.ui.play} : ${VIDEO_META[videos.ad][0]}`)}</figure>
    </div>
  </section>

  <section class="section" id="${e.motion.id}" aria-labelledby="motion-h">
    <div class="wrap grid grid--top">
      <div class="span-5">
        <div class="section-head"><h2 id="motion-h">${e.motion.h2}</h2><p>${e.motion.lead}</p></div>
        <p><a class="link" href="${r('motion')}">${e.motion.link}</a></p>
      </div>
      <div class="frame frame--photo span-6 start-7 motion__frame">${img('etape-montage', e.motion.alt, { sizes: '(min-width: 1024px) 1280px, 640px' })}</div>
    </div>
  </section>
</main>

${footer(lang, 'examples', t, r('contact') + '#demo')}`;
}

function motionPage(lang) {
  const t = content[lang], m = t.motionPage, r = k => routes[k][lang];
  const groups = Object.entries(m.groups);
  const hero = vimeoVideos.find(v => v.id === '1074254836'); // the newest film leads the page; its 1280px still exists only for it
  const card = v => `<article class="card card--open span-4">
          <h3>${v.title}</h3>
          <div class="panel video"><img class="frame__img" src="/img/motion/${v.id}.webp" width="640" height="360" alt="${esc(v.title)}" loading="lazy" decoding="async" data-source="client" data-subject="${esc(v.title)}">${playBtn(v.id, `${t.ui.play} : ${v.title}`, 'vimeo')}</div>
        </article>`;
  const videoLd = vimeoVideos.map(v => ({ '@context': 'https://schema.org', '@type': 'VideoObject', name: v.title, description: strip(m.groups[v.group][1]),
    thumbnailUrl: `${SITE}/img/motion/${v.id}.webp`, uploadDate: v.date, duration: `PT${v.secs}S`,
    embedUrl: `https://player.vimeo.com/video/${v.id}`, contentUrl: `https://vimeo.com/${v.id}` }));
  return `${head(lang, 'motion', t, m, [crumbLd(lang, 'motion', m.crumb), ...videoLd])}
<body>
${deal}
${nav(lang, 'motion', t)}

<main id="top">
  <section class="hero hero--split" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <p class="hero__kicker"><span class="dot" aria-hidden="true"></span>${m.kicker}</p>
        <h1 id="hero-h">${m.h1}</h1>
        <p class="hero__lead">${m.lead}</p>
        <div class="btn-row"><a class="btn btn--primary" href="${r('contact')}">${t.ui.cta}${arrow}</a><a class="btn btn--secondary" href="#brands">${m.second}</a></div>
      </div>
      <div class="hero__media span-6 start-7">
        <img src="/img/motion/${hero.id}-1280.webp" width="1280" height="720" alt="${esc(m.heroAlt)}" fetchpriority="high" data-source="client" data-subject="${esc(m.heroAlt)}" style="--ly-pos: 50% 50%">${playBtn(hero.id, `${t.ui.play} : ${hero.title}`, 'vimeo')}
      </div>
    </div></div>
  </section>
${groups.map(([g, [h2, lead]]) => `
  <section class="section reel" id="${g === 'tvArchive' ? 'tv-archive' : g}" style="--h: 2; --hm: 2" aria-labelledby="${g}-h">
    <div class="wrap">
      <div class="section-head"><h2 id="${g}-h">${h2}</h2><p>${lead}</p></div>
      <div class="grid">
        ${vimeoVideos.filter(v => v.group === g && v !== hero).map(card).join('\n        ')}
      </div>
      ${g === 'tvArchive' ? `<p class="reel__more"><a class="link" href="${VIMEO}" rel="noopener">${m.vimeo}</a></p>` : ''}
    </div>
  </section>`).join('\n')}
</main>

${footer(lang, 'motion', t, r('contact') + '#demo')}`;
}

function contactPage(lang) {
  const t = content[lang], c = t.contact, f = c.form, r = k => routes[k][lang];
  const field = (n, label, type, auto, err, extra = '') => `<div class="field${n === 'message' ? ' field--full' : ''}"><label for="f-${n}">${label}</label>
            ${n === 'message' ? `<textarea id="f-${n}" name="${n}" rows="5" required aria-describedby="f-${n}-err"></textarea>`
              : `<input id="f-${n}" name="${n}" type="${type}" autocomplete="${auto}"${extra}${err ? ` required aria-describedby="f-${n}-err"` : ''}>`}
            ${err ? `<p class="field__error" id="f-${n}-err" hidden>${err}</p>` : ''}</div>`;
  const action = FORM_ENDPOINT || `mailto:${FORM_MAILTO}`;
  return `${head(lang, 'contact', t, c, [crumbLd(lang, 'contact', c.crumb)])}
<body>
${deal}
${nav(lang, 'contact', t)}

<main id="top">
  <section class="hero hero--split hero--contact" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5">
        <h1 id="hero-h">${c.h1}</h1>
        <p class="hero__lead">${c.lead}</p>
        <figure class="contact__still">${img(`welcome-${lang}`, t.home.offer.rows[1][2], { sizes: '(min-width: 1024px) 519px, 100vw', eager: true })}</figure>
      </div>
      <div class="span-6 start-7 contact__form" id="demo">
        <form class="form" action="${action}" method="post"${FORM_ENDPOINT ? '' : ' enctype="text/plain"'} data-endpoint="${FORM_ENDPOINT}" data-sent="${esc(f.sent)}" novalidate>
          <input type="hidden" name="language" value="${lang}">
          ${field('name', f.name, 'text', 'name', f.errName)}
          ${field('email', f.email, 'email', 'email', f.errEmail, ' inputmode="email"')}
          ${field('phone', f.phone, 'tel', 'tel', '')}
          ${field('message', f.message, '', '', f.errMessage)}
          <div class="btn-row"><button class="btn btn--primary" type="submit">${t.ui.cta}${arrow}</button></div>
          <p class="form__status" role="status" data-form-status></p>
          <p class="t-small muted">${f.reply}</p>
        </form>
      </div>
    </div></div>
  </section>
</main>

${footer(lang, 'contact', t, '#demo')}`;
}

function privacyPage(lang, key = 'privacy') {
  const t = content[lang], p = t[key], r = k => routes[k][lang];
  return `${head(lang, key, t, p)}
<body>
${deal}
${nav(lang, key, t)}

<main id="top">
  <section class="hero hero--split hero--text" data-enter aria-labelledby="hero-h">
    <div class="wrap"><div class="hero-text grid hero__grid">
      <div class="hero__text span-5"><h1 id="hero-h">${p.h1}</h1><p class="hero__lead">${p.description}</p></div>
      <div class="span-6 start-7 faq">
        ${p.blocks.map(([h, b]) => `<div class="faq__item"><h2>${h}</h2><p>${b}</p></div>`).join('\n        ')}
      </div>
    </div></div>
  </section>
</main>

${footer(lang, key, t, r('contact') + '#demo')}`;
}

// ---------- write ----------

const pages = { home: homePage, examples: examplesPage, motion: motionPage, contact: contactPage, privacy: privacyPage, legal: lang => privacyPage(lang, 'legal') };

await rm(OUT, { recursive: true, force: true });
await cp('public', OUT, { recursive: true });
for (const lang of LANGS) {
  for (const [key, render] of Object.entries(pages)) {
    const file = join(OUT, routes[key][lang], 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, render(lang));
  }
}

const OLD_URLS = {
  '/eng/': '/en/', '/examples/': '/en/examples/', '/the-agency/': '/en/#agency', '/get-in-touch/': '/en/contact/',
  '/agence/': '/#agence', '/agencia/': '/pt/#agencia', '/exemplos/': '/pt/exemplos/', '/contato/': '/pt/contato/',
  '/project/agency-website/': '/exemples/', '/project/argenta-website/': '/exemples/', '/project/popcorn-box/': '/exemples/',
  '/project/bottle-design/': '/exemples/', '/project/mobile-application/': '/exemples/',
};
for (const [from, to] of Object.entries(OLD_URLS)) {
  const file = join(OUT, from, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `<!doctype html><html><head><meta charset="utf-8"><title>VirtuaSmart</title><link rel="canonical" href="${SITE + to}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><a href="${to}">VirtuaSmart</a></body></html>`);
}
await writeFile(join(OUT, 'CNAME'), 'virtua-smart.com\n');
await writeFile(join(OUT, '.nojekyll'), '');
await writeFile(join(OUT, '404.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page introuvable | VirtuaSmart</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/assets/system.css"><link rel="stylesheet" href="/css/site.css"></head><body><main class="wrap" style="padding-block: 120px"><h1>Page introuvable</h1><p>${LANGS.map(l => `<a class="link" href="${routes.home[l]}" lang="${content[l].htmlLang}">${content[l].langName}</a>`).join(' &nbsp; ')}</p></main></body></html>`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(pages).flatMap(key => LANGS.map(lang => `  <url>
    <loc>${SITE + routes[key][lang]}</loc>
${LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE + routes[key][l]}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE + routes[key].fr}"/>
  </url>`)).join('\n')}
</urlset>
`;
await writeFile(join(OUT, 'sitemap.xml'), sitemap);
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// self-check: every page in every language exists and links its two translations
for (const key of Object.keys(pages)) for (const lang of LANGS) {
  const html = await import('node:fs').then(fs => fs.readFileSync(join(OUT, routes[key][lang], 'index.html'), 'utf8'));
  for (const l of LANGS) if (!html.includes(`hreflang="${l}" href="${SITE + routes[key][l]}"`)) throw new Error(`${key}/${lang}: missing hreflang ${l}`);
  if (/\[[A-Za-z][^\]]*\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) console.warn(`${key}/${lang}: bracket left in the page`);
}
console.log(`built ${Object.keys(pages).length * LANGS.length} pages into ${OUT}/`);

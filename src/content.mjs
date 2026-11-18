// All site copy, in three languages. Source: the current virtua-smart.com (FR, EN, PT pages), rewritten
// shorter. Facts come only from that site: 175+ languages, next-day delivery after the text is approved,
// same day for a short announcement, 7 days a week, no length limit, avatar from a photo or a green-screen
// shoot, 20 years of TV graphics and post-production, 1,000+ videos.

export const LANGS = ['fr', 'en', 'pt'];

// URL of every page in every language (FR stays at the root, as on the current site).
export const routes = {
  home:     { fr: '/',                 en: '/en/',          pt: '/pt/' },
  examples: { fr: '/exemples/',        en: '/en/examples/', pt: '/pt/exemplos/' },
  contact:  { fr: '/contact/',         en: '/en/contact/',  pt: '/pt/contato/' },
  privacy:  { fr: '/confidentialite/', en: '/en/privacy/',  pt: '/pt/privacidade/' },
  motion:   { fr: '/motion-design/', en: '/en/motion-design/', pt: '/pt/motion-design/' },
  legal:    { fr: '/mentions-legales/', en: '/en/legal-notice/', pt: '/pt/aviso-legal/' },
};

// YouTube ids of the client's own videos (Examples page on the current site).
export const videos = {
  welcome: { fr: 'psIVjywkfKg', en: '0lklS5a7Vk8', pt: 'GJ8TZEpLSRU' },
  simple:  { fr: 'iRO6OOhSSAs', en: 'Prq5asiGm58', pt: 'ZjYvUxow2LU' },
  ad: 'HtN5cOF0NS8',
};
export const VIMEO = 'https://vimeo.com/showcase/11661762';

const N = '&nbsp;'; // French spacing before ? ! : ;

export const content = {
  fr: {
    htmlLang: 'fr', ogLocale: 'fr_FR', langName: 'Français', short: 'FR',
    ui: {
      skip: 'Aller au contenu', mainNav: 'Navigation principale', menu: 'Menu', langNav: 'Langue',
      cta: 'Demander une démo', play: 'Lire la vidéo', privacy: 'Confidentialité', legal: 'Mentions légales', rights: 'VirtuaSmart',
      versions: { fr: 'La vidéo en français', en: 'La vidéo en anglais', pt: 'La vidéo en portugais' },
    },
    nav: {
      offer: 'Offre', method: 'Méthode', examples: 'Exemples', motion: 'Motion design', agency: 'Agence', contact: 'Contact',
      ids: { offer: 'offre', method: 'methode', agency: 'agence', faq: 'questions' },
      menu: {
        formats: 'Formats',
        items: [
          ['Rapports de gestion', 'Mensuels, trimestriels, annuels'],
          ['Message du gérant', 'Point marché, stratégie, annonce'],
          ['Newsletter et LinkedIn', 'Aux couleurs de votre marque'],
        ],
        how: 'Méthode',
        howItems: [
          ['Création de l’avatar', 'Photo ou tournage sur fond vert'],
          ['175 langues', 'La même voix dans chaque langue'],
        ],
        cardTitle: 'Le même avatar en 3 langues',
        cardLine: 'Sept vidéos à regarder',
      },
    },
    footer: {
      lede: 'Vidéos avec avatar IA pour la finance.',
      cols: { offer: 'Offre', company: 'VirtuaSmart' },
      motion: 'Projets motion design',
    },
    home: {
      title: 'VirtuaSmart : vidéos avec avatar IA pour sociétés de gestion',
      description: `Votre gérant écrit le texte, nous livrons la vidéo avec son avatar IA et sa voix, en plus de 175 langues, dès le lendemain. Rapports de gestion, points marché, newsletters.`,
      hero: {
        kicker: 'Plus de 175 langues, avec la même voix',
        h1: 'Vidéos d’avatar IA pour sociétés de gestion',
        lead: `Votre gérant écrit son rapport ou son point marché. Nous en faisons une vidéo avec son avatar et sa voix, sans tournage.`,
        second: 'Voir les exemples',
        floatLabel: 'Délai', floatValue: '7 j/7',
        floatTitle: 'Vidéo livrée le lendemain du texte validé',
        alt: 'Un gérant en costume bleu s’adresse à la caméra dans un bureau en étage, la ville derrière les baies vitrées',
      },
      offer: {
        h2: 'Quatre formats pour parler à vos clients',
        lead: 'Chaque vidéo part d’un texte écrit par votre équipe de gestion.',
        rows: [
          ['Rapports de gestion', 'Vos rapports mensuels, trimestriels ou annuels deviennent des vidéos courtes, avec la même rigueur financière.', 'Une gérante présente son rapport trimestriel face caméra, devant un écran de courbes de performance'],
          ['Message du gérant et point marché', 'Un commentaire de marché ou une décision stratégique, publié sans tournage. Une annonce courte sort le jour même.', 'Un stratégiste fait le point marché face caméra, devant un mur d’écrans de cotations'],
          ['Newsletter, LinkedIn et site', 'Des vidéos au ton et aux couleurs de votre marque, avec graphiques animés et chiffres clés.', 'Un ordinateur et un téléphone affichent la vidéo d’un gérant dans un fil d’actualité'],
          ['Publicité', 'Des spots réalisés entièrement avec des avatars IA, placés dans un décor à votre image.', 'Une dirigeante en tailleur bleu traverse le hall vitré d’une société financière'],
        ],
      },
      method: {
        h2: 'Du texte à la vidéo en trois étapes',
        steps: [
          ['Nous créons votre avatar', 'À partir d’une simple photo ou d’un tournage sur fond vert dans vos bureaux, avec votre voix. Un avatar générique est aussi possible.', 'Tournage sur fond vert dans une salle de réunion, caméra et éclairages face au gérant'],
          ['Votre gérant écrit le texte', `Il l’envoie par email, d’où qu’il soit, quel que soit le fuseau horaire. Rien à tourner, aucun studio, aucun déplacement.`, 'Un gérant rédige son commentaire de marché sur son ordinateur portable'],
          ['Nous livrons la vidéo', 'Voix, motion design, graphiques, sous-titres et montage. La vidéo arrive le lendemain de la validation du texte.', 'Un monteur assemble la vidéo du gérant avec des graphiques animés'],
        ],
      },
      langs: {
        h2: 'Le même avatar, la même voix, en trois langues',
        lead: `Cet avatar fictif et sa voix sont générés par VirtuaSmart. Nous produisons vos vidéos en plus de 175 langues et dialectes.`,
      },
      agency: {
        h2: 'Un studio vidéo depuis vingt ans',
        lead: `Avant les avatars IA, nous faisions de l’habillage TV, de l’identité visuelle et de la post-production pour de grandes enseignes et des chaînes de télévision.`,
        facts: [['1 000+', 'vidéos produites'], ['20 ans', 'de post-production'], ['175+', 'langues et dialectes']],
        link: 'Voir nos projets motion design',
        alt: 'Un plateau virtuel à fond vert avec un présentateur, deux caméras et des écrans de marché',
      },
      faq: {
        h2: 'Questions des sociétés de gestion',
        lead: 'Une autre question sur votre projet ?',
        link: 'Écrire à l’équipe',
        alt: 'Une cliente regarde sur sa tablette la vidéo d’un gérant',
        items: [
          [`Faut-il filmer le gérant pour créer l’avatar${N}?`, `Non. Une photo suffit pour créer l’avatar. Pour plus de réalisme, nous tournons une fois sur fond vert dans vos bureaux.`],
          [`Qui écrit le texte de la vidéo${N}?`, `Votre gérant ou votre équipe. Nous produisons la vidéo à partir de ce texte sans en changer le fond${N}: vous gardez la maîtrise du contenu.`],
          [`Quel délai pour une vidéo${N}?`, `La vidéo complète est livrée le lendemain de la validation du texte, 7 jours sur 7. Une annonce courte peut sortir le jour même.`],
          [`Dans quelles langues sort la vidéo${N}?`, `Plus de 175 langues et dialectes, avec la voix de votre gérant dans chacune.`],
          [`Une vidéo a-t-elle une durée maximale${N}?`, `Non, aucune limite de durée.`],
        ],
      },
      close: {
        h2: 'Une démo de 30 secondes avec votre texte',
        line: `Envoyez un texte de votre gérant${N}: nous le transformons en vidéo de 30 secondes avec un avatar IA.`,
      },
    },
    examples: {
      title: 'Exemples de vidéos avec avatar IA | VirtuaSmart',
      description: 'Sept vidéos produites par VirtuaSmart : le même avatar en français, anglais et portugais, des messages sans limite de durée et une publicité réalisée avec des avatars IA.',
      crumb: 'Exemples',
      hero: {
        kicker: '7 vidéos, 3 langues',
        h1: 'Exemples de vidéos avec avatar IA',
        lead: 'Le même avatar en français, en anglais et en portugais, des messages sans limite de durée et une publicité réalisée avec des avatars IA.',
        second: 'Voir la publicité',
        alt: 'Un plateau virtuel à fond vert avec un présentateur, deux caméras et des écrans de marché',
      },
      welcome: { id: 'bienvenue', h2: 'Bienvenue chez VirtuaSmart, en trois langues', lead: 'L’avatar et sa voix sont générés par nos soins. Le vôtre peut naître d’une photo ou d’un tournage dans vos bureaux.' },
      simple: { id: 'sans-contrainte', h2: 'Une vidéo sans limite de durée', lead: 'Simple et sans contrainte, dans toutes les langues : un texte suffit pour parler à vos clients en vidéo.' },
      ad: {
        id: 'publicite', h2: 'Une publicité réalisée avec des avatars IA',
        steps: [
          'Nous venons filmer ou photographier vos équipes dans vos bureaux.',
          'Nous entraînons nos modèles avec vos images et votre voix.',
          'Nous générons l’avatar sur fond vert.',
          'Nous le plaçons dans un décor à votre image.',
          'En post-production, nous ajoutons motion design et sous-titres.',
        ],
        alt: 'Un avatar de trader à son bureau devant des écrans de cotations, titre « Anything new? »',
      },
      motion: {
        id: 'motion-design', h2: 'Motion design pour vos vidéos',
        lead: 'Graphiques animés, chiffres clés, schémas simples et mots clés accompagnent le discours du gérant et rendent lisibles des messages complexes.',
        link: 'Voir 50 de nos réalisations',
        alt: 'Un monteur assemble la vidéo du gérant avec des graphiques animés',
      },
    },
    contact: {
      title: 'Contact et démo vidéo de 30 secondes | VirtuaSmart',
      description: 'Demandez une démo de 30 secondes à partir de votre texte, ou créez dès maintenant l’avatar IA de votre gérant avec VirtuaSmart.',
      crumb: 'Contact',
      h1: 'Contact et démo vidéo de 30 secondes',
      lead: `Envoyez-nous un texte de votre gérant${N}: nous vous renvoyons une vidéo de 30 secondes avec un avatar IA. Déjà convaincu${N}? Nous créons vos avatars tout de suite.`,
      form: {
        name: 'Nom', email: 'Email professionnel', phone: 'Téléphone (facultatif)', message: 'Votre texte ou votre besoin',
        errName: 'Écrivez votre nom.', errEmail: 'Écrivez une adresse email avec un @, comme nom@societe.fr.', errMessage: 'Écrivez quelques lignes sur votre projet.',
        sent: 'Votre demande de démo est envoyée. Nous vous répondons par email.',
        reply: 'Nous vous répondons par email. Vos données servent uniquement à vous répondre.',
      },
    },
    motionPage: {"title": "Motion design et habillage TV : 50 réalisations | VirtuaSmart", "description": "Films de marque, logos animés et habillages d’antenne réalisés pour Edenred, EDF, Castorama, M6, W9 ou Fun Radio. 50 vidéos à regarder.", "crumb": "Motion design", "kicker": "50 réalisations à regarder", "h1": "Motion design et habillage TV", "lead": "Films de marque pour Edenred, EDF ou Dacia, habillages d’antenne pour M6, W9 et Fun Radio : le savoir-faire qui anime aujourd’hui vos vidéos d’avatar.", "second": "Voir les films de marque", "heroAlt": "Générique des 15 ans de Scènes de Ménages", "groups": {"brands": ["Films de marque et identités", "Films de marque, identités animées et bandes-annonces pour des groupes cotés et des institutions."], "identities": ["Logos animés et vœux d’entreprise", "Logos animés, vœux et présentations d’entreprise, de Cromology à Atos."], "tv": ["Habillage TV et radio", "Génériques, pastilles et habillages d’antenne pour M6, W9, Gulli et Fun Radio."], "tvArchive": ["Génériques et spots TV", "Génériques, bandes-annonces et spots pour M6, W9, RTL2 et Public Sénat."]}, "vimeo": "Voir la vitrine sur Vimeo"},
    legal: {"title": "Mentions légales | VirtuaSmart", "description": "Éditeur, hébergeur et propriété intellectuelle du site virtua-smart.com.", "h1": "Mentions légales", "blocks": [["Éditeur du site", "VirtuaSmart, entreprise individuelle de Maximilien Chanu (micro-entrepreneur). SIRET 501 109 201 00035. Contact : contact@virtua-smart.com."], ["Directeur de la publication", "Maximilien Chanu."], ["Hébergeur", "GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (GitHub Pages)."], ["Propriété intellectuelle", "Les vidéos, avatars, images et textes de ce site appartiennent à VirtuaSmart. Toute reproduction sans accord écrit est interdite."]]},
    privacy: {
      title: 'Confidentialité | VirtuaSmart',
      description: 'Ce que VirtuaSmart fait des informations envoyées par le formulaire de contact, et comment les vidéos YouTube sont chargées sur le site.',
      h1: 'Confidentialité',
      blocks: [
        ['Formulaire de contact', 'Le nom, l’email, le téléphone et le message envoyés par le formulaire servent uniquement à vous répondre. Ils ne sont ni vendus ni partagés.'],
        ['Vos droits', 'Vous pouvez demander l’accès, la correction ou la suppression de vos données à tout moment par le formulaire de contact.'],
        ['Vidéos et cookies', 'Le site ne dépose pas de cookie de suivi. Une vidéo YouTube ne se charge, depuis youtube-nocookie.com, que lorsque vous cliquez sur lecture.'],
      ],
    },
  },

  en: {
    htmlLang: 'en', ogLocale: 'en_GB', langName: 'English', short: 'EN',
    ui: {
      skip: 'Skip to content', mainNav: 'Main navigation', menu: 'Menu', langNav: 'Language',
      cta: 'Request a demo', play: 'Play the video', privacy: 'Privacy', legal: 'Legal notice', rights: 'VirtuaSmart',
      versions: { fr: 'The video in French', en: 'The video in English', pt: 'The video in Portuguese' },
    },
    nav: {
      offer: 'Services', method: 'Method', examples: 'Examples', motion: 'Motion design', agency: 'Agency', contact: 'Contact',
      ids: { offer: 'services', method: 'method', agency: 'agency', faq: 'questions' },
      menu: {
        formats: 'Formats',
        items: [
          ['Management reports', 'Monthly, quarterly, annual'],
          ['Manager’s message', 'Market update, strategy, news'],
          ['Newsletter and LinkedIn', 'In your brand’s colours'],
        ],
        how: 'Method',
        howItems: [
          ['Avatar creation', 'A photo or a green-screen shoot'],
          ['175 languages', 'The same voice in each one'],
        ],
        cardTitle: 'One avatar in 3 languages',
        cardLine: 'Seven videos to watch',
      },
    },
    footer: {
      lede: 'AI avatar videos for finance.',
      cols: { offer: 'Services', company: 'VirtuaSmart' },
      motion: 'Motion design projects',
    },
    home: {
      title: 'VirtuaSmart: AI avatar videos for asset managers',
      description: 'Your fund manager writes the text; we deliver the video with their AI avatar and voice, in 175+ languages, the next day. Management reports, market updates, newsletters.',
      hero: {
        kicker: '175+ languages, in the same voice',
        h1: 'AI avatar videos for asset managers',
        lead: 'Your fund manager writes the report or market update. We turn it into a video with their own avatar and voice, with no filming.',
        second: 'See the examples',
        floatLabel: 'Turnaround', floatValue: '7 days a week',
        floatTitle: 'Video delivered the day after the text is approved',
        alt: 'A fund manager in a navy suit speaks to camera in a high-rise office, the city behind the windows',
      },
      offer: {
        h2: 'Four formats for talking to your clients',
        lead: 'Every video starts from a text written by your investment team.',
        rows: [
          ['Management reports', 'Your monthly, quarterly or annual reports become short videos, with the same financial rigour.', 'A portfolio manager presents her quarterly report to camera, in front of a performance chart'],
          ['Manager’s message and market update', 'A market comment or a strategic decision, published without filming. A short announcement goes out the same day.', 'A strategist gives a market update to camera in front of a wall of market screens'],
          ['Newsletter, LinkedIn and website', 'Videos in your brand’s tone and colours, with animated charts and key figures.', 'A laptop and a phone show a fund manager’s video in a social feed'],
          ['Advertising', 'Spots made entirely with AI avatars, set in surroundings that reflect your brand.', 'An executive in a royal blue suit walks through the glass lobby of a financial firm'],
        ],
      },
      method: {
        h2: 'From text to video in three steps',
        steps: [
          ['We create your avatar', 'From a single photo or a green-screen shoot in your offices, with your own voice. A generic avatar is also possible.', 'A green-screen shoot in a meeting room, camera and lights facing the fund manager'],
          ['Your manager writes the text', 'They email it from wherever they are, in any time zone. Nothing to film, no studio, no travel.', 'A fund manager writes his market commentary on a laptop'],
          ['We deliver the video', 'Voice, motion design, charts, subtitles and editing. The video arrives the day after the text is approved.', 'An editor assembles the manager’s video with animated charts'],
        ],
      },
      langs: {
        h2: 'One avatar, one voice, three languages',
        lead: 'This fictional avatar and its voice are generated by VirtuaSmart. We produce your videos in more than 175 languages and dialects.',
      },
      agency: {
        h2: 'A video studio for twenty years',
        lead: 'Before AI avatars, we made TV graphics, visual identities and post-production for major brands and television broadcasters.',
        facts: [['1,000+', 'videos produced'], ['20 years', 'of post-production'], ['175+', 'languages and dialects']],
        link: 'See our motion design projects',
        alt: 'A green-screen virtual set with a presenter, two cameras and market screens',
      },
      faq: {
        h2: 'Questions from asset managers',
        lead: 'Another question about your project?',
        link: 'Write to the team',
        alt: 'A client watches a fund manager’s video on her tablet',
        items: [
          ['Do you need to film the manager for the avatar?', 'No. One photo is enough to create the avatar. For more realism, we film once on a green screen in your offices.'],
          ['Who writes the video’s text?', 'Your manager or your team. We produce the video from that text without changing its substance, so you keep full control of the content.'],
          ['How long does a video take?', 'The full video is delivered the day after the text is approved, 7 days a week. A short announcement can go out the same day.'],
          ['Which languages can the video be in?', 'More than 175 languages and dialects, with your manager’s voice in each one.'],
          ['Is there a maximum video length?', 'No, there is no length limit.'],
        ],
      },
      close: {
        h2: 'A 30-second demo made from your text',
        line: 'Send us a text from your fund manager and we turn it into a 30-second video with an AI avatar.',
      },
    },
    examples: {
      title: 'Examples of AI avatar videos | VirtuaSmart',
      description: 'Seven videos produced by VirtuaSmart: the same avatar in French, English and Portuguese, messages with no length limit and an advert made with AI avatars.',
      crumb: 'Examples',
      hero: {
        kicker: '7 videos, 3 languages',
        h1: 'Examples of AI avatar videos',
        lead: 'The same avatar in French, English and Portuguese, messages with no length limit, and an advert made entirely with AI avatars.',
        second: 'Watch the advert',
        alt: 'A green-screen virtual set with a presenter, two cameras and market screens',
      },
      welcome: { id: 'welcome', h2: 'Welcome to VirtuaSmart, in three languages', lead: 'The avatar and its voice are generated by us. Yours can be made from a photo or a shoot in your offices.' },
      simple: { id: 'constraint-free', h2: 'A video with no length limit', lead: 'Simple and constraint-free, in every language: a text is all you need to speak to your clients on video.' },
      ad: {
        id: 'advert', h2: 'An advert made with AI avatars',
        steps: [
          'We come to your offices to film or photograph your team.',
          'We train our models on your images and your voice.',
          'We generate the avatar on a green screen.',
          'We place it in surroundings that reflect your brand.',
          'In post-production, we add motion design and subtitles.',
        ],
        alt: 'A trader avatar at his desk in front of market screens, with the title “Anything new?”',
      },
      motion: {
        id: 'motion-design', h2: 'Motion design for your videos',
        lead: 'Animated charts, key figures, simple diagrams and keywords support the manager’s words and make complex messages easy to follow.',
        link: 'See 50 of our projects',
        alt: 'An editor assembles the manager’s video with animated charts',
      },
    },
    contact: {
      title: 'Contact and 30-second video demo | VirtuaSmart',
      description: 'Request a 30-second demo made from your text, or create your fund manager’s AI avatar with VirtuaSmart now.',
      crumb: 'Contact',
      h1: 'Contact and 30-second video demo',
      lead: 'Send us a text from your fund manager and we send back a 30-second video with an AI avatar. Already convinced? We can create your avatars right away.',
      form: {
        name: 'Name', email: 'Work email', phone: 'Phone (optional)', message: 'Your text or what you need',
        errName: 'Write your name.', errEmail: 'Write an email address with an @, like name@company.com.', errMessage: 'Write a few lines about your project.',
        sent: 'Your demo request is sent. We will reply by email.',
        reply: 'We reply by email. Your details are used only to answer you.',
      },
    },
    motionPage: {"title": "Motion design and TV graphics: 50 projects | VirtuaSmart", "description": "Brand films, animated logos and on-air graphics made for Edenred, EDF, Castorama, M6, W9 and Fun Radio. 50 videos to watch.", "crumb": "Motion design", "kicker": "50 projects to watch", "h1": "Motion design and TV graphics", "lead": "Brand films for Edenred, EDF and Dacia, on-air graphics for M6, W9 and Fun Radio: the craft that now drives your avatar videos.", "second": "See the brand films", "heroAlt": "Opening titles for the 15th anniversary of Scènes de Ménages", "groups": {"brands": ["Brand films and identities", "Brand films, animated identities and trailers for listed groups and institutions."], "identities": ["Animated logos and corporate greetings", "Animated logos, greetings and corporate presentations, from Cromology to Atos."], "tv": ["TV and radio graphics", "Opening titles, idents and on-air graphics for M6, W9, Gulli and Fun Radio."], "tvArchive": ["TV titles and spots", "Opening titles, trailers and spots for M6, W9, RTL2 and Public Sénat."]}, "vimeo": "See the showcase on Vimeo"},
    legal: {"title": "Legal notice | VirtuaSmart", "description": "Publisher, host and intellectual property of the virtua-smart.com website.", "h1": "Legal notice", "blocks": [["Publisher", "VirtuaSmart, sole proprietorship of Maximilien Chanu (French micro-entrepreneur). SIRET 501 109 201 00035. Contact: contact@virtua-smart.com."], ["Publication director", "Maximilien Chanu."], ["Host", "GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (GitHub Pages)."], ["Intellectual property", "The videos, avatars, images and texts on this site belong to VirtuaSmart. Any reproduction without written consent is prohibited."]]},
    privacy: {
      title: 'Privacy | VirtuaSmart',
      description: 'What VirtuaSmart does with the details sent through the contact form, and how YouTube videos load on this site.',
      h1: 'Privacy',
      blocks: [
        ['Contact form', 'The name, email, phone and message sent through the form are used only to answer you. They are never sold or shared.'],
        ['Your rights', 'You can ask to see, correct or delete your data at any time through the contact form.'],
        ['Videos and cookies', 'This site sets no tracking cookies. A YouTube video loads, from youtube-nocookie.com, only when you press play.'],
      ],
    },
  },

  pt: {
    htmlLang: 'pt-BR', ogLocale: 'pt_BR', langName: 'Português', short: 'PT',
    ui: {
      skip: 'Ir para o conteúdo', mainNav: 'Navegação principal', menu: 'Menu', langNav: 'Idioma',
      cta: 'Pedir uma demo', play: 'Assistir ao vídeo', privacy: 'Privacidade', legal: 'Aviso legal', rights: 'VirtuaSmart',
      versions: { fr: 'O vídeo em francês', en: 'O vídeo em inglês', pt: 'O vídeo em português' },
    },
    nav: {
      offer: 'Oferta', method: 'Método', examples: 'Exemplos', motion: 'Motion design', agency: 'Agência', contact: 'Contato',
      ids: { offer: 'oferta', method: 'metodo', agency: 'agencia', faq: 'perguntas' },
      menu: {
        formats: 'Formatos',
        items: [
          ['Relatórios de gestão', 'Mensais, trimestrais, anuais'],
          ['Mensagem do gestor', 'Mercado, estratégia, anúncios'],
          ['Newsletter e LinkedIn', 'Nas cores da sua marca'],
        ],
        how: 'Método',
        howItems: [
          ['Criação do avatar', 'Uma foto ou gravação em fundo verde'],
          ['175 idiomas', 'A mesma voz em cada idioma'],
        ],
        cardTitle: 'O mesmo avatar em 3 idiomas',
        cardLine: 'Sete vídeos para assistir',
      },
    },
    footer: {
      lede: 'Vídeos com avatar IA para o setor financeiro.',
      cols: { offer: 'Oferta', company: 'VirtuaSmart' },
      motion: 'Projetos de motion design',
    },
    home: {
      title: 'VirtuaSmart: vídeos com avatar IA para gestoras de ativos',
      description: 'O gestor escreve o texto e nós entregamos o vídeo com o avatar IA e a voz dele, em mais de 175 idiomas, no dia seguinte. Relatórios de gestão, análises de mercado, newsletters.',
      hero: {
        kicker: 'Mais de 175 idiomas, com a mesma voz',
        h1: 'Vídeos com avatar IA para gestoras de ativos',
        lead: 'O gestor escreve o relatório ou a análise de mercado. Nós transformamos o texto em vídeo com o avatar e a voz dele, sem filmagem.',
        second: 'Ver os exemplos',
        floatLabel: 'Prazo', floatValue: '7 dias por semana',
        floatTitle: 'Vídeo entregue no dia seguinte à aprovação do texto',
        alt: 'Um gestor de terno azul fala para a câmera num escritório alto, com a cidade atrás das janelas',
      },
      offer: {
        h2: 'Quatro formatos para falar com seus clientes',
        lead: 'Cada vídeo começa com um texto escrito pela sua equipe de gestão.',
        rows: [
          ['Relatórios de gestão', 'Seus relatórios mensais, trimestrais ou anuais viram vídeos curtos, com o mesmo rigor financeiro.', 'Uma gestora apresenta o relatório trimestral para a câmera, diante de um gráfico de desempenho'],
          ['Mensagem do gestor e análise de mercado', 'Um comentário de mercado ou uma decisão estratégica, publicado sem filmagem. Um anúncio curto sai no mesmo dia.', 'Um estrategista faz a análise de mercado para a câmera, diante de um painel de cotações'],
          ['Newsletter, LinkedIn e site', 'Vídeos no tom e nas cores da sua marca, com gráficos animados e números-chave.', 'Um notebook e um celular mostram o vídeo de um gestor num feed'],
          ['Publicidade', 'Anúncios feitos inteiramente com avatares IA, num cenário que reflete a sua marca.', 'Uma executiva de terno azul atravessa o saguão de vidro de uma empresa financeira'],
        ],
      },
      method: {
        h2: 'Do texto ao vídeo em três etapas',
        steps: [
          ['Criamos o seu avatar', 'A partir de uma simples foto ou de uma gravação em fundo verde no seu escritório, com a sua voz. Também é possível um avatar genérico.', 'Gravação em fundo verde numa sala de reunião, câmera e luzes diante do gestor'],
          ['O gestor escreve o texto', 'Ele o envia por email, de onde estiver, em qualquer fuso horário. Nada para filmar, sem estúdio, sem viagens.', 'Um gestor escreve o comentário de mercado no notebook'],
          ['Entregamos o vídeo', 'Voz, motion design, gráficos, legendas e edição. O vídeo chega no dia seguinte à aprovação do texto.', 'Um editor monta o vídeo do gestor com gráficos animados'],
        ],
      },
      langs: {
        h2: 'O mesmo avatar, a mesma voz, em três idiomas',
        lead: 'Este avatar fictício e a sua voz foram gerados pela VirtuaSmart. Produzimos seus vídeos em mais de 175 idiomas e dialetos.',
      },
      agency: {
        h2: 'Um estúdio de vídeo há vinte anos',
        lead: 'Antes dos avatares IA, fazíamos grafismo para TV, identidade visual e pós-produção para grandes marcas e emissoras de televisão.',
        facts: [['1.000+', 'vídeos produzidos'], ['20 anos', 'de pós-produção'], ['175+', 'idiomas e dialetos']],
        link: 'Ver nossos projetos de motion design',
        alt: 'Um estúdio virtual de fundo verde com um apresentador, duas câmeras e telas de mercado',
      },
      faq: {
        h2: 'Perguntas das gestoras de ativos',
        lead: 'Outra pergunta sobre o seu projeto?',
        link: 'Escrever para a equipe',
        alt: 'Uma cliente assiste no tablet ao vídeo de um gestor',
        items: [
          ['É preciso filmar o gestor para criar o avatar?', 'Não. Uma foto basta para criar o avatar. Para mais realismo, gravamos uma vez em fundo verde no seu escritório.'],
          ['Quem escreve o texto do vídeo?', 'O gestor ou a sua equipe. Produzimos o vídeo a partir desse texto sem mudar o conteúdo: você mantém o controle total.'],
          ['Qual é o prazo de um vídeo?', 'O vídeo completo é entregue no dia seguinte à aprovação do texto, 7 dias por semana. Um anúncio curto pode sair no mesmo dia.'],
          ['Em quais idiomas sai o vídeo?', 'Mais de 175 idiomas e dialetos, com a voz do seu gestor em cada um.'],
          ['O vídeo tem duração máxima?', 'Não, não há limite de duração.'],
        ],
      },
      close: {
        h2: 'Uma demo de 30 segundos com o seu texto',
        line: 'Envie um texto do seu gestor e nós o transformamos num vídeo de 30 segundos com um avatar IA.',
      },
    },
    examples: {
      title: 'Exemplos de vídeos com avatar IA | VirtuaSmart',
      description: 'Sete vídeos produzidos pela VirtuaSmart: o mesmo avatar em francês, inglês e português, mensagens sem limite de duração e um anúncio feito com avatares IA.',
      crumb: 'Exemplos',
      hero: {
        kicker: '7 vídeos, 3 idiomas',
        h1: 'Exemplos de vídeos com avatar IA',
        lead: 'O mesmo avatar em francês, inglês e português, mensagens sem limite de duração e um anúncio feito inteiramente com avatares IA.',
        second: 'Assistir ao anúncio',
        alt: 'Um estúdio virtual de fundo verde com um apresentador, duas câmeras e telas de mercado',
      },
      welcome: { id: 'bem-vindo', h2: 'Bem-vindo à VirtuaSmart, em três idiomas', lead: 'O avatar e a sua voz foram gerados por nós. O seu pode ser criado a partir de uma foto ou de uma gravação no seu escritório.' },
      simple: { id: 'sem-complicacoes', h2: 'Um vídeo sem limite de duração', lead: 'Simples e sem complicações, em todos os idiomas: um texto basta para falar com seus clientes em vídeo.' },
      ad: {
        id: 'anuncio', h2: 'Um anúncio feito com avatares IA',
        steps: [
          'Vamos ao seu escritório filmar ou fotografar a sua equipe.',
          'Treinamos nossos modelos com suas imagens e sua voz.',
          'Geramos o avatar em fundo verde.',
          'Colocamos o avatar num cenário que reflete a sua marca.',
          'Na pós-produção, adicionamos motion design e legendas.',
        ],
        alt: 'Um avatar de trader à mesa diante de telas de cotações, com o título “Anything new?”',
      },
      motion: {
        id: 'motion-design', h2: 'Motion design para seus vídeos',
        lead: 'Gráficos animados, números-chave, diagramas simples e palavras-chave acompanham a fala do gestor e tornam claras mensagens complexas.',
        link: 'Ver 50 dos nossos projetos',
        alt: 'Um editor monta o vídeo do gestor com gráficos animados',
      },
    },
    contact: {
      title: 'Contato e demo de vídeo de 30 segundos | VirtuaSmart',
      description: 'Peça uma demo de 30 segundos feita a partir do seu texto, ou crie agora o avatar IA do seu gestor com a VirtuaSmart.',
      crumb: 'Contato',
      h1: 'Contato e demo de vídeo de 30 segundos',
      lead: 'Envie um texto do seu gestor e devolvemos um vídeo de 30 segundos com um avatar IA. Já está convencido? Criamos seus avatares agora mesmo.',
      form: {
        name: 'Nome', email: 'Email profissional', phone: 'Telefone (opcional)', message: 'Seu texto ou sua necessidade',
        errName: 'Escreva o seu nome.', errEmail: 'Escreva um email com @, como nome@empresa.com.', errMessage: 'Escreva algumas linhas sobre o seu projeto.',
        sent: 'Seu pedido de demo foi enviado. Respondemos por email.',
        reply: 'Respondemos por email. Seus dados servem apenas para responder a você.',
      },
    },
    motionPage: {"title": "Motion design e grafismo para TV: 50 projetos | VirtuaSmart", "description": "Filmes de marca, logos animados e grafismo de emissora feitos para Edenred, EDF, Castorama, M6, W9 e Fun Radio. 50 vídeos para assistir.", "crumb": "Motion design", "kicker": "50 projetos para assistir", "h1": "Motion design e grafismo para TV", "lead": "Filmes de marca para Edenred, EDF e Dacia, grafismo de emissora para M6, W9 e Fun Radio: o know-how que hoje anima seus vídeos com avatar.", "second": "Ver os filmes de marca", "heroAlt": "Abertura dos 15 anos de Scènes de Ménages", "groups": {"brands": ["Filmes de marca e identidades", "Filmes de marca, identidades animadas e trailers para grupos de capital aberto e instituições."], "identities": ["Logos animados e votos corporativos", "Logos animados, votos e apresentações corporativas, da Cromology à Atos."], "tv": ["Grafismo de TV e rádio", "Aberturas, vinhetas e grafismo de emissora para M6, W9, Gulli e Fun Radio."], "tvArchive": ["Aberturas e spots de TV", "Aberturas, trailers e spots para M6, W9, RTL2 e Public Sénat."]}, "vimeo": "Ver a vitrine no Vimeo"},
    legal: {"title": "Aviso legal | VirtuaSmart", "description": "Editor, hospedagem e propriedade intelectual do site virtua-smart.com.", "h1": "Aviso legal", "blocks": [["Editor do site", "VirtuaSmart, empresa individual de Maximilien Chanu (microempresário francês). SIRET 501 109 201 00035. Contato: contact@virtua-smart.com."], ["Diretor de publicação", "Maximilien Chanu."], ["Hospedagem", "GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (GitHub Pages)."], ["Propriedade intelectual", "Os vídeos, avatares, imagens e textos deste site pertencem à VirtuaSmart. É proibida qualquer reprodução sem autorização por escrito."]]},
    privacy: {
      title: 'Privacidade | VirtuaSmart',
      description: 'O que a VirtuaSmart faz com os dados enviados pelo formulário de contato e como os vídeos do YouTube são carregados no site.',
      h1: 'Privacidade',
      blocks: [
        ['Formulário de contato', 'O nome, o email, o telefone e a mensagem enviados pelo formulário servem apenas para responder a você. Não são vendidos nem compartilhados.'],
        ['Seus direitos', 'Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo formulário de contato.'],
        ['Vídeos e cookies', 'O site não usa cookies de rastreamento. Um vídeo do YouTube só carrega, a partir de youtube-nocookie.com, quando você clica em assistir.'],
      ],
    },
  },
};

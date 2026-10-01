export interface CookieCategory {
  name: string;
  desc: string;
}

export interface CookieInventoryRow {
  label: string;
  value: string;
}

export interface CookieSection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  categories?: CookieCategory[];
  inventory?: CookieInventoryRow[];
  listItems?: string[];
}

export interface CookiePolicyContent {
  documentTitle: string;
  badge: string;
  versionLabel: string;
  versionNumber: string;
  versionDate: string;
  effectiveLabel: string;
  effectiveDate: string;
  tocTitle: string;
  relatedPolicyLabel: string;
  relatedPolicyHref: string;
  sections: CookieSection[];
}

export const cookiePolicyData: Record<'ro' | 'ru' | 'en', CookiePolicyContent> = {
  ro: {
    documentTitle: 'POLITICA COOKIE-URI',
    badge: 'Document Oficial privind Cookie-urile',
    versionLabel: 'Versiunea',
    versionNumber: '1.1',
    versionDate: '27.08.2028',
    effectiveLabel: 'În vigoare din',
    effectiveDate: '27.08.2026',
    tocTitle: 'Cuprins politică',
    relatedPolicyLabel: 'Politica de confidențialitate',
    relatedPolicyHref: '/politica-de-confidentialitate',
    sections: [
      {
        id: 'introducere',
        number: '1',
        title: 'INTRODUCERE',
        paragraphs: [
          'Această politică explică modul în care S.R.L. „Plasma RTI” (IDNO 1003600107651) prelucrează datele personale prin site-ul www.rparking.md, în conformitate cu Legea nr. 195/2024 privind protecția datelor cu caracter personal.',
          'Cookie-urile și tehnologiile similare sunt fișiere sau valori stocate pe dispozitiv pentru funcționarea site-ului, memorarea preferințelor, analiză ori marketing. Cookie-urile necesare sunt utilizate pentru funcțiile solicitate; celelalte categorii sunt activate numai după alegerea dvs.',
        ],
      },
      {
        id: 'categorii',
        number: '2',
        title: 'CATEGORII',
        categories: [
          { name: 'Necesare', desc: 'securitate, autentificare, sesiune și funcții esențiale.' },
          { name: 'Preferințe', desc: 'funcții opționale și conținut extern.' },
          { name: 'Analiză', desc: 'statistici și măsurarea utilizării.' },
          { name: 'Marketing', desc: 'măsurarea campaniilor și publicitate.' },
        ],
      },
      {
        id: 'inventar',
        number: '3',
        title: 'INVENTAR',
        inventory: [
          { label: 'Denumire', value: 'NEXT_LOCALE' },
          { label: 'Scop', value: 'reține limba selectată pentru afișarea site-ului (ro, en sau ru)' },
          { label: 'Furnizor', value: 'RParking / RTi Systems, prin componenta tehnică next-intl' },
          { label: 'Durată', value: 'sesiune — cookie-ul nu are configurată o dată explicită de expirare' },
          { label: 'Categorie', value: 'funcțional / preferințe' },
        ],
      },
      {
        id: 'date-personale',
        number: '4',
        title: 'DATE PERSONALE COLECTATE PRIN COOKIE-URI',
        paragraphs: [
          'Prin cookie-uri și tehnologii similare pot fi prelucrate identificatori online, adresa IP, tipul dispozitivului și al navigatorului, paginile vizitate și evenimentele de interacțiune. Cookie-urile necesare se folosesc pentru furnizarea serviciului solicitat; cele de preferințe, analiză și marketing numai în baza consimțământului, care poate fi retras oricând.',
        ],
      },
      {
        id: 'controlul-optiunilor',
        number: '5',
        title: 'CONTROLUL OPȚIUNILOR',
        paragraphs: [
          'Puteți accepta, refuza sau modifica separat categoriile opționale, la fel de simplu cum le-ați acordat. De asemenea, puteți șterge cookie-urile din setările navigatorului; blocarea celor necesare poate împiedica funcționarea unor caracteristici.',
        ],
      },
      {
        id: 'securitate',
        number: '6',
        title: 'MĂSURI DE SECURITATE ȘI CONFIDENȚIALITATE',
        paragraphs: [
          'Opțiunile dvs. sunt păstrate local în navigator și înregistrate la operator împreună cu versiunea politicii, ca dovadă a alegerii. Identificatorii de rețea (adresa IP și agentul de navigare) se păstrează exclusiv sub formă de valori criptografice cu sare, nu în clar. Accesul administrativ la aceste evidențe este restricționat și jurnalizat. Transmiterea datelor se face prin conexiuni criptate.',
        ],
      },
      {
        id: 'actualizarea-politicii',
        number: '7',
        title: 'ACTUALIZAREA POLITICII',
        paragraphs: [
          'Actualizăm această politică atunci când se modifică serviciile utilizate, scopurile, duratele de stocare sau destinatarii. Fiecare actualizare primește o versiune nouă, iar categoriile opționale sunt supuse din nou alegerii dvs. Versiunile anterioare se păstrează de operator și pot fi solicitate la adresa de contact indicată mai sus.',
        ],
      },
    ],
  },
  en: {
    documentTitle: 'COOKIE POLICY',
    badge: 'Official Cookie Document',
    versionLabel: 'Version',
    versionNumber: '1.1',
    versionDate: '27.08.2028',
    effectiveLabel: 'Effective from',
    effectiveDate: '27.08.2026',
    tocTitle: 'Table of Contents',
    relatedPolicyLabel: 'Privacy Policy',
    relatedPolicyHref: '/politica-de-confidentialitate',
    sections: [
      {
        id: 'introducere',
        number: '1',
        title: 'INTRODUCTION',
        paragraphs: [
          'This policy explains how S.R.L. "Plasma RTI" (IDNO 1003600107651) processes personal data through the website www.rparking.md, in accordance with Law no. 195/2024 on personal data protection.',
          'Cookies and similar technologies are files or values stored on the device for the operation of the website, remembering preferences, analytics or marketing. Necessary cookies are used for the requested functions; the other categories are activated only after your choice.',
        ],
      },
      {
        id: 'categorii',
        number: '2',
        title: 'CATEGORIES',
        categories: [
          { name: 'Necessary', desc: 'security, authentication, session and essential functions.' },
          { name: 'Preferences', desc: 'optional features and external content.' },
          { name: 'Analytics', desc: 'statistics and usage measurement.' },
          { name: 'Marketing', desc: 'campaign measurement and advertising.' },
        ],
      },
      {
        id: 'inventar',
        number: '3',
        title: 'INVENTORY',
        inventory: [
          { label: 'Name', value: 'NEXT_LOCALE' },
          { label: 'Purpose', value: 'stores the selected language for site display (ro, en or ru)' },
          { label: 'Provider', value: 'RParking / RTi Systems, via the next-intl technical component' },
          { label: 'Duration', value: 'session — the cookie has no explicit expiry date configured' },
          { label: 'Category', value: 'functional / preferences' },
        ],
      },
      {
        id: 'date-personale',
        number: '4',
        title: 'PERSONAL DATA COLLECTED THROUGH COOKIES',
        paragraphs: [
          'Through cookies and similar technologies, online identifiers, IP address, device and browser type, pages visited and interaction events may be processed. Necessary cookies are used to provide the requested service; preference, analytics and marketing cookies only on the basis of consent, which can be withdrawn at any time.',
        ],
      },
      {
        id: 'controlul-optiunilor',
        number: '5',
        title: 'MANAGING YOUR OPTIONS',
        paragraphs: [
          'You can accept, refuse or separately modify the optional categories, as easily as you granted them. You can also delete cookies from your browser settings; blocking the necessary ones may prevent certain features from working.',
        ],
      },
      {
        id: 'securitate',
        number: '6',
        title: 'SECURITY AND CONFIDENTIALITY MEASURES',
        paragraphs: [
          'Your options are stored locally in the browser and recorded at the controller together with the policy version, as evidence of your choice. Network identifiers (IP address and user agent) are kept exclusively as salted cryptographic values, not in clear text. Administrative access to these records is restricted and logged. Data transmission is performed over encrypted connections.',
        ],
      },
      {
        id: 'actualizarea-politicii',
        number: '7',
        title: 'POLICY UPDATES',
        paragraphs: [
          'We update this policy when the services used, purposes, storage durations or recipients change. Each update receives a new version, and the optional categories are subject to your choice again. Previous versions are kept by the controller and can be requested at the contact address indicated above.',
        ],
      },
    ],
  },
  ru: {
    documentTitle: 'ПОЛИТИКА ИСПОЛЬЗОВАНИЯ COOKIE',
    badge: 'Официальный документ о файлах cookie',
    versionLabel: 'Версия',
    versionNumber: '1.1',
    versionDate: '27.08.2028',
    effectiveLabel: 'Вступает в силу с',
    effectiveDate: '27.08.2026',
    tocTitle: 'Содержание политики',
    relatedPolicyLabel: 'Политика конфиденциальности',
    relatedPolicyHref: '/politica-de-confidentialitate',
    sections: [
      {
        id: 'introducere',
        number: '1',
        title: 'ВВЕДЕНИЕ',
        paragraphs: [
          'Настоящая политика объясняет, как S.R.L. «Plasma RTI» (IDNO 1003600107651) обрабатывает персональные данные через сайт www.rparking.md в соответствии с Законом № 195/2024 о защите персональных данных.',
          'Файлы cookie и аналогичные технологии представляют собой файлы или значения, сохраняемые на устройстве для работы сайта, запоминания предпочтений, аналитики или маркетинга. Необходимые cookie используются для запрошенных функций; остальные категории активируются только после вашего выбора.',
        ],
      },
      {
        id: 'categorii',
        number: '2',
        title: 'КАТЕГОРИИ',
        categories: [
          { name: 'Необходимые', desc: 'безопасность, аутентификация, сессия и основные функции.' },
          { name: 'Предпочтения', desc: 'дополнительные функции и внешний контент.' },
          { name: 'Аналитика', desc: 'статистика и измерение использования.' },
          { name: 'Маркетинг', desc: 'измерение кампаний и реклама.' },
        ],
      },
      {
        id: 'inventar',
        number: '3',
        title: 'ИНВЕНТАРЬ',
        inventory: [
          { label: 'Наименование', value: 'NEXT_LOCALE' },
          { label: 'Назначение', value: 'сохраняет выбранный язык отображения сайта (ro, en или ru)' },
          { label: 'Провайдер', value: 'RParking / RTi Systems, через технический компонент next-intl' },
          { label: 'Срок хранения', value: 'сессия — у cookie не установлена явная дата истечения' },
          { label: 'Категория', value: 'функциональный / предпочтения' },
        ],
      },
      {
        id: 'date-personale',
        number: '4',
        title: 'ПЕРСОНАЛЬНЫЕ ДАННЫЕ, СОБИРАЕМЫЕ ЧЕРЕЗ COOKIE',
        paragraphs: [
          'Через файлы cookie и аналогичные технологии могут обрабатываться онлайн-идентификаторы, IP-адрес, тип устройства и браузера, посещённые страницы и события взаимодействия. Необходимые cookie используются для предоставления запрошенной услуги; cookie предпочтений, аналитики и маркетинга — только на основании согласия, которое может быть отозвано в любое время.',
        ],
      },
      {
        id: 'controlul-optiunilor',
        number: '5',
        title: 'УПРАВЛЕНИЕ НАСТРОЙКАМИ',
        paragraphs: [
          'Вы можете принять, отклонить или отдельно изменить необязательные категории так же просто, как вы их предоставили. Вы также можете удалить cookie в настройках браузера; блокировка необходимых cookie может помешать работе некоторых функций.',
        ],
      },
      {
        id: 'securitate',
        number: '6',
        title: 'МЕРЫ БЕЗОПАСНОСТИ И КОНФИДЕНЦИАЛЬНОСТИ',
        paragraphs: [
          'Ваши настройки хранятся локально в браузере и регистрируются у оператора вместе с версией политики в качестве доказательства вашего выбора. Сетевые идентификаторы (IP-адрес и пользовательский агент) хранятся исключительно в виде криптографических значений с солью, а не в открытом виде. Административный доступ к этим записям ограничен и журналируется. Передача данных осуществляется по зашифрованным соединениям.',
        ],
      },
      {
        id: 'actualizarea-politicii',
        number: '7',
        title: 'ОБНОВЛЕНИЕ ПОЛИТИКИ',
        paragraphs: [
          'Мы обновляем настоящую политику при изменении используемых сервисов, целей, сроков хранения или получателей. Каждое обновление получает новую версию, а необязательные категории снова подлежат вашему выбору. Предыдущие версии хранятся у оператора и могут быть запрошены по указанному выше контактному адресу.',
        ],
      },
    ],
  },
};

export interface PrivacySection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  subsections?: {
    id: string;
    title: string;
    categories?: string;
    basis?: string;
  }[];
  listItems?: string[];
  specialContent?: 'operator' | 'data_transfer' | 'dpo_contact' | 'authority' | 'retention';
  footerNote?: string;
}

export interface PrivacyPolicyContent {
  documentTitle: string;
  documentSubtitle: string;
  badge: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  tocTitle: string;
  cookiePolicyLinkLabel: string;
  sections: PrivacySection[];
  operatorInfo: {
    name: string;
    idno: string;
    address: string;
    email: string;
    representative: string;
    dpoName: string;
    dpoEmail: string;
    dpoPhone: string;
  };
  authorityInfo: {
    country: string;
    name: string;
    address: string;
    email: string;
    website: string;
  };
}

export const privacyData: Record<'ro' | 'ru' | 'en', PrivacyPolicyContent> = {
  ro: {
    documentTitle: 'POLITICA DE SECURITATE',
    documentSubtitle: 'privind prelucrarea datelor cu caracter personal',
    badge: 'Document Oficial de Confidențialitate',
    lastUpdatedLabel: 'Data ultimei revizuiri',
    lastUpdatedDate: '22.08.2026',
    tocTitle: 'Cuprins politică',
    cookiePolicyLinkLabel: 'Vezi Politica Cookie-uri',
    operatorInfo: {
      name: 'S.R.L. "Plasma RTI"',
      idno: '1003600107651',
      address: 'str-la Călătorilor, 30, Chișinău, MD2037, Republica Moldova',
      email: 'iulia.ivanov@rti.md',
      representative: 'Iulia',
      dpoName: 'Iulia',
      dpoEmail: 'iulia.ivanov@rti.md',
      dpoPhone: '+373 69 116 121',
    },
    authorityInfo: {
      country: 'Republica Moldova',
      name: 'Centrul Național pentru Protecția Datelor cu Caracter Personal',
      address: 'str. Serghei Lazo nr. 48, Chișinău',
      email: 'centru@datepersonale.md',
      website: 'www.datepersonale.md',
    },
    sections: [
      {
        id: 'cine-suntem',
        number: '1',
        title: 'CINE SUNTEM – OPERATORUL DE DATE',
        paragraphs: [
          'Prezenta Politică de Confidențialitate descrie modul în care Plasma RTI SRL (în continuare „noi” sau „Operatorul”) colectează, utilizează, stochează și protejează datele cu caracter personal ale persoanelor care accesează site-ul www.rparking.md, lasă datele de contact pentru a primi informații despre serviciile prestate, precum și ale beneficiarilor serviciilor sale.',
        ],
        specialContent: 'operator',
      },
      {
        id: 'cadrul-legal',
        number: '2',
        title: 'CADRUL LEGAL APLICABIL',
        paragraphs: ['Prelucrarea datelor cu caracter personal se realizează în conformitate cu:'],
        listItems: [
          'Legea nr. 195/2024 privind protecția datelor cu caracter personal (Republica Moldova);',
          'Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018 (România), în măsura în care sunt aplicabile;',
          'Legislația secundară și deciziile autorităților de supraveghere competente.',
        ],
      },
      {
        id: 'definitii',
        number: '3',
        title: 'DEFINIȚII',
        listItems: [
          'Date cu caracter personal: orice informație privind o persoană fizică identificată sau identificabilă (persoana vizată).',
          'Prelucrare: orice operațiune sau set de operațiuni efectuate asupra datelor cu caracter personal sau asupra seturilor de date cu caracter personal, cu sau fără utilizarea de mijloace automatizate, cum ar fi colectarea, înregistrarea, organizarea, structurarea, stocarea, adaptarea sau modificarea, extragerea, consultarea, utilizarea, divulgarea prin transmitere, diseminarea sau punerea la dispoziție în orice alt mod, alinierea sau combinarea, restricționarea, ștergerea sau distrugerea.',
          'Operator: persoana care stabilește scopurile și mijloacele prelucrării;',
          'Persoană împuternicită: persoana care prelucrează datele în numele operatorului (ex. furnizori de servicii).',
          'Persoană vizată: utilizatorul/beneficiarul ale cărui date sunt prelucrate.',
          'Consimțământ: manifestarea de voință liberă, specifică, informată și lipsită de ambiguitate a persoanei vizate.',
        ],
      },
      {
        id: 'ce-date-prelucram',
        number: '4',
        title: 'CE DATE PRELUCRĂM, ÎN CE SCOP ȘI TEMEIUL LEGAL PE CARE NE BAZĂM',
        paragraphs: [
          'Prelucrăm datele dumneavoastră pentru scopurile de mai jos, fiecare având un temei juridic corespunzător:',
        ],
        subsections: [
          {
            id: 'cont-utilizator',
            title: '4.1. Crearea și administrarea contului de utilizator',
            categories: 'nume, prenume, e-mail, date de autentificare, preferințe',
            basis: 'executarea contractului (furnizarea serviciului) – art. 5 alin. (1) lit. b) din Legea 195/2024',
          },
          {
            id: 'furnizare-servicii',
            title: '4.2. Furnizarea serviciilor',
            categories: 'nume, prenume, adresă de e-mail, număr de telefon',
            basis: 'executarea contractului',
          },
          {
            id: 'facturare-plati',
            title: '4.3. Facturare și procesarea plăților',
            categories: 'date de facturare, detalii de plată',
            basis: 'obligație legală (contabilă/fiscală) și executarea contractului',
          },
          {
            id: 'marketing',
            title: '4.4. Comunicări de marketing, newsletter, oferte personalizate',
            categories: 'tipul și locația afacerii',
            basis: 'consimțământ – poate fi retras oricând',
          },
          {
            id: 'analiza-imbunatatire',
            title: '4.5. Analiză și îmbunătățirea site-ului',
            categories: 'date de navigare, cookie-uri de performanță',
            basis: 'consimțământ (cookie-uri neesențiale) / interes legitim pentru cookie-urile esențiale',
          },
          {
            id: 'litigii',
            title: '4.7. Soluționarea solicitărilor, litigiilor și apărarea drepturilor în justiție',
            categories: 'istoric solicitări, date relevante cazului',
            basis: 'interes legitim / obligație legală',
          },
        ],
        footerNote:
          'Furnizarea datelor marcate ca necesare pentru încheierea contractului este obligatorie pentru a beneficia de servicii; refuzul acestora poate face imposibilă prestarea serviciului. Furnizarea datelor pentru marketing este facultativă.',
      },
      {
        id: 'sursa-datelor',
        number: '5',
        title: 'SURSA DATELOR',
        paragraphs: [
          'Colectăm datele în principal direct de la dumneavoastră (la vizionarea site-ului, la achiziția serviciilor prin formulare de contact).',
        ],
      },
      {
        id: 'pastrare-date',
        number: '6',
        title: 'CÂT TIMP PĂSTRĂM DATELE',
        paragraphs: [
          'Păstrăm datele doar pe perioada necesară îndeplinirii scopurilor pentru care au fost colectate, după cum urmează:',
        ],
        listItems: [
          'Datele privind contul dvs.: pe durata cât contul este activ și nu a fost dezactivat și ulterior încă 3 ani din data ultimei accesări a contului.',
          'Datele colectate pentru livrarea serviciilor: 3 ani de la încetarea contractului sau din data desfășurării trainingului.',
          'Documente de facturare/fiscale: 6 ani.',
          'Date pentru marketing: până la retragerea consimțământului sau până la 3 ani în caz de inactivitate.',
          'Cookie-uri: conform duratelor din Politica de cookie-uri / bannerul de consimțământ.',
        ],
        footerNote: 'La expirarea termenelor, datele sunt șterse sau anonimizate în mod securizat.',
      },
      {
        id: 'destinatari',
        number: '7',
        title: 'CUI TRANSMITEM DATELE (DESTINATARI)',
        paragraphs: [
          'Nu vindem datele dumneavoastră. Putem divulga date, în măsura necesară, către următoarele categorii de destinatari:',
        ],
        listItems: [
          'Furnizori de găzduire și infrastructură IT;',
          'Furnizori de instrumente de analiză și marketing: OpenAI (Datele nu sunt folosite pentru antrenament. Pot fi reținute temporar ~30 de zile pentru siguranță, după care sunt șterse. Referință: https://openai.com/policies/api-data-usage-policies în cazul în care vă exprimați acordul în bannerul de cookies); Telegram (Mesajele de notificare rămân în istoricul chat-ului intern pe termen nedefinit, conform politicii Telegram);',
          'Autorități publice, atunci când există o obligație legală;',
          'Consultanți profesionali – avocați, auditori și alți consilieri, numai în măsura necesară pentru constatarea, exercitarea sau apărarea unui drept.',
        ],
        footerNote:
          'Furnizorii care prelucrează date în numele nostru acționează ca persoane împuternicite, în baza unor contracte care impun garanții de securitate și confidențialitate.',
      },
      {
        id: 'transferuri-internationale',
        number: '8',
        title: 'TRANSFERURI INTERNAȚIONALE DE DATE',
        paragraphs: [
          'Unele instrumente pe care le folosim (ex. OpenAI) pot implica transferul datelor către state terțe, inclusiv Statele Unite ale Americii. Aceste transferuri se realizează numai cu garanții adecvate, precum clauzele contractuale standard, precum și în baza acordului dvs. exprimat la selecția tipurilor de cookies de pe pagina noastră.',
          'În cazul în care optați pentru comunicarea cu noi prin intermediul aplicațiilor de mesagerie instantanee (Viber, Telegram, WhatsApp) sau rețelelor de socializare (Facebook, Instagram, LinkedIn), datele vor fi stocate și prelucrate conform politicilor de securitate a acestor platforme, Plasma RTI SRL nefiind responsabilă de aceste prelucrări de date ulterioare.',
          'În cazul în care solicitați comunicarea prin intermediul aplicațiilor de mesagerie instantanee (Viber, Telegram, WhatsApp), sunteți de acord cu privire la transferul transfrontalier de date conform politicilor de securitate ale acestor platforme.',
        ],
      },
      {
        id: 'cookie-uri',
        number: '9',
        title: 'COOKIE-URI ȘI TEHNOLOGII SIMILARE',
        paragraphs: [
          'Utilizăm cookie-uri de sesiune, de performanță, de funcționalitate și de publicitate. Cookie-urile neesențiale (performanță, publicitate, inclusiv Facebook Pixel și Google) sunt activate numai după obținerea consimțământului dumneavoastră prealabil, exprimat prin bannerul de cookie-uri.',
          'Puteți accepta, refuza sau retrage consimțământul pentru categoriile de cookie-uri neesențiale în orice moment. Detalii complete despre fiecare cookie sunt disponibile în Politica de cookie-uri.',
        ],
      },
      {
        id: 'marketing-profilare',
        number: '10',
        title: 'MARKETING PERSONALIZAT ȘI PROFILARE',
        paragraphs: [
          'În scopuri de marketing putem analiza preferințele și comportamentul de navigare pentru a vă oferi conținut și oferte relevante. Aceste operațiuni se bazează pe consimțământ și nu produc efecte juridice sau consecințe similare semnificative asupra dumneavoastră. Vă puteți opune oricând acestui tip de prelucrare, fără a afecta accesul la servicii.',
        ],
      },
      {
        id: 'drepturile-dumneavoastra',
        number: '11',
        title: 'DREPTURILE DUMNEAVOASTRĂ',
        paragraphs: ['În calitate de persoană vizată, beneficiați de următoarele drepturi:'],
        listItems: [
          'Dreptul de acces la datele prelucrate, inclusiv de a solicita copii de pe datele care vă vizează;',
          'Dreptul la rectificare a datelor incorecte sau incomplete;',
          'Dreptul la ștergere („dreptul de a fi uitat”), în condițiile legii;',
          'Dreptul la restricționarea prelucrării;',
          'Dreptul la portabilitatea datelor;',
          'Dreptul la opoziție, inclusiv față de prelucrarea în scop de marketing;',
          'Dreptul de a retrage consimțământul oricând, fără a afecta legalitatea prelucrării anterioare;',
          'Dreptul de a nu face obiectul unei decizii automate cu efecte semnificative;',
          'Dreptul de a depune plângere la autoritatea de supraveghere și de a vă adresa instanței de judecată în cazul în care considerați că ați fost lezat într-un drept legal.',
        ],
        footerNote:
          'Vă puteți exercita drepturile scriindu-ne la iulia.ivanov@rti.md sau prin contactarea la numerele de telefon afișate. În vederea examinării cererii dvs. avem dreptul de a solicita date suplimentare în vederea identificării dvs. Răspundem cererilor dumneavoastră fără întârziere și, în principiu, în cel mult o lună de la primire. Acest termen poate fi prelungit cu cel mult două luni pentru cereri complexe care necesită investigații ample; în acest caz vă informăm în prima lună despre prelungire și motivele ei.',
      },
      {
        id: 'autoritatea-supraveghere',
        number: '12',
        title: 'AUTORITATEA DE SUPRAVEGHERE',
        paragraphs: [
          'Dacă apreciați că drepturile dumneavoastră au fost încălcate, aveți dreptul de a depune o plângere la autoritatea competentă:',
        ],
        specialContent: 'authority',
      },
      {
        id: 'securitatea-datelor',
        number: '13',
        title: 'SECURITATEA DATELOR',
        paragraphs: [
          'Aplicăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor împotriva accesului neautorizat, pierderii, distrugerii sau divulgării, printre care:',
        ],
        listItems: [
          'criptarea datelor în tranzit și în stocare;',
          'controlul accesului;',
          'instruirea personalului;',
          'politici interne de securitate;',
          'evaluări periodice de risc;',
          'proceduri de gestionare a incidentelor de securitate.',
        ],
        footerNote:
          'Angajații și persoanele împuternicite de noi sunt supuși clauzelor de confidențialitate și au reguli clare de protecție a datelor. În cazul unui incident de securitate care vă poate afecta, gestionăm situația conform obligațiilor legale, inclusiv notificarea autorității și, când este cazul, informarea dumneavoastră.',
      },
      {
        id: 'linkuri-terte',
        number: '14',
        title: 'LINKURI CĂTRE ALTE SITE-URI',
        paragraphs: [
          'Site-ul poate conține linkuri către site-uri terțe pe care nu le controlăm. Nu răspundem pentru practicile de confidențialitate ale acestora și vă recomandăm să consultați politicile lor de confidențialitate.',
        ],
      },
      {
        id: 'modificari-politica',
        number: '15',
        title: 'MODIFICĂRI ALE PREZENTEI POLITICI',
        paragraphs: [
          'Putem actualiza periodic această Politică pentru a reflecta modificări legislative sau ale practicilor noastre. Versiunea actualizată va fi publicată pe site, cu indicarea datei ultimei revizuiri.',
        ],
      },
    ],
  },
  en: {
    documentTitle: 'SECURITY POLICY',
    documentSubtitle: 'regarding personal data processing',
    badge: 'Official Privacy Document',
    lastUpdatedLabel: 'Last updated',
    lastUpdatedDate: '22.08.2026',
    tocTitle: 'Table of Contents',
    cookiePolicyLinkLabel: 'View Cookie Policy',
    operatorInfo: {
      name: 'S.R.L. "Plasma RTI"',
      idno: '1003600107651',
      address: 'str-la Călătorilor, 30, Chișinău, MD2037, Republic of Moldova',
      email: 'iulia.ivanov@rti.md',
      representative: 'Iulia',
      dpoName: 'Iulia',
      dpoEmail: 'iulia.ivanov@rti.md',
      dpoPhone: '+373 69 116 121',
    },
    authorityInfo: {
      country: 'Republic of Moldova',
      name: 'National Center for Personal Data Protection (CNPDCP)',
      address: 'str. Serghei Lazo no. 48, Chișinău',
      email: 'centru@datepersonale.md',
      website: 'www.datepersonale.md',
    },
    sections: [
      {
        id: 'cine-suntem',
        number: '1',
        title: 'WHO WE ARE – DATA CONTROLLER',
        paragraphs: [
          'This Privacy Policy describes how Plasma RTI SRL (hereinafter "we" or the "Controller") collects, uses, stores, and protects the personal data of individuals visiting the website www.rparking.md, providing contact details to receive information about the services provided, as well as the beneficiaries of its services.',
        ],
        specialContent: 'operator',
      },
      {
        id: 'cadrul-legal',
        number: '2',
        title: 'APPLICABLE LEGAL FRAMEWORK',
        paragraphs: ['Personal data processing is carried out in compliance with:'],
        listItems: [
          'Law no. 195/2024 on personal data protection (Republic of Moldova);',
          'Regulation (EU) 2016/679 (GDPR) and Law no. 190/2018 (Romania), to the extent applicable;',
          'Secondary legislation and decisions of competent supervisory authorities.',
        ],
      },
      {
        id: 'definitii',
        number: '3',
        title: 'DEFINITIONS',
        listItems: [
          'Personal data: any information relating to an identified or identifiable natural person (data subject).',
          'Processing: any operation or set of operations performed on personal data or sets of personal data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.',
          'Controller: the entity determining the purposes and means of processing;',
          'Processor: the entity processing personal data on behalf of the controller (e.g. service providers).',
          'Data subject: user/beneficiary whose personal data is processed.',
          'Consent: any freely given, specific, informed and unambiguous indication of the data subject\'s wishes.',
        ],
      },
      {
        id: 'ce-date-prelucram',
        number: '4',
        title: 'DATA WE PROCESS, PURPOSES AND LEGAL BASES',
        paragraphs: ['We process your data for the following purposes, each supported by an appropriate legal basis:'],
        subsections: [
          {
            id: 'cont-utilizator',
            title: '4.1. User account creation and management',
            categories: 'first name, last name, email, credentials, preferences',
            basis: 'contract execution (service provision) – art. 5 para. (1) letter b) of Law 195/2024',
          },
          {
            id: 'furnizare-servicii',
            title: '4.2. Provision of services',
            categories: 'first name, last name, email address, phone number',
            basis: 'contract execution',
          },
          {
            id: 'facturare-plati',
            title: '4.3. Billing and payment processing',
            categories: 'billing details, payment information',
            basis: 'legal obligation (accounting/fiscal) and contract execution',
          },
          {
            id: 'marketing',
            title: '4.4. Marketing communications, newsletter, personalized offers',
            categories: 'business type and location',
            basis: 'consent – can be withdrawn at any time',
          },
          {
            id: 'analiza-imbunatatire',
            title: '4.5. Website analysis and improvement',
            categories: 'browsing data, performance cookies',
            basis: 'consent (non-essential cookies) / legitimate interest for essential cookies',
          },
          {
            id: 'litigii',
            title: '4.7. Handling requests, dispute resolution, and legal defense',
            categories: 'request history, relevant case data',
            basis: 'legitimate interest / legal obligation',
          },
        ],
        footerNote:
          'Providing data marked as necessary for contract conclusion is mandatory to receive services; refusal may make service provision impossible. Providing data for marketing purposes is optional.',
      },
      {
        id: 'sursa-datelor',
        number: '5',
        title: 'DATA SOURCE',
        paragraphs: [
          'We collect data primarily directly from you (when browsing the website, purchasing services via contact forms).',
        ],
      },
      {
        id: 'pastrare-date',
        number: '6',
        title: 'DATA RETENTION PERIOD',
        paragraphs: [
          'We retain data only for the period necessary to fulfill the purposes for which they were collected, as follows:',
        ],
        listItems: [
          'Account data: while the account is active and has not been deactivated, and subsequently for another 3 years from the date of last login.',
          'Service delivery data: 3 years from contract termination or training date.',
          'Billing/tax documents: 6 years.',
          'Marketing data: until consent withdrawal or up to 3 years in case of inactivity.',
          'Cookies: in accordance with durations specified in the Cookie Policy / consent banner.',
        ],
        footerNote: 'Upon expiration of retention periods, data is securely erased or anonymized.',
      },
      {
        id: 'destinatari',
        number: '7',
        title: 'DATA RECIPIENTS',
        paragraphs: [
          'We do not sell your data. We may disclose data, to the extent necessary, to the following recipient categories:',
        ],
        listItems: [
          'Hosting and IT infrastructure providers;',
          'Analytics and marketing tool providers: OpenAI (Data is not used for model training. May be retained temporarily ~30 days for safety, then deleted. Reference: https://openai.com/policies/api-data-usage-policies when consent is given in cookies banner); Telegram (Notification messages remain in internal chat history indefinitely, per Telegram policy);',
          'Public authorities, whenever legally required;',
          'Professional advisors – lawyers, auditors, and other counselors, strictly as needed to establish, exercise, or defend legal rights.',
        ],
        footerNote:
          'Vendors processing data on our behalf act as processors under contracts enforcing strict security and confidentiality guarantees.',
      },
      {
        id: 'transferuri-internationale',
        number: '8',
        title: 'INTERNATIONAL DATA TRANSFERS',
        paragraphs: [
          'Certain tools we use (e.g. OpenAI) may involve data transfers to third countries, including the United States. These transfers occur strictly under appropriate safeguards, such as standard contractual clauses, and based on your agreement expressed through cookie selection.',
          'If you choose to communicate with us via instant messaging apps (Viber, Telegram, WhatsApp) or social networks (Facebook, Instagram, LinkedIn), data will be stored and processed per their respective security policies, with Plasma RTI SRL not responsible for such third-party processing.',
          'By requesting communication via messaging apps (Viber, Telegram, WhatsApp), you agree to cross-border data transfers pursuant to those platforms\' security policies.',
        ],
      },
      {
        id: 'cookie-uri',
        number: '9',
        title: 'COOKIES AND SIMILAR TECHNOLOGIES',
        paragraphs: [
          'We use session, performance, functionality, and advertising cookies. Non-essential cookies (performance, advertising, including Facebook Pixel and Google) are activated solely upon obtaining your prior consent via the cookie banner.',
          'You may accept, refuse, or withdraw consent for non-essential cookies at any time. Full cookie details are available in the Cookie Policy.',
        ],
      },
      {
        id: 'marketing-profilare',
        number: '10',
        title: 'PERSONALIZED MARKETING AND PROFILING',
        paragraphs: [
          'For marketing purposes, we may analyze preferences and browsing patterns to provide relevant content and offers. These operations are consent-based and produce no legal or similarly significant effects on you. You may object to this processing at any time without impacting service access.',
        ],
      },
      {
        id: 'drepturile-dumneavoastra',
        number: '11',
        title: 'YOUR RIGHTS',
        paragraphs: ['As a data subject, you hold the following rights under applicable law:'],
        listItems: [
          'Right of access to processed data, including requesting copies;',
          'Right to rectification of incorrect or incomplete data;',
          'Right to erasure ("right to be forgotten"), subject to statutory conditions;',
          'Right to restriction of processing;',
          'Right to data portability;',
          'Right to object, including against marketing processing;',
          'Right to withdraw consent at any time without affecting prior lawful processing;',
          'Right not to be subject to automated decisions with significant effects;',
          'Right to lodge a complaint with the supervisory authority and seek judicial remedy.',
        ],
        footerNote:
          'To exercise your rights, email us at iulia.ivanov@rti.md or call our published phone numbers. We may request supplementary info to verify your identity. We reply without undue delay and generally within one month of receipt (extendable by up to two months for complex requests with prior notice).',
      },
      {
        id: 'autoritatea-supraveghere',
        number: '12',
        title: 'SUPERVISORY AUTHORITY',
        paragraphs: [
          'If you believe your rights have been infringed, you are entitled to file a complaint with the competent authority:',
        ],
        specialContent: 'authority',
      },
      {
        id: 'securitatea-datelor',
        number: '13',
        title: 'DATA SECURITY',
        paragraphs: [
          'We implement appropriate technical and organizational measures to safeguard data against unauthorized access, loss, destruction, or disclosure, including:',
        ],
        listItems: [
          'data encryption in transit and at rest;',
          'strict access control;',
          'staff data security training;',
          'internal security policies;',
          'periodic risk assessments;',
          'security incident response procedures.',
        ],
        footerNote:
          'Our personnel and authorized contractors are bound by strict confidentiality obligations. In case of any security incident affecting you, we act promptly per legal requirements, notifying authorities and individuals as mandated.',
      },
      {
        id: 'linkuri-terte',
        number: '14',
        title: 'THIRD-PARTY LINKS',
        paragraphs: [
          'The website may include links to third-party websites beyond our control. We are not responsible for their privacy practices and encourage reviewing their privacy policies directly.',
        ],
      },
      {
        id: 'modificari-politica',
        number: '15',
        title: 'CHANGES TO THIS POLICY',
        paragraphs: [
          'We may periodically update this Policy to reflect legislative amendments or changes in operational practices. Updated versions are published on this page with the revision date indicated.',
        ],
      },
    ],
  },
  ru: {
    documentTitle: 'ПОЛИТИКА БЕЗОПАСНОСТИ',
    documentSubtitle: 'в отношении обработки персональных данных',
    badge: 'Официальный документ о конфиденциальности',
    lastUpdatedLabel: 'Дата последнего обновления',
    lastUpdatedDate: '22.08.2026',
    tocTitle: 'Содержание политики',
    cookiePolicyLinkLabel: 'Смотреть Политику cookie',
    operatorInfo: {
      name: 'S.R.L. "Plasma RTI"',
      idno: '1003600107651',
      address: 'пер. Кэлэторилор, 30, Кишинэу, MD2037, Республика Молдова',
      email: 'iulia.ivanov@rti.md',
      representative: 'Юлия',
      dpoName: 'Юлия',
      dpoEmail: 'iulia.ivanov@rti.md',
      dpoPhone: '+373 69 116 121',
    },
    authorityInfo: {
      country: 'Республика Молдова',
      name: 'Национальный центр по защите персональных данных (CNPDCP)',
      address: 'ул. Сергея Лазо, 48, Кишинэу',
      email: 'centru@datepersonale.md',
      website: 'www.datepersonale.md',
    },
    sections: [
      {
        id: 'cine-suntem',
        number: '1',
        title: 'КТО МЫ – ОПЕРАТОР ДАННЫХ',
        paragraphs: [
          'Настоящая Политика конфиденциальности описывает, как Plasma RTI SRL (далее «мы» или «Оператор») собирает, использует, хранит и защищает персональные данные лиц, посещающих сайт www.rparking.md, оставляющих контактные данные для получения информации об услугах, а также получателей услуг.',
        ],
        specialContent: 'operator',
      },
      {
        id: 'cadrul-legal',
        number: '2',
        title: 'ПРИМЕНИМАЯ ПРАВОВАЯ БАЗА',
        paragraphs: ['Обработка персональных данных осуществляется в соответствии с:'],
        listItems: [
          'Законом № 195/2024 о защите персональных данных (Республика Молдова);',
          'Регламентом (ЕС) 2016/679 (GDPR) и Законом № 190/2018 (Румыния) в применимой части;',
          'Вторичным законодательством и решениями компетентных надзорных органов.',
        ],
      },
      {
        id: 'definitii',
        number: '3',
        title: 'ОПРЕДЕЛЕНИЯ',
        listItems: [
          'Персональные данные: любая информация, относящаяся к идентифицированному или идентифицируемому физическому лицу (субъекту данных).',
          'Обработка: любая операция или совокупность операций с персональными данными, с использованием или без использования автоматизированных средств (сбор, запись, систематизация, хранение, изменение, извлечение, использование, передача, блокирование, удаление или уничтожение).',
          'Оператор: лицо, определяющее цели и средства обработки;',
          'Уполномоченное лицо: лицо, обрабатывающее данные от имени оператора (например, поставщики услуг).',
          'Субъект данных: пользователь/клиент, чьи данные обрабатываются.',
          'Согласие: свободное, конкретное, информированное и недвусмысленное волеизъявление субъекта данных.',
        ],
      },
      {
        id: 'ce-date-prelucram',
        number: '4',
        title: 'КАКИЕ ДАННЫЕ МЫ ОБРАБАТЫВАЕМ, ЦЕЛИ И ПРАВОВЫЕ ОСНОВАНИЯ',
        paragraphs: [
          'Мы обрабатываем ваши данные для следующих целей на соответствующих правовых основаниях:',
        ],
        subsections: [
          {
            id: 'cont-utilizator',
            title: '4.1. Создание и управление учетной записью пользователя',
            categories: 'имя, фамилия, e-mail, данные аутентификации, предпочтения',
            basis: 'исполнение договора (предоставление услуги) – ст. 5 ч. (1) п. b) Закона 195/2024',
          },
          {
            id: 'furnizare-servicii',
            title: '4.2. Предоставление услуг',
            categories: 'имя, фамилия, адрес электронной почты, номер телефона',
            basis: 'исполнение договора',
          },
          {
            id: 'facturare-plati',
            title: '4.3. Выставление счетов и обработка платежей',
            categories: 'платежные реквизиты, финансовые данные',
            basis: 'законное обязательство (бухгалтерское/налоговое) и исполнение договора',
          },
          {
            id: 'marketing',
            title: '4.4. Маркетинговые сообщения, рассылки, персонализированные предложения',
            categories: 'тип и локация бизнеса',
            basis: 'согласие – может быть отозвано в любой момент',
          },
          {
            id: 'analiza-imbunatatire',
            title: '4.5. Аналитика и улучшение работы сайта',
            categories: 'данные навигации, аналитические cookie-файлы',
            basis: 'согласие (для необязательных файлов cookie) / законный интерес для обязательных',
          },
          {
            id: 'litigii',
            title: '4.7. Разрешение запросов, споров и правовая защита',
            categories: 'история обращений, данные по конкретному вопросу',
            basis: 'законный интерес / юридическое обязательство',
          },
        ],
        footerNote:
          'Предоставление данных, необходимых для заключения договора, обязательно для получения услуг; отказ делает предоставление невозможным. Предоставление данных для маркетинга является добровольным.',
      },
      {
        id: 'sursa-datelor',
        number: '5',
        title: 'ИСТОЧНИКИ ДАННЫХ',
        paragraphs: [
          'Мы собираем данные преимущественно напрямую от вас (при просмотре сайта, отправке запросов через контактные формы).',
        ],
      },
      {
        id: 'pastrare-date',
        number: '6',
        title: 'СРОКИ ХРАНЕНИЯ ДАННЫХ',
        paragraphs: [
          'Мы храним данные только в течение срока, необходимого для достижения целей их сбора:',
        ],
        listItems: [
          'Данные учетной записи: на протяжении срока активности аккаунта и еще 3 года с момента последнего входа.',
          'Данные для оказания услуг: 3 года с момента прекращения договора или проведения обучения.',
          'Бухгалтерские и налоговые документы: 6 лет.',
          'Маркетинговые данные: до отзыва согласия или до 3 лет при неактивности.',
          'Cookie-файлы: в соответствии со сроками в Политике использования cookie / баннере согласия.',
        ],
        footerNote: 'По истечении сроков данные безопасно удаляются или обезличиваются.',
      },
      {
        id: 'destinatari',
        number: '7',
        title: 'КОМУ МЫ ПЕРЕДАЕМ ДАННЫЕ (ПОЛУЧАТЕЛИ)',
        paragraphs: [
          'Мы не продаем ваши данные. В необходимом объеме данные могут передаваться следующим категориям получателей:',
        ],
        listItems: [
          'Поставщики хостинга и IT-инфраструктуры;',
          'Поставщики аналитических и маркетинговых инструментов: OpenAI (Данные не используются для обучения моделей. Могут временно храниться ~30 дней в целях безопасности, после чего удаляются. Ссылка: https://openai.com/policies/api-data-usage-policies при согласии в баннере cookies); Telegram (Сообщения уведомлений хранятся во внутреннем чате бессрочно в соответствии с политикой Telegram);',
          'Государственные органы в случаях, предусмотренных законодательством;',
          'Профессиональные консультанты – юристы, аудиторы и эксперты, исключительно для защиты законных прав.',
        ],
        footerNote:
          'Все подрядчики действуют на основании договоров с гарантиями строгой конфиденциальности и безопасности.',
      },
      {
        id: 'transferuri-internationale',
        number: '8',
        title: 'МЕЖДУНАРОДНАЯ ПЕРЕДАЧА ДАННЫХ',
        paragraphs: [
          'Некоторые инструменты (например, OpenAI) могут предусматривать трансграничную передачу данных в третьи страны, включая США. Такая передача осуществляется исключительно при наличии надлежащих гарантий (стандартные договорные оговорки) и на основании вашего согласия через cookie-баннер.',
          'При выборе коммуникации через мессенджеры (Viber, Telegram, WhatsApp) или социальные сети (Facebook, Instagram, LinkedIn) обработка осуществляется по правилам безопасности этих платформ; Plasma RTI SRL не несет ответственности за их последующую обработку.',
          'Запрашивая связь через мессенджеры, вы соглашаетесь с международной передачей данных согласно политикам этих сервисов.',
        ],
      },
      {
        id: 'cookie-uri',
        number: '9',
        title: 'ФАЙЛЫ COOKIE И АНАЛОГИЧНЫЕ ТЕХНОЛОГИИ',
        paragraphs: [
          'Мы используем сессионные, функциональные, аналитические и рекламные файлы cookie. Необязательные cookie активируются исключительно после получения вашего предварительного согласия через баннер cookie.',
          'Вы можете в любой момент изменить настройки согласия на использование файлов cookie в Политике использования cookie.',
        ],
      },
      {
        id: 'marketing-profilare',
        number: '10',
        title: 'ПЕРСОНАЛИЗИРОВАННЫЙ МАРКЕТИНГ И ПРОФИЛИРОВАНИЕ',
        paragraphs: [
          'В маркетинговых целях мы можем анализировать предпочтения навигации для предложения актуального контента. Данные действия основаны на согласии и не влекут юридических последствий. Вы можете возразить против такой обработки в любой момент.',
        ],
      },
      {
        id: 'drepturile-dumneavoastra',
        number: '11',
        title: 'ВАШИ ПРАВА',
        paragraphs: ['Как субъект персональных данных, вы обладаете следующими правами:'],
        listItems: [
          'Право на доступ к обрабатываемым данным и получение копий;',
          'Право на исправление неточных или неполных данных;',
          'Право на удаление («право быть забытым») в рамках закона;',
          'Право на ограничение обработки;',
          'Право на переносимость данных;',
          'Право на возражение против обработки, включая маркетинговые цели;',
          'Право отозвать согласие в любое время;',
          'Право не подвергаться автоматизированным решениям с существенными последствиями;',
          'Право подать жалобу в надзорный орган и обратиться в суд.',
        ],
        footerNote:
          'Для реализации прав напишите нам на iulia.ivanov@rti.md или позвоните по указанным номерам. Мы можем запросить дополнительную информацию для идентификации. Ответ предоставляется без промедления и обычно в течение одного месяца (с возможным продлением до двух месяцев при сложных запросах).',
      },
      {
        id: 'autoritatea-supraveghere',
        number: '12',
        title: 'НАДЗОРНЫЙ ОРГАН',
        paragraphs: [
          'Если вы считаете, что ваши права были нарушены, вы вправе подать жалобу в компетентный орган:',
        ],
        specialContent: 'authority',
      },
      {
        id: 'securitatea-datelor',
        number: '13',
        title: 'БЕЗОПАСНОСТЬ ДАННЫХ',
        paragraphs: [
          'Мы применяем современные технические и организационные меры защиты данных от несанкционированного доступа, утраты или уничтожения:',
        ],
        listItems: [
          'шифрование данных при передаче и хранении;',
          'строгий контроль доступа;',
          'регулярное обучение сотрудников;',
          'внутренние политики информационной безопасности;',
          'оценку рисков и аудит защищенности;',
          'регламентированные процедуры реагирования на инциденты.',
        ],
        footerNote:
          'Сотрудники и подрядчики связаны соглашениями о неразглашении. При возникновении инцидентов безопасности мы действуем в строгом соответствии с требованиями законодательства, включая своевременное уведомление регулятора и пользователей.',
      },
      {
        id: 'linkuri-terte',
        number: '14',
        title: 'ССЫЛКИ НА СТОРОННИЕ РЕСУРСЫ',
        paragraphs: [
          'Сайт может содержать ссылки на сторонние ресурсы, не контролируемые нами. Мы не несем ответственности за их политику конфиденциальности и рекомендуем ознакомиться с ней непосредственно на данных сайтах.',
        ],
      },
      {
        id: 'modificari-politica',
        number: '15',
        title: 'ИЗМЕНЕНИЯ В НАСТОЯЩЕЙ ПОЛИТИКЕ',
        paragraphs: [
          'Мы можем периодически обновлять настоящую Политику в связи с изменениями законодательства или операционной деятельности. Актуальная версия публикуется на сайте с указанием даты обновления.',
        ],
      },
    ],
  },
};

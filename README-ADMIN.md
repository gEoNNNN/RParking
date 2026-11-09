# Panou de administrare RParking

Panoul permite editarea conținutului site-ului **fără să atingi codul**:

- **Texte** – toate textele site-ului, pe cele 3 limbi (RO / EN / RU): meniuri, titluri, descrieri, butoane, footer.
- **Produse** – catalogul din pagina `/magazin`: adăugare, editare, ștergere, prețuri, stoc, imagini, categorii, număr WhatsApp.
- **Carduri** – grilele de carduri de pe homepage (`Ecosistemul de produse`), pagina `/products`, secțiunea `RTI Systems`, pagina `/solutii` și galeria de implementări.
- **Imagini** – încărcare poze noi (`public/uploads/`) sau adăugare prin **link http(s)**; pozele originale din `public/img/` pot fi refolosite. Orice imagine aleasă se aplică automat pe toate cele 3 limbi.

## Acces

| | |
|---|---|
| URL | `/admin` (ex: `https://rparking.md/admin`) |
| Parola implicită | `parc-admin-2026` |
| unde se schimbă | în cod: `app/lib/admin/auth.ts`, constanta `BUILTIN_PASSWORD_SHA256` (hash SHA-256, instrucțiuni în comentariu). Opțional, `ADMIN_PASSWORD` pe server. |
| secrete | nu sunt obligatorii. `ADMIN_SECRET` poate fi setat opțional pe server. |

Parola este **inclusă în aplicație**, nu într-un fișier `.env`, deci un deploy care conține doar repository-ul funcționează direct. Este stocată doar ca hash SHA-256, nu în clar. Panoul afișează un avertisment cât timp folosești parola implicită.

Sesiunea durează 7 zile (cookie semnat criptografic, `HttpOnly`). 10 încercări greșite de login din 15 minute → blocare temporară.

## Cum funcționează (pe scurt)

Conținutul editabil stă în fișiere JSON, în două straturi:

```
storage/content/*.json    ← conținutul LIVE (produse, carduri, galerie); scris de panou
storage/messages/*.json   ← textele LIVE (RO/EN/RU); scris de panou
storage/backup/           ← copie automată înainte de fiecare salvare (ultimele 40)
public/uploads/           ← pozele încărcate din panou

data/content/*.json       ← SEED-uri din repository (valorile implicite)
messages/ro|en|ru.json    ← SEED-uri din repository (textele implicite)
```

La prima rulare, fiecare fișier live este creat automat ca copie a seed-ului. De aceea:

- un host care primește doar repository-ul pornește cu conținutul implicit, fără configurări;
- modificările din panou se scriu în `storage/`, care este ignorat de git, deci **nu se pierd la `git pull` / redeploy**;
- dacă un deploy adaugă texte noi în seed, cheile lipsă sunt completate automat la citire, fără să suprascrie textele editate.

La fiecare salvare, serverul:

1. validează datele (structură, chei unice, tipuri, imagini = cale locală sau link http(s));
2. face un backup în `storage/backup/`;
3. scrie fișierul live;
4. apelează `revalidatePath` → paginile publice se regenerează, modificarea apare **imediat**, fără rebuild sau repornire.

## Instalare pe server (clone și gata)

Nu este nevoie de `.env`, de foldere create manual sau de editarea vreunei căi. Pe un VPS cu Node.js 20+:

```bash
git clone https://github.com/gEoNNNN/RParking.git rparking
cd rparking
npm ci
npm run build
pm2 start ecosystem.config.js
pm2 save
```

Alternativ, fără pm2:

```bash
npm run start
```

La prima cerere, aplicația creează singură `storage/` (conținutul live) și folosește `public/uploads/` pentru poze. Nu rula `git clean -fdx`.

Dacă vrei alt port: `PORT=8080 pm2 start ecosystem.config.js`.

## Paginile panoului

- **Panou** – sumar + avertisment parolă implicită + unde se salvează conținutul.
- **Produse** – listă + formular (cheie, categorie, tip, utilizare, preț, stoc, imagine, link, pictogramă, nume/descriere pe 3 limbi). Gestionare categorii (etichete pe 3 limbi + pictogramă) și numărul WhatsApp direct din antet.
- **Carduri & Galerie** – 5 taburi, câte un editor pentru fiecare grilă de carduri; fiecare card are titlu, imagine, link, pictogramă și textele pe 3 limbi (inclusiv liste de „bifuri” / features).
- **Text site** – editor de traduceri: alegi limba, secțiunea (Nav, Hero, Footer…), editezi valori; căutare globală; liste de text (features) cu adăugare/mutare/ștergere; avertisment pentru variabilele `{...}` care nu trebuie modificate.
- **Imagini** – drag & drop upload, adăugare prin link http(s), copiere cale, ștergere (doar pentru `/uploads/`), listă cu toate imaginile existente pe site.

## Editare directă pe site (nou)

Pe lângă panou, deschide site-ul public și apasă butonul **„Mod editare”** (colț stânga-jos).
Vizibil și funcțional **doar când ești autentificat ca admin** (`/api/admin/session`); pentru vizitatori nu se afișează nimic.

Cum funcționează:

1. La activare, se descarcă „harta de editare” (`/api/admin/edit-map?locale=...`): toate textele din `messages/*.json` + toate textele/imaginile din cele 6 colecții, ca listă de `{cale, valoare}`.
2. Când dați click pe un text sau o imagine de pe site, stratul caută în hartă elementul cu același conținut și deschide un mic editor lângă poziția click-ului:
   - **text** – textarea cu valoarea curentă, cu arătarea fișierului și a căii sursă (ex: `Carduri catalog > items.0.title`);
   - **imagine** – previzualizare + căutător de imagini existente (/uploads + /img), câmp pentru **cale locală sau link http(s)**, buton „Încarcă” (upload direct din editor). Salvarea unei imagini se aplică pe toate cele 3 limbi;
3. La salvare (`PATCH /api/admin/edit`) se aplică exact același flux ca în panou: validare → backup → scriere → revalidare → pagina se **reîncarcă automat** (toast „Salvat.") și modul de editare **rămâne activ** după reîncărcare (`sessionStorage`), fără rebuild și fără să pierzi modul.
4. Elementele cu același text în mai multe locuri (ex: „Entry Point” apare și în cardurile de acasă și în catalog) afișează un selector de sursă — alegi din ce fișier faci modificarea.

Detalii:

- Textele din `messages` sunt per-limbă; opțiunea „aplica acelasi text si in celelalte limbi” din editor copiază aceeași valoare în RO/EN/RU (oprită implicit, ca să nu suprascrii accidental traducerile). Textele/imaginile din colecții (carduri, produse, galerie) sunt comune tuturor limbilor — salvarea lor se aplică automat peste tot.
- ESC închide editorul; „Gata” dezactivează modul. Navigarea normală pe site rămâne liberă în timpul editării (doar click-urile pe elemente cu potrivire sunt interceptate). Verificarea sesiunii are mai multe încercări (retry) ca butonul să nu dispară dacă serverul abia pornește.
- Nu se pot edita aici numerele și structurile (prețuri, adăugare/ștergere carduri) — asta rămâne în panoul `/admin` (protecție anti-greșeli). Rutele noi sunt `/api/admin/edit-map` (citire) și `/api/admin/edit` (PATCH pe o singură valoare), ambele protejate de sesiunea de admin.
- Implementare: `SiteEditLayer` (`app/components/SiteEditLayer.tsx`), montat în `app/[locale]/layout.tsx`; stilurile proprii (prefixate `rp-edit-*`) nu afectează restul site-ului, iar HTML-ul trimis vizitatorilor nu conține niciun element al editorului (apare doar după hidratare + verificarea sesiunii). Pe paginile `/admin` stratul se ascunde complet.

## Reguli de deploy (important)

Serverul citește conținutul la runtime. Pe VPS trebuie **păstrate între deploy-uri**:

- `storage/` (conținutul și textele editate din panou + backup-urile)
- `public/uploads/` (pozele încărcate)

Folderele `data/content/` și `messages/` sunt doar seed-uri (valorile implicite) și pot fi actualizate din repository fără să pierzi modificările, pentru că datele live stau în `storage/`.

Recomandări:

- deploy cu `git pull` (sau `git reset --hard`) este sigur: `storage/` și `public/uploads/` sunt ignorate de git și rămân pe disc;
- **nu** rula `git clean -fdx` pe server (ar șterge `storage/`, `public/uploads/` și `node_modules`);
- dacă hostul înlocuiește integral folderul aplicației la deploy, copiază înainte `storage/` și `public/uploads/` în afara folderului și pune-le la loc după;
- fă periodic o copie a folderului `storage/` (conține tot conținutul site-ului).

Nu este nevoie de `.env.local` pentru funcționare. Opțional, pe server se pot seta `ADMIN_PASSWORD` (suprascrie parola din cod) și `ADMIN_SECRET` (cheia de semnare a sesiunii).

nginx trebuie să permită upload-uri: în `nginx.conf` este deja `client_max_body_size 24M;` (limita din aplicație este 10 MB / fișier).

## Securitate

- Parola nu se trimite niciodată către client; este stocată ca hash SHA-256 în cod și comparată în server (timing-safe).
- Cookie-ul de sesiune este semnat HMAC-SHA256. Cheia derivă din parolă; `ADMIN_SECRET` este opțional.
- Cookie-ul este marcat `Secure` doar când cererea vine pe HTTPS, ca login-ul să funcționeze și pe hosturi HTTP.
- Toate rutele `/api/admin/*` resping cererile fără sesiune validă (401).
- Upload-ul acceptă doar imagini (png/jpg/webp/gif/svg/avif) ≤ 10 MB, cu nume rescrise (fără căi rele). Fișierele SVG sunt curățate de scripturi și atribute `on*` înainte de salvare.
- Imaginile încărcate sunt servite printr-o rută dinamică (`/uploads/...`), deci apar imediat după upload, fără restart.
- Linkurile de imagine acceptă doar `http(s)` sau căi locale; `javascript:`, `data:` și alte scheme sunt respinse.
- Ștergerea de imagini este permisă doar în `/public/uploads/` (fișierele originale din `/img/` nu pot fi șterse din panou).
- Panoul este `noindex` (nu apare în Google) și nu apare în `sitemap.xml`.
- Chatbot-ul și banner-ul de cookie sunt dezactivate pe paginile de admin.

## Ce s-a reparat în această versiune

- **Upload-urile noi dădeau 404 până la restart** (Next cachează lista din `public/` la pornire). Acum `/uploads/...` este servit dinamic de pe disc.
- **Imaginile prin link extern** nu erau acceptate de `next/image`. Acum sunt permise `http(s)` și trec prin optimizatorul Next.
- **Parola depindea de `.env.local`**. Acum este inclusă în cod, ca hash; env-ul este doar opțional.
- **Login-ul putea eșua pe host HTTP** din cauza cookie-ului `Secure`. Acum `Secure` se setează doar pe HTTPS.
- **Persistența la redeploy**: conținutul live s-a mutat în `storage/` (ignorat de git), cu seed-uri în repository.
- **Imaginile și cele 3 limbi**: imaginile din colecții sunt comune; imaginile la nivel de mesaje se propagă automat în RO/EN/RU.
- **Validare imagini**: linkurile invalide (`javascript:` etc.) sunt respinse cu mesaj clar.
- **Backup**: primul salvare copiază și seed-ul, iar scrierea atomică folosește nume temporare unice (fără coliziuni).
- **Texte noi după deploy**: cheile adăugate în seed sunt completate automat în fișierele live.

## Limitări cunoscute

- Conținutul live stă pe discul serverului (`storage/`). Dacă hostul șterge complet folderul aplicației la fiecare deploy, fără un volum persistent nu se poate garanta păstrarea datelor; în acest caz fă backup la `storage/` și `public/uploads/` înainte de deploy.
- Rulează o singură instanță a aplicației (sau folosește un disc partajat). Cu mai multe instanțe pe discuri separate, fiecare ar vedea alt conținut.
- Imaginile prin link depind de site-ul sursă: dacă acesta blochează hotlinking sau șterge poza, imaginea nu mai apare; încarcă fișierul în panou pentru siguranță.
- Paginile detaliate de produs (`/products/pay-point` etc.) sunt tot în cod — un produs nou adăugat în magazin poate avea link către o pagină existentă sau buton de întrebare pe WhatsApp (dacă lași câmpul de link gol).
- Cheile din mesaje (ex: `ShopPage.products.entry.name`) trebuie să rămână consistente — editorul de text avertizează asupra acestui lucru; nu șterge chei dacă nu știi ce fac.
- `app/sitemap.ts` are lista de rute hardcodată — rutele noi de produse detaliate se adaugă manual acolo.

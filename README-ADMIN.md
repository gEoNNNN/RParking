# Panou de administrare RParking

Panoul permite editarea conținutului site-ului **fără să atingi codul**:

- **Texte** – toate textele site-ului, pe cele 3 limbi (RO / EN / RU): meniuri, titluri, descrieri, butoane, footer.
- **Produse** – catalogul din pagina `/magazin`: adăugare, editare, ștergere, prețuri, stoc, imagini, categorii, număr WhatsApp.
- **Carduri** – grilele de carduri de pe homepage (`Ecosistemul de produse`), pagina `/products`, secțiunea `RTI Systems`, pagina `/solutii` și galeria de implementări.
- **Imagini** – încărcare poze noi (`public/uploads/`) și alegerea lor în orice formular; pozele originale din `public/img/` pot fi refolosite.

## Acces

| | |
|---|---|
| URL | `/admin` (ex: `https://rparking.md/admin`) |
| Parola implicită | `parc-admin-2026` |
| unde se schimbă | `.env.local` → `ADMIN_PASSWORD`, apoi repornește serverul (`pm2 restart rparking`) |

Panoul afișează un avertisment cât timp folosești parola implicită.

Sesiunea durează 7 zile (cookie semnat criptografic, `HttpOnly`). 10 încercări greșite de login din 15 minute → blocare temporară.

## Cum funcționează (pe scurt)

Conținutul editabil stă în fișiere JSON, nu în cod:

```
data/content/shop-products.json    ← produsele din magazin (preț, stoc, imagini, categorii)
data/content/ecosystem-cards.json  ← cardurile „Ecosistem de produse” (homepage)
data/content/catalog-cards.json    ← cardurile de pe pagina /products
data/content/rti-solutions.json    ← cardurile „RTI Systems” (homepage)
data/content/solutii-domains.json  ← cardurile de pe pagina /solutii
data/content/gallery.json          ← galeria „Implementări reale” (homepage + /despre-noi)
messages/ro.json | en.json | ru.json ← TOATE textele site-ului, pe limbi
public/uploads/                    ← pozele încărcate din panou
data/backup/                       ← copie automată înainte de fiecare salvare (ultimele 40)
```

La fiecare salvare, serverul:

1. validează datele (structură, chei unice, tipuri);
2. face un backup în `data/backup/`;
3. scrie fișierul JSON;
4. apelează `revalidatePath` → paginile publice se regenerează, modificarea apare **în câteva secunde**, fără rebuild sau repornire.

## Paginile panoului

- **Panou** – sumar + avertisment parolă implicită + unde se salvează conținutul.
- **Produse** – listă + formular (cheie, categorie, tip, utilizare, preț, stoc, imagine, link, pictogramă, nume/descriere pe 3 limbi). Gestionare categorii (etichete pe 3 limbi + pictogramă) și numărul WhatsApp direct din antet.
- **Carduri & Galerie** – 5 taburi, câte un editor pentru fiecare grilă de carduri; fiecare card are titlu, imagine, link, pictogramă și textele pe 3 limbi (inclusiv liste de „bifuri” / features).
- **Text site** – editor de traduceri: alegi limba, secțiunea (Nav, Hero, Footer…), editezi valori; căutare globală; liste de text (features) cu adăugare/mutare/ștergere; avertisment pentru variabilele `{...}` care nu trebuie modificate.
- **Imagini** – drag & drop upload, copiere cale, ștergere (doar pentru `/uploads/`), listă cu toate imaginile existentă pe site.

## Editare directă pe site (nou)

Pe lângă panou, deschide site-ul public și apasă butonul **„Mod editare”** (colț stânga-jos).
Vizibil și funcțional **doar când ești autentificat ca admin** (`/api/admin/session`); pentru vizitatori nu se afișează nimic.

Cum funcționează:

1. La activare, se descarcă „harta de editare” (`/api/admin/edit-map?locale=...`): toate textele din `messages/*.json` + toate textele/imaginile din cele 6 colecții, ca listă de `{cale, valoare}`.
2. Când dați click pe un text sau o imagine de pe site, stratul caută în hartă elementul cu același conținut și deschide un mic editor lângă poziția click-ului:
   - **text** – textarea cu valoarea curentă, cu arătarea fișierului și a căii sursă (ex: `Carduri catalog > items.0.title`);
   - **imagine** – previzualizare + căutător de imagini existente (/uploads + /img), adresa editabilă și buton „Încarcă” (upload direct din editor);
3. La salvare (`PATCH /api/admin/edit`) se aplică exact același flux ca în panou: validare → backup → scriere → revalidare → pagina se **reîncarcă automat** (toast „Salvat.") și modul de editare **rămâne activ** după reîncărcare (`sessionStorage`), fără rebuild și fără să pierzi modul.
4. Elementele cu același text în mai multe locuri (ex: „Entry Point” apare și în cardurile de acasă și în catalog) afișează un selector de sursă — alegi din ce fișier faci modificarea.

Detalii:

- Textele din `messages` sunt per-limbă; opțiunea „aplica acelasi text si in celelalte limbi” din editor copiază aceeași valoare în RO/EN/RU (oprită implicit, ca să nu suprascrii accidental traducerile). Textele/imaginile din colecții (carduri, produse, galerie) sunt comune tuturor limbilor — salvarea lor se aplică automat peste tot.
- ESC închide editorul; „Gata” dezactivează modul. Navigarea normală pe site rămâne liberă în timpul editării (doar click-urile pe elemente cu potrivire sunt interceptate). Verificarea sesiunii are mai multe încercări (retry) ca butonul să nu dispară dacă serverul abia pornește.
- Nu se pot edita aici numerele și structurile (prețuri, adăugare/ștergere carduri) — asta rămâne în panoul `/admin` (protecție anti-greșeli). Rutele noi sunt `/api/admin/edit-map` (citire) și `/api/admin/edit` (PATCH pe o singură valoare), ambele protejate de sesiunea de admin.
- Implementare: `SiteEditLayer` (`app/components/SiteEditLayer.tsx`), montat în `app/[locale]/layout.tsx`; stilurile proprii (prefixate `rp-edit-*`) nu afectează restul site-ului, iar HTML-ul trimis vizitatorilor nu conține niciun element al editorului (apare doar după hidratare + verificarea sesiunii). Pe paginile `/admin` stratul se ascunde complet.

## Reguli de deploy (important)

Serverul citește aceste fișiere la runtime, deci pe VPS trebuie **păstrate între deploy-uri**:

- `data/content/`
- `messages/`
- `public/uploads/`

Dacă faci deploy cu `git pull` + `npm run build` + `pm2 restart`, asigură-te că aceste foldere nu sunt suprascrise cu versiuni vechi din repository (eventual commit-uiește regulă conținutul editat înapoi în git sau folosește un job de sincronizare). `data/backup/` este ignorat de git și poate fi curățat oricând.

nginx trebuie să permită upload-uri: în `nginx.conf` este deja `client_max_body_size 24M;` (limita din aplicație este 10 MB / fișier).

## Securitate

- Parola nu se trimite niciodată către client; se compară în server (timing-safe).
- Cookie-ul de sesiune este semnat HMAC-SHA256 cu `ADMIN_SECRET` din `.env.local`.
- Toate rutele `/api/admin/*` resping cererile fără sesiune validă (401).
- Upload-ul acceptă doar imagini (png/jpg/webp/gif/svg/avif) ≤ 10 MB, cu nume rescrise (fără cai rele).
- Ștergerea de imagini este permisă doar în `/public/uploads/` (fișierele originale din `/img/` nu pot fi șterse din panou).
- Panoul este `noindex` (nu apare în Google) și nu apare în `sitemap.xml`.
- Chatbot-ul și banner-ul de cookie sunt dezactivate pe paginile de admin.

## Limitări cunoscute

- Paginile detaliate de produs (`/products/pay-point` etc.) sunt tot în cod — un produs nou adăugat în magazin poate avea link către o pagină existentă sau buton de întrebare pe WhatsApp (dacă lași câmpul de link gol).
- Cheile din mesaje (ex: `ShopPage.products.entry.name`) trebuie să rămână consistente — editorul de text avertizează asupra acestui lucru; nu șterge chei dacă nu știi ce fac.
- `app/sitemap.ts` are lista de rute hardcodată — rutele noi de produse detaliate se adaugă manual acolo.

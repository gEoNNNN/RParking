# Deploy RParking pe VM (Ubuntu 22.04)

## 1. Instalare dependențe pe VM

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2
sudo npm install -g pm2

# Nginx
sudo apt-get install -y nginx

# Certbot (SSL)
sudo apt-get install -y certbot python3-certbot-nginx
```

## 2. Codul sursă pe VM

```bash
sudo mkdir -p /var/www/rparking
sudo chown $USER:$USER /var/www/rparking
git clone https://github.com/gEoNNNN/RParking.git /var/www/rparking
```

Nu este nevoie de `.env`: parola, secretele și căile sunt incluse în proiect. Folderele `storage/` și `public/uploads/` se creează automat la prima rulare.

## 3. Build pe VM

```bash
cd /var/www/rparking
npm install
npm run build
```

## 4. Pornire cu PM2

```bash
cd /var/www/rparking
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # urmează instrucțiunile afișate
```

`ecosystem.config.js` folosește calea relativă și portul 3000, deci funcționează indiferent de folderul în care ai clonat proiectul.

## 5. Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/rparking
sudo ln -s /etc/nginx/sites-available/rparking /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. SSL cu Let's Encrypt

```bash
sudo certbot --nginx -d rparking.md -d www.rparking.md
```

## Comenzi utile

```bash
pm2 status          # starea aplicației
pm2 logs rparking   # logs live
pm2 restart rparking  # restart
pm2 stop rparking   # oprire
```

## Actualizare (fără pierderea conținutului)

```bash
cd /var/www/rparking
git pull
npm install
npm run build
pm2 restart rparking
```

Conținutul editat din panou stă în `storage/`, iar pozele în `public/uploads/`. Aceste două foldere nu sunt în git și trebuie păstrate. Nu rula `git clean -fdx`. Dacă vrei să le muti, copiază-le înainte de actualizare și pune-le la loc după.

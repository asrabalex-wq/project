# 💌 Romantic Message Web App - Backend

Server backend untuk aplikasi romantic message sharing dengan foto.

## 📋 Requirements

- **Node.js** 16+ ([download](https://nodejs.org/))
- **npm** (included dengan Node.js)

## 🚀 Setup Lokal (Development)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Jalankan Server
```bash
npm start
```

atau untuk development dengan auto-reload:
```bash
npm run dev
```

Server akan berjalan di: **http://localhost:3000**

### 3. Test API
```bash
# Health check
curl http://localhost:3000/api/health

# Upload foto
curl -X POST -F "photos=@foto1.jpg" http://localhost:3000/api/upload

# Create message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Nama Kamu",
    "to": "Nama Dia",
    "meet": "Tempat Ketemu",
    "first": "Kesan Pertama",
    "moment": "Momen Spesial",
    "photos": ["/server/uploads/photo1.jpg"]
  }'
```

## 📁 Folder Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
├── .gitignore        # Git exclude rules
├── uploads/          # Folder untuk foto (auto-created)
├── messages/         # Folder untuk messages JSON (auto-created)
└── README.md         # File ini
```

## 🔧 Environment Variables

Edit file `.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Base URL (ubah saat deploy)
BASE_URL=http://localhost:3000

# File upload settings
MAX_FILE_SIZE=10485760      # 10MB
MAX_PHOTOS=50
```

## 📤 API Endpoints

### 1. Upload Photos
**POST** `/api/upload`

```bash
curl -X POST \
  -F "photos=@photo1.jpg" \
  -F "photos=@photo2.jpg" \
  http://localhost:3000/api/upload
```

**Response:**
```json
{
  "success": true,
  "photos": [
    "/server/uploads/1702000000000-abc123.jpg",
    "/server/uploads/1702000000100-def456.jpg"
  ],
  "count": 2
}
```

### 2. Create Message
**POST** `/api/messages`

```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Raka",
    "to": "Putri",
    "meet": "Kafe ABC",
    "first": "Ramah dan ceria",
    "moment": "Saat kita ketemu pertama kali...",
    "photos": ["/server/uploads/photo1.jpg"]
  }'
```

**Response:**
```json
{
  "success": true,
  "messageId": "550e8400-e29b-41d4-a716-446655440000",
  "link": "http://localhost:3000/message/550e8400-e29b-41d4-a716-446655440000"
}
```

### 3. Get Message
**GET** `/api/messages/:messageId`

```bash
curl http://localhost:3000/api/messages/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "from": "Raka",
  "to": "Putri",
  "meet": "Kafe ABC",
  "first": "Ramah dan ceria",
  "moment": "Saat kita ketemu pertama kali...",
  "photos": ["/server/uploads/photo1.jpg"],
  "createdAt": "2024-12-18T10:30:00.000Z",
  "expiresAt": "2025-01-17T10:30:00.000Z"
}
```

### 4. View Message Page
**GET** `/message/:messageId`

Membuka halaman pesan di browser:
```
http://localhost:3000/message/550e8400-e29b-41d4-a716-446655440000
```

### 5. Health Check
**GET** `/api/health`

```bash
curl http://localhost:3000/api/health
```

## 🌐 Deploy ke Cloud

### Option 1: Deploy ke Replit (Recommended)

1. **Create Replit Account**
   - Buka [replit.com](https://replit.com)
   - Sign up / login

2. **Create New Replit**
   - Click "Create" → "Import from GitHub"
   - Paste GitHub repo URL

3. **Setup Environment**
   - Di Replit, buka "Secrets" (kunci icon)
   - Tambah variable:
     ```
     BASE_URL=https://[your-replit-name].replit.dev
     PORT=3000
     ```

4. **Run Server**
   - Replit akan auto-detect `start` script
   - Server akan run otomatis

5. **Share Link**
   ```
   https://[your-replit-name].replit.dev
   ```

---

### Option 2: Deploy ke Railway

1. **Create Railway Account**
   - Buka [railway.app](https://railway.app)
   - Sign up dengan GitHub

2. **Connect GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect repo

3. **Set Environment**
   - Project Settings → Variables
   - Tambah: `BASE_URL=https://[your-domain].railway.app`

4. **Deploy**
   - Railway akan auto-build & deploy
   - Custom domain bisa di-setup

---

### Option 3: Deploy ke Vercel (Node.js)

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select GitHub repo
   - Deploy

3. **Update Environment**
   - Settings → Environment Variables
   - Set: `BASE_URL=https://[your-domain].vercel.app`

---

## 🔒 Security Tips

1. **Jangan commit `.env`** - gunakan `.gitignore`
2. **Set environment variable yang berbeda untuk production**
3. **Limit file size** untuk prevent abuse
4. **Add rate limiting** untuk production (pakai middleware)
5. **Validate input** di server (sudah included)

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### Port 3000 sudah terpakai
Edit `.env`:
```env
PORT=3001
```

### Foto tidak bisa di-upload
- Check folder permissions
- Verify file size < 10MB
- Pastikan format adalah image

### Message expired terlalu cepat
Edit server.js, cari `expiresAt`:
```js
expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // ubah angka 30
```

---

## 📝 File Storage

### Uploads Folder
```
server/uploads/
├── 1702000000000-abc123.jpg
├── 1702000001000-def456.jpg
└── ...
```

### Messages Folder
```
server/messages/
├── 550e8400-e29b-41d4-a716-446655440000.json
├── 661f9511-f30c-52e5-b827-557766551111.json
└── ...
```

---

## 🚀 Next Steps

1. ✅ Setup server lokal
2. ✅ Test semua API endpoints
3. ✅ Deploy ke Replit/Railway/Vercel
4. ✅ Update `BASE_URL` di `.env` production
5. ✅ Test dari link yang di-generate
6. ✅ Share dengan users

---

## 📞 Support

Jika ada error:
1. Check console output
2. Buka DevTools browser (F12)
3. Check Network tab untuk API requests
4. Lihat server logs untuk error details

---

**Happy sharing! 💌**

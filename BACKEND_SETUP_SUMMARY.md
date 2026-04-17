# ✅ Setup Backend Lengkap - Summary

## 🎉 Apa yang Sudah Dibuat

Saya sudah membuat **backend Node.js + Express** lengkap dengan API untuk aplikasi romantic message sharing Anda.

---

## 📁 File Structure Baru

```
MY PROJECT/
│
├── 📄 index.html                 (Form halaman 1)
├── 📄 page2.html                 (Form halaman 2)  
├── 📄 page3.html                 (Form halaman 3 + upload foto)
├── 📄 result.html                (Display pesan & foto - UPDATED)
│
├── 🔧 script.js                  (Frontend logic - UPDATED)
│   └─ Sekarang upload ke server!
├── 🎨 style.css                  (Styling)
├── 🎨 result.css                 (Result styling)
│
├── 📖 DEPLOYMENT.md              (Setup & deployment guide)
├── 📖 QUICK_START.md             (Quick setup)
├── 📖 AGENTS.md                  (Project info)
│
└── server/                       ⭐ BARU - NODE.JS BACKEND
    ├── 🔑 server.js              (Main server file)
    │   └─ Express + Multer setup
    │   └─ API endpoints lengkap
    │   └─ File upload & message storage
    │
    ├── 📦 package.json           (Dependencies)
    │   └─ express, multer, cors, uuid
    │
    ├── ⚙️ .env                   (Environment variables)
    │   └─ PORT=3000, BASE_URL, etc
    │
    ├── 🚫 .gitignore             (Don't commit)
    │   └─ node_modules/, uploads/, messages/
    │
    ├── 📖 README.md              (Backend docs lengkap)
    │   └─ API docs, troubleshooting, deployment options
    │
    ├── 📁 uploads/               (Photo storage)
    │   └─ Foto yang di-upload disimpan di sini
    │
    ├── 📁 messages/              (Message database)
    │   └─ Message JSON files (1 file per message)
    │
    ├── 🔑 .gitkeep              (Track empty folders)
    └── 🔑 .gitkeep
```

---

## 🔌 API Endpoints Yang Dibuat

### 1. **POST /api/upload**
Upload foto ke server
```javascript
// Frontend call
uploadPhotosToServer(files) 
// Returns: ["/server/uploads/photo1.jpg", ...]
```

### 2. **POST /api/messages**
Buat message baru & save ke database
```javascript
// Frontend call
createMessageOnServer({
  from, to, meet, first, moment, photos
})
// Returns: { messageId, link }
```

### 3. **GET /api/messages/:messageId**
Fetch message dari server (untuk penerima)
```javascript
fetch('/api/messages/550e8400-e29b-41d4-a716-...')
// Returns: { from, to, meet, first, moment, photos, expiresAt }
```

### 4. **GET /message/:messageId**
Buka halaman pesan di browser

### 5. **GET /api/health**
Check server status

---

## 🔄 Flow Aplikasi (Updated)

### **Pengirim:**
```
1. Fill form (halaman 1-3)
2. Upload foto → Langsung ke /server/uploads/ ✅
3. Click "Generate Link" → Server process:
   - Save foto dengan nama unik
   - Create message JSON file
   - Generate unique messageId
   - Create shareable link
4. Get link → Copy & share
```

### **Penerima:**
```
1. Click link → Buka result.html?id=messageId
2. Browser fetch dari server:
   - GET /api/messages/messageId
   - Get semua data (from, to, meet, first, moment, photos)
3. Display pesan + gallery scrollable
4. Lihat foto dengan lancar
```

---

## 🚀 Cara Jalankan Lokal

### **Terminal 1 - Jalankan Server**
```bash
cd server
npm install              # First time only
npm start               # Jalankan server
```

Output:
```
🚀 Server running at http://localhost:3000
📝 API documentation available at /api
```

### **Browser**
```
Buka: http://localhost:3000
```

---

## 🌐 Cara Deploy ke GitHub + Replit

### **Step 1: Push ke GitHub**
```bash
git init
git add .
git commit -m "Add backend server"
git push origin main
```

### **Step 2: Deploy ke Replit**
1. Buka [replit.com](https://replit.com)
2. Click "Import from GitHub"
3. Paste repo URL
4. Click Secrets → Add `BASE_URL=https://[replit-name].replit.dev`
5. Done! ✅

**Share:** `https://[replit-name].replit.dev`

---

## 🗄️ Data Storage

### **Foto** 
- Lokasi: `/server/uploads/`
- Naming: `{timestamp}-{uuid}.{format}`
- Contoh: `1702000000000-abc123-def456.jpg`

### **Message Database**
- Lokasi: `/server/messages/`
- Format: JSON file
- Naming: `{messageId}.json`
- Contoh: `550e8400-e29b-41d4-a716-446655440000.json`

**Isi message file:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "from": "Raka",
  "to": "Putri",
  "meet": "Kafe Kopi",
  "first": "Ramah dan senyuman manis",
  "moment": "Saat kita pertama kali...",
  "photos": [
    "/server/uploads/1702000000000-abc.jpg",
    "/server/uploads/1702000000100-def.jpg"
  ],
  "createdAt": "2024-12-18T10:30:00.000Z",
  "expiresAt": "2025-01-17T10:30:00.000Z"
}
```

---

## 🔒 Security Features

✅ File upload validation (hanya image)  
✅ File size limit (10MB per foto)  
✅ Max 50 foto per message  
✅ Unique ID untuk setiap message  
✅ Message auto-expire setelah 30 hari  
✅ Input validation di server  
✅ CORS untuk keamanan  
✅ .gitignore untuk sensitive files  

---

## 🧪 Testing Checklist

Sebelum share ke GitHub:

- [ ] `npm start` di folder `server/` berhasil
- [ ] Buka `http://localhost:3000` - bisa akses
- [ ] Isi form halaman 1-3
- [ ] Upload 1 foto - berhasil
- [ ] Upload 5+ foto - berhasil
- [ ] Generate link - dapat link unik
- [ ] Buka link di browser lain - bisa lihat pesan & foto
- [ ] Gallery scrollable - lancar
- [ ] Foto loading - cepat

---

## 📚 File Dokumentasi

- **DEPLOYMENT.md** - Setup & deployment lengkap
- **QUICK_START.md** - Setup cepat 5 menit
- **server/README.md** - Backend API & troubleshooting

**Baca sesuai kebutuhan!**

---

## ⚠️ Penting!

1. **Jangan di-commit:**
   - `server/node_modules/`
   - `server/.env`
   - `server/uploads/*` (files)
   - `server/messages/*` (files)

   ✅ Sudah di `.gitignore`

2. **Environment variables:**
   - Development: PORT=3000, BASE_URL=http://localhost:3000
   - Production: BASE_URL=domain.com (di Replit/Railway)

3. **Dependencies install:**
   ```bash
   npm install --save-dev   # Development
   # Production: Replit/Railway install otomatis
   ```

---

## 🎯 Next Steps

1. ✅ **Test lokal dulu**
   ```bash
   npm start
   # Buka http://localhost:3000
   ```

2. ✅ **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Backend ready"
   git push
   ```

3. ✅ **Deploy ke Replit/Railway**
   - Import dari GitHub
   - Set environment variable
   - Done!

4. ✅ **Share link dengan teman**

---

## 💡 Bonus Tips

- **Clear messages lama:** Hapus file di `server/messages/`
- **Clear uploads:** Hapus file di `server/uploads/` (tapi hati-hati!)
- **Change expiry:** Edit `server/server.js` line 136, ubah `30` jadi berapa hari
- **Change port:** Edit `.env`, ubah `PORT=3000` jadi port lain

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Jalankan `npm install` |
| "Port 3000 in use" | Edit `.env`: `PORT=3001` |
| "Foto tidak upload" | Pastikan < 10MB & format image |
| "Link tidak bisa dibuka" | Server harus jalan di production |

---

## 🎉 Selamat!

**Backend Anda sudah siap! 🚀**

Aplikasi sekarang bisa:
- ✅ Simpan foto ke server (permanen)
- ✅ Create unique shareable links
- ✅ Penerima bisa akses dari link
- ✅ Foto tetap ada di server
- ✅ Deploy ke GitHub & cloud hosting

**Tinggal test dan deploy!** 💌

---

**Pertanyaan?** Lihat documentation files atau check browser console untuk errors.

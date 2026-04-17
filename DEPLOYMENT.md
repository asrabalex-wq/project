# 💌 Romantic Message App - Deployment Guide

## 📋 Quick Overview

Aplikasi ini terdiri dari:
- **Frontend**: HTML/CSS/JavaScript (vanilla)
- **Backend**: Node.js + Express (di folder `server/`)
- **Storage**: File system (uploads & messages)

---

## 🔧 Setup Lokal (Testing)

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Jalankan Server
```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

### 3. Test Aplikasi
- Buka browser: `http://localhost:3000`
- Isi form → upload foto → generate link
- Share link dengan orang lain (di device yang sama)

---

## 🌐 Deploy ke GitHub

### 1. Initialize Git (jika belum)
```bash
git init
git add .
git commit -m "Initial commit - romantic message app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/project.git
git push -u origin main
```

### 2. Konfigurasi `.gitignore`
Sudah ada di `server/.gitignore`, tambah di root:

**File: `.gitignore` (di root)**
```
node_modules/
.env
.env.local
.DS_Store
*.log
server/uploads/*
server/messages/*
!server/uploads/.gitkeep
!server/messages/.gitkeep
.vscode/
```

---

## ☁️ Deploy ke Hosting (Choose One)

### **Option 1: Replit (Recommended - Easiest)**

**Kelebihan:**
- ✅ Free & simple
- ✅ Auto-deploy dari GitHub
- ✅ Built-in Node.js support
- ✅ Persistent file storage

**Steps:**

1. Buka [replit.com](https://replit.com) → Sign up
2. Click "Create" → "Import from GitHub"
3. Paste: `https://github.com/YOUR_USERNAME/project.git`
4. Select branch: `main`
5. Replit akan auto-create Repl

**Setup Environment:**
- Buka "Secrets" (🔑 icon)
- Add variable:
  ```
  BASE_URL=https://[replit-name].replit.dev
  PORT=3000
  ```

**Run Server:**
- Replit auto-detect `npm start`
- Server akan jalan otomatis

**Share:**
```
https://[replit-name].replit.dev
```

---

### **Option 2: Railway.app (Advanced)**

**Kelebihan:**
- ✅ Professional hosting
- ✅ Custom domain support
- ✅ Good uptime

**Steps:**

1. Buka [railway.app](https://railway.app) → Sign up dengan GitHub
2. Create New Project → "Deploy from GitHub"
3. Select repo: `your-project`
4. Railway auto-deploy

**Setup Environment:**
- Project → Settings → Variables
- Add:
  ```
  BASE_URL=https://your-domain.railway.app
  PORT=3000
  ```

**Domain:**
- Settings → Domains → Add custom domain

---

### **Option 3: Vercel (Static + Serverless)**

⚠️ **Note:** Vercel lebih cocok untuk static sites. Untuk Node.js backend, gunakan Replit atau Railway.

---

## 🔄 How It Works

### **Flow untuk User:**

```
1. Pengirim (index.html)
   ├─ Isi form (nama, tempat ketemu, dsb)
   ├─ Upload foto (max 50 foto, 10MB each)
   └─ Click "Generate Link"
        ↓
2. Server Process
   ├─ Upload foto ke `/server/uploads/`
   ├─ Save message ke `/server/messages/{id}.json`
   └─ Generate unique link
        ↓
3. Share Link
   └─ Kirim link ke penerima
        ↓
4. Penerima (result.html)
   ├─ Buka link: https://app.com/message/{id}
   ├─ Server load pesan dari database
   ├─ Display foto sebagai gallery scrollable
   └─ Tidak perlu upload lagi
```

---

## 🗂️ Folder Structure Final

```
project/
├── index.html              # Form halaman 1
├── page2.html              # Form halaman 2
├── page3.html              # Form halaman 3 (upload foto)
├── result.html             # Display pesan & foto
├── script.js               # Frontend logic (UPDATED)
├── style.css               # Frontend styling
├── result.css              # Result page styling
├── .gitignore              # Git exclude rules
├── README.md               # Documentation
│
└── server/                 # ⭐ Backend (Node.js)
    ├── server.js           # Main server file
    ├── package.json        # Dependencies
    ├── .env                # Environment variables (ignored)
    ├── .gitignore          # Server git rules
    ├── README.md           # Server docs
    ├── uploads/            # Foto storage (auto-created)
    │   └── 1702000000000-abc123.jpg
    └── messages/           # Message database (auto-created)
        └── {messageId}.json
```

---

## 🔐 Security Checklist

- ✅ `.env` tidak di-commit (di `.gitignore`)
- ✅ Input validation di server
- ✅ File size limit (10MB)
- ✅ Max 50 photos per message
- ✅ Message expires setelah 30 hari

---

## 📊 Testing Checklist

Sebelum deploy, test:

- [ ] Bisa isi form di halaman 1-3
- [ ] Bisa upload foto (test 1 foto, 5 foto, 50 foto)
- [ ] Link di-generate dengan benar
- [ ] Penerima bisa buka link dan lihat foto
- [ ] Gallery scrollable dengan lancar
- [ ] Foto loading dengan cepat
- [ ] Responsive di mobile

---

## 🚀 Post-Deployment

### 1. Update README
Edit `server/README.md` dengan URL production:
```
BASE_URL=https://your-domain.com
```

### 2. Test di Production
- Buka website production
- Buat message baru
- Share link ke teman (device/browser berbeda)
- Verify bisa akses

### 3. Monitor
- Check server logs
- Monitor file storage
- Clear old messages (optional automation)

---

## 🐛 Troubleshooting

### "Cannot connect to server"
- ✅ Server running? `npm start` di folder `server/`
- ✅ Check PORT di `.env`
- ✅ Firewall allow port 3000/3001

### "Foto tidak upload"
- ✅ File < 10MB
- ✅ Format image (jpg, png, gif, webp)
- ✅ Check server logs untuk error

### "Link tidak share"
- ✅ Browser support Clipboard API (modern browsers)
- ✅ HTTPS required untuk production (auto di Replit/Railway)

---

## 📝 Environment Variables Explained

**Development (.env lokal):**
```env
BASE_URL=http://localhost:3000
PORT=3000
```

**Production (.env di Replit/Railway):**
```env
BASE_URL=https://romantic-message.replit.dev
PORT=3000
```

---

## 🎯 Next Steps

1. ✅ Push ke GitHub
2. ✅ Deploy ke Replit/Railway
3. ✅ Test di production
4. ✅ Share dengan users
5. ✅ Monitor & maintain

---

## 💡 Future Improvements (Optional)

- Database (MongoDB) untuk scalability
- User authentication
- Edit message sebelum share
- Analytics & view count
- Delete message manually
- Email notifications
- Social media integration

---

**Selamat deploy! 🚀💌**

Jika ada pertanyaan, check:
- `server/README.md` - Backend docs
- GitHub Issues
- Browser Console (F12) - Frontend errors
- Server logs - Backend errors

# 🚀 Quick Start Guide

## ⚡ Setup dalam 5 Menit

### 1️⃣ Install Node.js
Download dari: https://nodejs.org/ (LTS version)

### 2️⃣ Setup Backend
```bash
cd server
npm install
npm start
```

Buka: **http://localhost:3000**

### 3️⃣ Test Aplikasi
- Isi form di halaman 1-3
- Upload foto
- Generate link
- Share & test dari browser lain

---

## 📤 Deploy ke GitHub

```bash
# Di root folder project
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/romantic-message.git
git push -u origin main
```

---

## ☁️ Deploy ke Replit (Recommended)

1. Buka [replit.com](https://replit.com)
2. Click "Create" → "Import from GitHub"
3. Paste: `https://github.com/YOUR_USERNAME/romantic-message`
4. Buka "Secrets" → Add: `BASE_URL=https://[replit-name].replit.dev`
5. Done! ✅ Server otomatis running

Share link: `https://[replit-name].replit.dev`

---

## 📊 Folder Structure

```
project/
├── index.html, page2.html, page3.html, result.html
├── script.js, style.css, result.css
├── DEPLOYMENT.md (Setup instructions)
│
└── server/ (Node.js Backend)
    ├── server.js (Main server)
    ├── package.json
    ├── .env
    ├── uploads/ (Photo storage)
    └── messages/ (Message database)
```

---

## 🔑 Key Features

✅ Multi-step form  
✅ Upload hingga 50 foto  
✅ Server-side storage  
✅ Unique shareable links  
✅ Gallery with scroll preview  
✅ Message expires setelah 30 hari  

---

## 🆘 Troubleshooting

**Server tidak jalan?**
```bash
cd server
npm install
npm start
```

**Port 3000 sudah terpakai?**
Edit `server/.env`: `PORT=3001`

**Foto tidak upload?**
- File harus < 10MB
- Format: jpg, png, gif, webp

---

**Lihat `DEPLOYMENT.md` untuk detail lengkap!** 📖

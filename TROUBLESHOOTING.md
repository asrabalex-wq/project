# 🔧 Troubleshooting Guide

## ❌ "Gagal upload foto" Alert pada Page 3

### Penyebab Umum & Solusi

---

## 1️⃣ Server Tidak Berjalan

### Gejala:
- Alert: "Gagal upload foto: Failed to fetch"
- Console menunjukkan error di /api/upload

### Solusi:
```bash
# Windows - buka Command Prompt di folder server
cd server
npm install
npm start

# Mac/Linux
cd server
npm install
npm start

# Pastikan output menunjukkan:
# 🚀 Romantic Message Server Started
# 📌 Server URL: http://localhost:3000
```

**Verifikasi:**
- Buka browser: http://localhost:3000
- Harus menampilkan halaman form index.html

---

## 2️⃣ Browser Membuka File Langsung (file://)

### Gejala:
- URL di browser mulai dengan `file://` (bukan `http://`)
- Alert: "Gagal upload foto: Failed to fetch"

### Solusi:
**HARUS** akses melalui server, bukan file langsung:
- ❌ SALAH: `file:///C:/Users/.../MY PROJECT/index.html`
- ✅ BENAR: `http://localhost:3000`

**Cara:**
1. Buka Command Prompt di folder `server`
2. Jalankan: `npm start`
3. Buka browser: http://localhost:3000

---

## 3️⃣ Node.js Belum Terinstall

### Gejala:
- Error: "npm: command not found" atau "'npm' is not recognized"
- Command Prompt tidak bisa menemukan npm

### Solusi:

**Windows:**
1. Download Node.js: https://nodejs.org/
2. Install (recommended: LTS version)
3. Restart Command Prompt
4. Verify: `node --version` dan `npm --version`

**Mac:**
```bash
# Dengan Homebrew
brew install node

# Atau download dari https://nodejs.org/
```

**Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

---

## 4️⃣ Dependencies Belum Terinstall

### Gejala:
- Error: "Cannot find module 'express'"
- Server tidak bisa start

### Solusi:
```bash
cd server
npm install

# Pastikan file node_modules/ dibuat
# Dan file package-lock.json muncul
```

---

## 5️⃣ Port 3000 Sudah Digunakan

### Gejala:
- Error: "Error: listen EADDRINUSE: address already in use :::3000"

### Solusi:

**Windows:**
```bash
# Cari process yang pakai port 3000
netstat -ano | findstr :3000

# Kill process (ganti PID dengan number yang ditampilkan)
taskkill /PID [PID] /F

# Atau ubah port di .env
PORT=3001
```

**Mac/Linux:**
```bash
# Cari process
lsof -i :3000

# Kill process
kill -9 [PID]

# Atau ubah port di .env
PORT=3001
```

---

## 6️⃣ File Size Terlalu Besar

### Gejala:
- Alert: "Gagal upload foto: File terlalu besar"

### Solusi:
- Maksimal 10MB per file
- Maksimal 50 files sekaligus

**Kompres foto:**
- Gunakan aplikasi compress image
- Atau upload lebih sedikit foto

---

## 7️⃣ Format File Salah

### Gejala:
- Alert: "Gagal upload foto: Format tidak didukung"

### Solusi:
Hanya format image yang didukung:
- ✅ JPG, JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ❌ PDF, Document, Video

---

## 8️⃣ Folder Permissions (Linux/Mac)

### Gejala:
- Error: "Permission denied" saat create folder
- Server running tapi upload gagal

### Solusi:
```bash
# Give permissions
chmod -R 755 server/
chmod -R 755 server/uploads/
chmod -R 755 server/messages/
```

---

## 🔍 Debug Mode - Lihat Error Spesifik

### Di Browser:

1. **Buka Developer Console:**
   - Windows/Linux: Press `F12` atau `Ctrl + Shift + I`
   - Mac: Press `Cmd + Option + I`

2. **Pilih tab "Console"**

3. **Scroll down dan cari pesan error**

4. **Copy error message dan share**

### Di Server Terminal:

Server sudah menampilkan logs detailed:
```
🚀 Romantic Message Server Started
📌 Server URL: http://localhost:3000
📁 Upload folder: /path/to/server/uploads
...
```

Error akan ditampilkan di terminal saat terjadi:
```
Upload error: [ERROR MESSAGE]
Files uploaded successfully: [/uploads/file1.jpg, /uploads/file2.jpg]
Create message error: [ERROR MESSAGE]
```

---

## 📋 Checklist Sebelum Generate Link

Pastikan SEMUA sudah lengkap:

- [ ] Server running (terminal menunjukkan "🚀 Romantic Message Server Started")
- [ ] Browser akses `http://localhost:3000` (bukan `file://`)
- [ ] Step 1 form sudah isi (Nama Kamu, Nama Dia)
- [ ] Step 2 form sudah isi (Tempat ketemu, Kesan pertama)
- [ ] Step 3 form sudah isi (Pesan moment)
- [ ] Foto sudah select (1-50 file, JPG/PNG, max 10MB each)
- [ ] File format benar (image files only)

---

## 🆘 Masih Error?

### Langkah Troubleshooting:

1. **Close semua browser tab** yang akses localhost:3000

2. **Stop server** (Ctrl+C di terminal)

3. **Delete folder:**
   ```bash
   cd server
   rm -rf node_modules
   rm package-lock.json
   ```

4. **Reinstall:**
   ```bash
   npm install
   ```

5. **Start server lagi:**
   ```bash
   npm start
   ```

6. **Clear browser cache:**
   - Ctrl+Shift+Delete (atau Cmd+Shift+Delete di Mac)
   - Clear cache / cookies

7. **Coba di browser baru** (Incognito/Private mode)

---

## 📞 Info Lebih Lanjut

- **Backend docs:** [server/README.md](server/README.md)
- **Deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Quick start:** [QUICK_START.md](QUICK_START.md)

---

## ✅ Tips untuk Development

### Monitor server logs:
Terminal harus tetap terbuka dan menampilkan logs saat request terjadi

### Test dengan curl:
```bash
# Test health
curl http://localhost:3000/api/health

# Test upload (Windows gunakan Powershell atau WSL)
curl -X POST http://localhost:3000/api/upload \
  -F "photos=@path/to/image.jpg"
```

### Bersihkan localStorage jika ada issue:
```javascript
// Buka Console (F12) dan jalankan:
localStorage.clear();
location.reload();
```

---

**Last Updated:** April 17, 2026  
**Status:** ✅ Production Ready

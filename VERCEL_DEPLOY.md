# Panduan Deploy ke Vercel - Portofolio Zain Ahmad

File ini merangkum langkah-langkah praktis untuk mendepoy proyek portofolio ini ke **Vercel**.

## 🚀 Langkah-langkah Deployment

### 1. Persiapan Repositori
Pastikan kode terbaru Anda sudah di-push ke GitHub, GitLab, atau Bitbucket.
```bash
git add .
git commit -m "Siap untuk deployment"
git push origin main
```

### 2. Hubungkan ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Hubungkan akun GitHub Anda dan pilih repositori `ez-portofolio` (atau nama repositori Anda).

### 3. Konfigurasi Proyek
Vercel akan secara otomatis mendeteksi bahwa ini adalah proyek **Vite**. Pastikan pengaturan berikut sesuai (sudah diatur di `vercel.json`):

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install --legacy-peer-deps`

### 4. Pengaturan Environment Variables (PENTING)
Sebelum mengklik "Deploy", buka bagian **Environment Variables** dan masukkan variabel dari file `.env.example`:

| Key | Value | Keterangan |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://your-id.supabase.co` | URL dari Project Supabase Anda |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` | API Key Anonim dari Supabase |
| `VITE_API_URL` | `https://your-api-url.com/api` | (Opsional) Jika ada backend API eksternal |

> [!IMPORTANT]
> Jangan lupa tekan tombol **Add** untuk setiap variabel yang dimasukkan.

### 5. Deploy!
Klik tombol **"Deploy"**. Tunggu beberapa menit hingga proses build selesai.

---

## 🛠️ Catatan Teknis (vercel.json)
Proyek ini sudah dilengkapi dengan file `vercel.json` untuk memastikan build berjalan lancar di server Vercel:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install --legacy-peer-deps"
}
```

## ❓ Troubleshooting
- **Build Error (Dependencies):** Jika build gagal karena konflik dependensi, `installCommand` di atas (`--legacy-peer-deps`) akan membantu menyelesaikannya.
- **Supabase Not Connecting:** Pastikan URL dan Anon Key di Vercel Dashboard sudah benar/sama dengan yang ada di Supabase Dashboard.
- **Port Error:** Vercel secara otomatis menangani port, jadi variabel `PORT` di `.env` biasanya tidak diperlukan di production.

---
**Dibuat oleh Antigravity untuk Zain Ahmad Fahrezi**

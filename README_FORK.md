# FlyEnv - Community Unlocked Fork

Fork pribadi dari [FlyEnv](https://github.com/xpf0000/FlyEnv) dengan **semua fitur premium dibuka tanpa batasan**.

## Apa yang Berbeda?

Fork ini menghapus sistem lisensi premium original dan membuka akses penuh ke:

✅ **Image Optimizer** - Tanpa trial 3 hari  
✅ **Ollama AI Chat** - Tanpa trial 3 hari  
✅ **Host Management** - Unlimited sites (bukan hanya 3)  
✅ **Screencapture Tool** - Langsung bisa dipakai  

### Perubahan Teknis (Commit: `091de262`)

- **Hapus validasi lisensi**: Tidak ada lagi RSA decrypt atau API calls ke `api.one-env.com`
- **Hapus trial period**: Semua fitur langsung aktif tanpa countdown 3 hari
- **Hapus GitHub OAuth**: Tidak perlu login GitHub untuk license management
- **Disable telemetry**: Tidak ada phone-home ke server upstream
- **Return `isActive: true`**: Method `licensesInit()` selalu mengembalikan state unlocked

**Statistik**: Menghapus **306 baris** kode premium logic.

## Instalasi

```bash
git clone https://github.com/luqman-konsultanku/FlyEnv.git
cd FlyEnv
yarn install
yarn dev
```

## Build Produksi

```bash
yarn build
```

Binari hasil build ada di `dist/`.

## Kenapa Fork Ini Ada?

FlyEnv adalah tool development environment yang excellent, tapi fitur-fitur advanced seperti image optimizer dan AI chat dikunci di balik paywall dengan trial 3 hari. Fork ini memberikan akses penuh ke semua fitur untuk keperluan development personal tanpa harus beli license.

**Catatan Legal**: Fork ini purely untuk penggunaan pribadi. Jika kamu menggunakan FlyEnv secara profesional atau komersial, **dukung developer original** dengan membeli license resmi di [flyenv.com](https://flyenv.com).

## Upstream Original

Proyek original: https://github.com/xpf0000/FlyEnv  
License original: BSD 3-Clause  
Maintainer original: Pengfei Xu

## Disclaimer

Fork ini **BUKAN** official release dari FlyEnv. Tidak ada dukungan dari maintainer original. Gunakan dengan risiko sendiri. Jika kamu appreciate tools ini dan menggunakannya secara profesional, pertimbangkan untuk membeli license official untuk mendukung development upstream.

---

**Status Sync**: Forked dari `master` @ commit `163389fa` (4.18.3)  
**Last Modified**: 17 Sept 2026

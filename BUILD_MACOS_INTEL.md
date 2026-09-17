# Build FlyEnv untuk macOS Intel (x64)

Fork **luqman-konsultanku/FlyEnv** dengan semua fitur premium unlocked.

## Prerequisites

- macOS (Intel x64)
- Node.js 18+ 
- Yarn package manager
- Xcode Command Line Tools

## Build Steps

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/luqman-konsultanku/FlyEnv.git
cd FlyEnv
yarn install
```

**Note**: `yarn install` bisa lama (5-10 menit) karena Electron binaries besar.

### 2. Build untuk macOS Intel

```bash
yarn build:mac:intel
```

Script ini akan:
1. Clean dist folder
2. Clean node-pty build
3. Build main process dengan esbuild
4. Build fork process  
5. Build renderer dengan Vite
6. Package dengan electron-builder untuk x64 architecture

**Build time**: ~5-10 menit tergantung hardware.

### 3. Hasil Build

DMG installer ada di:
```bash
./release/FlyEnv-4.18.3-mac.dmg
```

### 4. Install & Run

Double-click DMG, drag FlyEnv.app ke Applications folder.

**macOS Gatekeeper Warning**: Pertama kali buka, mungkin ada warning "FlyEnv cannot be opened because it is from an unidentified developer". Solusi:

```bash
# Bypass Gatekeeper
sudo xattr -dr com.apple.quarantine /Applications/FlyEnv.app
```

Atau:
1. System Settings → Privacy & Security
2. Scroll ke bawah, klik "Open Anyway" untuk FlyEnv

## Troubleshooting

### "cross-env: command not found"

Jika `yarn build:mac:intel` error dengan `cross-env: command not found`:

```bash
npm install -g cross-env
# atau
yarn global add cross-env
```

### Build Manual Tanpa cross-env

```bash
# Set env vars manual
export FLYENV_MAC_BUILD_ARCH=x64
export NODE_OPTIONS=--max-old-space-size=8192
export NODE_ENV=production
export CSC_IDENTITY_AUTO_DISCOVERY=false

# Clean
yarn clean:dev
yarn clean

# Build scripts
npx esbuild --platform=node --bundle --packages=external \
  --inject:scripts/shim-dynamic-require.mjs --format=esm \
  scripts/app-builder-mac-intel.ts \
  --outfile=electron/app-builder-mac-intel.mjs

# Run builder
node electron/app-builder-mac-intel.mjs
```

### Electron cache corrupt

```bash
rm -rf ~/Library/Caches/electron
yarn clean
yarn install --force
```

### Node memory error saat build

Tambah memory:

```bash
export NODE_OPTIONS=--max-old-space-size=16384
yarn build:mac:intel
```

## Fitur Premium yang Unlocked

✅ **Image Optimizer** - Unlimited, tanpa trial  
✅ **Ollama AI Chat** - Unlimited, tanpa trial  
✅ **Host Management** - Unlimited sites (tidak dibatasi 3)  
✅ **Screencapture Tool** - Langsung aktif  

Tidak ada telemetry ke `api.one-env.com`.  
Tidak ada license validation.  
Tidak ada GitHub OAuth requirement.

## Source Code Changes

Lihat commit:
- `091de262` - Remove premium logic (306 lines)
- `a03c9107` - Add fork documentation

File yang dimodifikasi:
- `src/fork/module/App/index.ts` (stripped license methods)
- `src/fork/module/Image/index.ts` (unlocked)
- `src/fork/module/Ollama/index.ts` (unlocked)
- `src/fork/module/Host/index.ts` (unlimited sites)
- `src/main/core/ServerManager.ts` (no license sync)

## Development Mode

```bash
yarn dev
```

Electron akan start dengan hot reload.

## Support

**Upstream Original**: https://github.com/xpf0000/FlyEnv  
**Fork Repository**: https://github.com/luqman-konsultanku/FlyEnv  
**Issues**: GitHub Issues di fork repository

---

**Disclaimer**: Fork ini untuk personal use. Jika kamu pakai secara commercial, pertimbangkan beli license official dari upstream untuk support development.

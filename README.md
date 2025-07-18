# UMI Supervisor Portal 📱💻

A Progressive Web App (PWA) for the University Management Information System - Supervisor Portal. This application can be installed on desktop and mobile devices for a native app-like experience.

## 🚀 PWA Features

✅ **Desktop Installation** - Install on Windows, macOS, or Linux  
✅ **Mobile Installation** - Add to home screen on iOS and Android  
✅ **Offline Functionality** - Core features work without internet  
✅ **Service Worker** - Automatic caching and background updates  
✅ **Responsive Design** - Works perfectly on all screen sizes  
✅ **Native-like Experience** - Runs like a native application  

## 📱 Quick Install

### Desktop (Chrome, Edge, Firefox)
1. Open the app in your browser
2. Look for the install prompt or click the install icon (⬇️) in the address bar
3. Click "Install" and launch from your desktop

### Mobile
- **Android**: Tap menu → "Add to Home Screen"
- **iOS**: Tap Share → "Add to Home Screen"

📖 **Detailed installation guide**: See [PWA-SETUP.md](./PWA-SETUP.md)

## 🛠️ Development

This template provides a minimal setup to get React working in Vite with HMR, ESLint rules, and PWA capabilities.

### Commands

```bash
# Development server
npm run dev

# Build for production (generates PWA files)
npm run build

# Preview built PWA
npm run preview

# Lint code
npm run lint
```

### PWA Development

PWA features only work in the built version. Use `npm run build` followed by `npm run preview` to test PWA functionality locally.

## 🔧 Tech Stack

- **React 19** - UI framework
- **Vite 6** - Build tool and dev server
- **Vite PWA Plugin** - Progressive Web App capabilities
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Workbox** - Service worker and caching strategies

## 📋 Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Desktop Install | ✅ | ✅ | ✅ | ❌ |
| Mobile Install | ✅ | ✅ | ✅ | ✅ |
| Offline Support | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

## 🎨 Customization

The PWA can be customized by modifying:
- Icons in the `public/` directory
- Manifest settings in `vite.config.js`
- Service worker behavior via Workbox configuration
- Theme colors and branding

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

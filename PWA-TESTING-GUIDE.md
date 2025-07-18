# PWA Installation Testing Guide

## 🚨 Why You Can't See the Install Prompt

The PWA install prompt has strict requirements and may not show for several reasons:

### 1. **Development vs Production Mode**
❌ **Development** (`npm run dev`): PWA features are disabled  
✅ **Production** (`npm run build` + `npm run preview`): Full PWA functionality

### 2. **Browser Requirements**
The `beforeinstallprompt` event only fires when ALL criteria are met:

✅ **HTTPS or localhost** (✓ you have this)  
✅ **Valid web app manifest** (✓ generated)  
✅ **Service worker registered** (✓ generated)  
✅ **App not already installed**  
✅ **App not dismissed recently**  
✅ **User has interacted with the page**  
✅ **Browser supports PWA installation**  

### 3. **Common Issues**

#### **Issue: Already Dismissed**
- If you clicked "Not now" or dismissed it, it won't show again this session
- **Solution**: Clear browser data or use incognito mode

#### **Issue: Already "Installed"**
- Browser might think the app is already installed
- **Solution**: Check `chrome://apps/` and remove if present

#### **Issue: Timing**
- The event might not fire immediately
- **Solution**: Wait 2-3 minutes or interact with the page

## 🔧 Step-by-Step Testing

### Method 1: Proper PWA Testing
```bash
# 1. Build the PWA
npm run build

# 2. Preview (this is crucial!)
npm run preview

# 3. Open in browser
# Visit: http://localhost:4173/
```

### Method 2: Fresh Browser Test
1. **Open Chrome/Edge in incognito mode**
2. **Visit**: `http://localhost:4173/`
3. **Wait 30 seconds** and interact with the page
4. **Look for**:
   - Install icon in address bar (⬇️)
   - Three-dot menu → "Install UMI Supervisor Portal"
   - Custom install prompt (bottom-right)

### Method 3: Force Install Manually
If automatic prompt doesn't show:

1. **Chrome**: Address bar → Click install icon
2. **Edge**: Three dots → Apps → "Install this site as an app"
3. **Firefox**: Address bar → Install button

## 🐛 Debug Information

In development mode, you'll see a debug panel in the bottom-left:

```
PWA Debug
Status: Waiting for install event...
Prompt Available: No
Dismissed: No
Installed: No
```

### What Each Status Means:

- **"PWA criteria not met"**: Not in production mode
- **"Waiting for install event..."**: Normal, waiting for browser
- **"Install prompt ready"**: ✅ Ready to install!
- **"App already installed"**: Already installed in browser

## 🎯 Quick Fixes

### Fix 1: Clear Browser Data
```javascript
// In browser console:
sessionStorage.clear();
localStorage.clear();
// Then refresh page
```

### Fix 2: Reset PWA State
1. Chrome → Settings → Privacy → Clear browsing data
2. Select "Cookies and site data" + "Cached files"
3. Clear for localhost domain

### Fix 3: Check Chrome Apps
1. Go to `chrome://apps/`
2. Look for "UMI Supervisor Portal"
3. Right-click → Remove if present

## 🌟 Manual Installation

Even without the prompt, you can still install:

### Desktop (Chrome/Edge)
1. Three dots menu → More tools → "Create shortcut"
2. Check "Open as window"
3. Click "Create"

### Mobile
- **Android**: Menu → "Add to Home screen"
- **iOS**: Share → "Add to Home Screen"

## ✅ Verify Installation

After installation, verify it worked:

1. **Desktop**: Look for app in Start Menu/Applications
2. **Mobile**: Check home screen for app icon
3. **Browser**: App should open in standalone window (no address bar)
4. **Developer Tools**: Application tab → Manifest should show ✅

## 🔍 Troubleshooting Console

Open browser Developer Tools → Console and look for:

```
✅ PWA: beforeinstallprompt event fired
✅ SW registered: [ServiceWorkerRegistration]
❌ SW registration failed: [Error]
```

## 🎨 Testing Different Scenarios

### Scenario 1: First Visit
- Clear all data
- Visit in incognito
- Wait for prompt

### Scenario 2: Return Visitor
- Visit normally
- Check if already installed
- Look for update prompts

### Scenario 3: Different Browsers
- Test in Chrome, Edge, Firefox
- Mobile Safari (iOS) vs Chrome (Android)

## 📱 Mobile Testing

For mobile testing:

1. **Deploy to HTTPS** (required for mobile)
2. **Or use ngrok** for local testing:
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # After npm run preview
   ngrok http 4173
   ```

## 🚀 Expected Behavior

When everything works correctly:

1. **Visit site** → Install prompt appears after ~30 seconds
2. **Click "Install"** → Browser install dialog shows
3. **Confirm** → App installs and opens in standalone window
4. **Desktop shortcut** created automatically
5. **Subsequent visits** → No more install prompts

---

**Remember**: PWA installation is controlled by the browser, not your app. If the browser doesn't think installation criteria are met, the prompt won't show. Always test in production mode with `npm run build && npm run preview`! 
# Mobile Optimization Guide

This document explains how EyeVLM is optimized for mobile devices, including specific device support and responsive design considerations.

## Supported Devices

### iOS Devices
- **iPhone 13 Pro**: 390 x 844 px (6.1" display)
- **iPhone 13 Pro Max**: 428 x 926 px (6.7" display)
- **iPhone 14**: 390 x 844 px
- **iPhone 14 Pro**: 393 x 852 px
- **iPhone 15**: 393 x 852 px
- **iPhone 15 Pro Max**: 430 x 932 px

**Requirements**:
- iOS 15.0 or later
- Safari 15+, Chrome for iOS
- Camera permissions required
- Microphone permissions for voice input

### Android Devices
- **Pixel 5**: 393 x 851 px (6.0" display)
- **Pixel 6**: 412 x 915 px (6.4" display)
- **Pixel 7**: 412 x 915 px
- **Pixel 8**: 412 x 915 px
- **Samsung Galaxy S21+**: 384 x 854 px
- **Samsung Galaxy S22**: 360 x 800 px

**Requirements**:
- Android 11 or later
- Chrome 90+, Firefox for Android
- Camera permissions required
- Microphone permissions for voice input

## Responsive Design Implementation

### Viewport Configuration

The app uses dynamic viewport height (dvh) for proper mobile display:

```css
/* App container uses dvh for mobile compatibility */
height: 100dvh; /* Dynamic Viewport Height - accounts for mobile browser UI */
```

Add to your `index.html`:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#0d9488">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
</head>
```

### Breakpoints

The app uses Tailwind CSS breakpoints:

```css
/* Small devices (default) */
width: 100%; /* 320px - 640px */

/* Medium devices */
@media (min-width: 640px) {
  max-width: 428px; /* iPhone 13 Pro Max width */
  border-radius: 2.5rem;
  border: 8px solid theme('colors.slate.900');
}

/* Desktop */
@media (min-width: 1024px) {
  /* Frame effect for desktop */
}
```

### Touch Optimization

All interactive elements have minimum touch targets of 44x44px:

```tsx
// Buttons
className="h-14 w-full" // 56px height > 44px minimum

// Icon buttons
className="w-10 h-10" // 40px with padding = 48px effective target

// Cards
className="p-4" // Padding increases touch target
```

### Safe Areas (iOS Notch/Dynamic Island)

```css
/* Handle iOS safe areas */
.safe-top {
  padding-top: env(safe-area-inset-top);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Applied to:
- Header sections
- Bottom navigation
- Fixed buttons

## Camera Integration

### iOS Camera Access

```typescript
// Request camera permission
async function requestCameraPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment', // Use back camera
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      } 
    });
    return stream;
  } catch (error) {
    console.error('Camera permission denied:', error);
  }
}
```

### Android Camera Access

```typescript
// Android-specific camera constraints
const constraints = {
  video: {
    facingMode: { exact: 'environment' },
    width: { min: 1280, ideal: 1920, max: 3840 },
    height: { min: 720, ideal: 1080, max: 2160 },
    aspectRatio: 4/3
  }
};
```

## Performance Optimization

### Image Optimization

```typescript
// Compress images before upload
async function compressImage(file: File): Promise<Blob> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Compression failed:', error);
    return file;
  }
}
```

### Lazy Loading

```tsx
// Lazy load components
const EyeHealthGuideScreen = lazy(() => import('./components/EyeHealthGuideScreen'));
const PrivacyPolicyScreen = lazy(() => import('./components/PrivacyPolicyScreen'));

// Use with Suspense
<Suspense fallback={<LoadingScreen />}>
  <EyeHealthGuideScreen />
</Suspense>
```

### Service Worker (PWA)

Create `public/sw.js`:

```javascript
// Cache static assets
const CACHE_NAME = 'eyevlm-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/globals.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

## PWA Configuration

Create `public/manifest.json`:

```json
{
  "name": "EyeVLM - Eye Screening",
  "short_name": "EyeVLM",
  "description": "AI-powered eye condition screening",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d9488",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "permissions": [
    "camera",
    "microphone",
    "storage"
  ]
}
```

## Testing on Real Devices

### iOS Testing

1. **Using Safari Developer Tools**:
   - Connect iPhone via USB
   - Enable Web Inspector on iPhone (Settings > Safari > Advanced)
   - Open Safari > Develop > [Your iPhone] > [Your Site]

2. **Using Xcode Simulator**:
   ```bash
   # Install Xcode from Mac App Store
   # Open Simulator
   xcrun simctl list devices
   ```

3. **TestFlight** (for production testing):
   - Build app with Capacitor
   - Upload to App Store Connect
   - Invite testers

### Android Testing

1. **Using Chrome DevTools**:
   - Enable Developer Options on Android
   - Enable USB Debugging
   - Connect via USB
   - Open Chrome > chrome://inspect

2. **Using Android Studio Emulator**:
   ```bash
   # Install Android Studio
   # Create AVD (Android Virtual Device)
   # Run emulator
   ```

3. **Firebase App Distribution**:
   ```bash
   npm install -g firebase-tools
   firebase appdistribution:distribute app.apk
   ```

## Touch Gestures

### Implemented Gestures

```tsx
// Swipe to go back
const handleSwipe = (direction: 'left' | 'right') => {
  if (direction === 'right') {
    onBack();
  }
};

// Pinch to zoom (for image viewing)
const handlePinch = (scale: number) => {
  setZoomLevel(scale);
};
```

### Preventing Zoom on Input Focus (iOS)

```css
/* Prevent zoom when input is focused */
input, textarea, select {
  font-size: 16px; /* Minimum 16px prevents zoom on iOS */
}
```

## Network Optimization

### Offline Support

```typescript
// Check connectivity
window.addEventListener('online', () => {
  console.log('Back online');
  syncPendingData();
});

window.addEventListener('offline', () => {
  console.log('Offline mode');
  showOfflineNotification();
});
```

### Progressive Image Loading

```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src={highResImage}
  fallbackSrc={lowResImage}
  alt="Eye scan"
  className="w-full h-full object-cover"
/>
```

## Accessibility on Mobile

### Screen Reader Support

```tsx
// Proper labels for screen readers
<button
  aria-label="Capture eye photo"
  aria-describedby="camera-instructions"
>
  <Camera className="w-8 h-8" />
</button>

<div id="camera-instructions" className="sr-only">
  Position your eye in the center of the frame and tap to capture
</div>
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --border: #000000;
    --foreground: #000000;
    --background: #ffffff;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Battery Optimization

### Reduce CPU Usage

```typescript
// Throttle camera preview updates
let lastUpdate = 0;
const updateInterval = 100; // ms

function updatePreview() {
  const now = Date.now();
  if (now - lastUpdate < updateInterval) return;
  
  lastUpdate = now;
  // Update camera preview
}
```

### Wake Lock API (Prevent Screen Sleep)

```typescript
let wakeLock: WakeLockSentinel | null = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake lock active');
  } catch (err) {
    console.error('Wake lock failed:', err);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}
```

## Debugging Mobile Issues

### Remote Debugging

1. **iOS**: Safari > Develop > [Device]
2. **Android**: Chrome > chrome://inspect

### Console Logging

```typescript
// Mobile-friendly logging
if (import.meta.env.DEV) {
  const log = (...args: any[]) => {
    console.log('[EyeVLM]', ...args);
    // Also display on screen for mobile
    document.getElementById('debug')?.append(JSON.stringify(args));
  };
}
```

### Error Tracking

```typescript
// Track errors on mobile
window.addEventListener('error', (event) => {
  // Send to analytics
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

## Building for Mobile

### React Native (Native App)

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init

# Add platforms
npx cap add ios
npx cap add android

# Build
npm run build
npx cap sync
npx cap open ios
npx cap open android
```

### PWA (Progressive Web App)

```bash
# Build optimized version
npm run build

# Test PWA locally
npx serve -s dist
```

### Hybrid with Capacitor

```typescript
// access native features
import { Camera } from '@capacitor/camera';
import { Haptics } from '@capacitor/haptics';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });
  
  return image.webPath;
};
```

## Performance Benchmarks

Target metrics for mobile:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Image Upload**: < 5s
- **AI Analysis**: < 10s
- **Frame Rate**: 60 FPS
- **Bundle Size**: < 500KB (initial)

## Final Checklist

- [ ] Test on actual devices (iOS & Android)
- [ ] Verify camera permissions
- [ ] Test offline functionality
- [ ] Check touch targets (minimum 44x44px)
- [ ] Verify safe area handling
- [ ] Test in different orientations
- [ ] Verify PWA install prompt
- [ ] Test with slow 3G connection
- [ ] Verify battery impact
- [ ] Test accessibility features
- [ ] Check memory usage
- [ ] Verify proper image compression

---

For more information on mobile development, see:
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Web.dev Mobile Guide](https://web.dev/mobile/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://m3.material.io/)

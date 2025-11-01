# EyeVLM Complete Setup Instructions

This is a quick-start guide to get EyeVLM running on your local machine.

## Prerequisites

Ensure you have installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://python.org/))
- **Git** ([Download](https://git-scm.com/))
- **Firebase Account** (or Supabase as alternative)

## Quick Start (5 Steps)

### Step 1: Clone and Install Frontend

```bash
# Clone repository
git clone https://github.com/yourusername/eyevlm.git
cd eyevlm

# Install frontend dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 2: Start Frontend Development Server

```bash
npm run dev
```

The app will be available at: http://localhost:5173

### Step 3: Setup Backend (Optional for full functionality)

```bash
# Create backend directory
mkdir backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Create main.py (see API_INTEGRATION_GUIDE.md for code)
```

### Step 4: Configure Firebase

1. Go to https://console.firebase.google.com
2. Create new project
3. Enable **Firestore Database**
4. Enable **Storage**
5. Get your config credentials from Project Settings
6. Add credentials to `.env` file

### Step 5: Run the Application

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (if using)
cd backend
uvicorn main:app --reload
```

Open your browser to http://localhost:5173

## Testing Without Backend

The app includes mock data and will work without a backend for demonstration purposes. All screens and interactions are functional using simulated data.

## Mobile Testing

### Test on Your Phone

1. **Find your local IP**:
   ```bash
   # Windows
   ipconfig
   
   # macOS/Linux
   ifconfig
   ```

2. **Start dev server on network**:
   ```bash
   npm run dev -- --host 0.0.0.0
   ```

3. **Access from phone**:
   - Open browser on phone
   - Navigate to `http://YOUR_IP_ADDRESS:5173`
   - Example: `http://192.168.1.100:5173`

### iOS Testing

1. Connect iPhone to same Wi-Fi network
2. Open Safari
3. Enter the local IP address

### Android Testing

1. Connect Android to same Wi-Fi network
2. Open Chrome
3. Enter the local IP address

## Directory Structure

```
eyevlm/
├── components/              # React components
│   ├── ui/                 # UI components (shadcn)
│   ├── HomeScreen.tsx
│   ├── EyeCaptureScreen.tsx
│   ├── SymptomInputScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── HowItWorksScreen.tsx
│   ├── EyeHealthGuideScreen.tsx
│   ├── PrivacyPolicyScreen.tsx
│   ├── TermsOfServiceScreen.tsx
│   └── EditProfileScreen.tsx
├── styles/                 # CSS styles
│   └── globals.css
├── backend/               # Backend API (create this)
│   ├── main.py
│   ├── ml_service.py
│   └── models/
├── App.tsx                # Main app component
├── README.md              # Project documentation
├── requirements.txt       # Python dependencies
├── API_INTEGRATION_GUIDE.md
├── MOBILE_OPTIMIZATION.md
└── package.json           # Node dependencies
```

## Features Checklist

✅ **Completed Features:**
- [x] Onboarding flow with consent
- [x] Home screen with navigation
- [x] Eye capture screen with guidance
- [x] Symptom input (text and voice simulation)
- [x] Processing animation
- [x] Results screen with confidence scores
- [x] Detailed results with explanations
- [x] Scan history
- [x] User profile management
- [x] Edit profile (name, age, gender)
- [x] How It Works guide
- [x] Eye Health Guide (5 conditions)
- [x] Privacy Policy
- [x] Terms of Service
- [x] Responsive mobile design
- [x] All buttons are interactive
- [x] iPhone 13 Pro+ support
- [x] Pixel 5+ support

⚠️ **Requires Backend Integration:**
- [ ] Real camera capture
- [ ] Actual AI analysis
- [ ] Real voice-to-text
- [ ] Persistent data storage
- [ ] User authentication

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection Error

1. Verify credentials in `.env`
2. Check Firebase project is active
3. Ensure Firestore and Storage are enabled
4. Check browser console for specific errors

### Camera Not Working

- Grant camera permissions in browser
- Use HTTPS or localhost (required for camera access)
- Check browser compatibility

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Production Build

```bash
# Build optimized version
npm run build

# The dist/ folder contains production files
# Deploy dist/ folder to:
# - Netlify
# - Vercel
# - Firebase Hosting
# - AWS S3 + CloudFront
```

## API Integration

For connecting to real backend APIs, see:
- `API_INTEGRATION_GUIDE.md` - Detailed API setup
- `requirements.txt` - Python dependencies
- `MOBILE_OPTIMIZATION.md` - Mobile-specific configuration

## Key APIs You Need

1. **Firebase/Supabase** - Database and storage
   - Free tier available
   - Easy integration

2. **FastAPI Backend** - Custom API server
   - Python-based
   - Easy deployment

3. **ML Model API** - For eye condition detection
   - PyTorch or TensorFlow
   - Can use cloud ML services

4. **Whisper API** - For voice transcription (optional)
   - OpenAI Whisper
   - Can run locally or use API

## Database Schema (Firebase)

### Collections

**users/**
```javascript
{
  userId: string,
  name: string,
  age: number,
  gender: string,
  createdAt: timestamp
}
```

**scans/**
```javascript
{
  scanId: string,
  userId: string,
  imageUrl: string,
  symptoms: string,
  condition: string,
  confidence: number,
  severity: string,
  recommendation: string,
  timestamp: timestamp
}
```

## Next Steps

1. ✅ **You're running the app locally**
2. 🔄 Set up Firebase project
3. 🔄 Create backend API (see `API_INTEGRATION_GUIDE.md`)
4. 🔄 Train or obtain ML model
5. 🔄 Integrate real camera
6. 🔄 Connect voice transcription
7. 🔄 Deploy to production
8. 🔄 Test on real devices

## Support & Resources

- **Documentation**: All `.md` files in root directory
- **GitHub Issues**: Report bugs and request features
- **Email**: support@eyevlm.app

## License

MIT License - See LICENSE file

## Important Reminders

⚠️ **Medical Disclaimer**: This app is for screening purposes only and does not replace professional medical diagnosis.

⚠️ **Data Privacy**: Ensure compliance with HIPAA, GDPR, and local privacy laws when deploying.

⚠️ **Testing Required**: Thoroughly test on real devices before production use.

---

**Need Help?**

1. Check the documentation files
2. Review the code comments
3. Open a GitHub issue
4. Contact support

**Happy Coding! 🎉**

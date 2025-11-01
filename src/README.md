# EyeVLM - Eye Condition Screening App

EyeVLM is an AI-powered mobile application for preliminary eye condition screening through image and symptom analysis. The app helps users understand potential eye health issues and provides guidance on when to seek professional medical care.

## ⚠️ Medical Disclaimer

**EyeVLM is a screening tool and NOT a medical diagnostic device.** It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## 📱 Features

- **Eye Image Capture**: Guided camera interface with real-time quality feedback
- **Symptom Input**: Voice or text-based symptom description
- **AI Screening**: Multi-modal analysis combining image and symptom data
- **Explainable Results**: GradCAM heatmaps showing AI focus areas
- **Detailed Information**: Educational content about detected conditions
- **Scan History**: Personal record of previous screenings
- **Eye Health Guide**: Comprehensive information on common eye conditions
- **Multi-language Support**: English and Bengali (expandable)

## 🎯 Targeted Eye Conditions

- Cataract
- Pterygium
- Conjunctivitis (Pink Eye)
- Keratitis
- Uveitis

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **UI Library**: Tailwind CSS v4.0
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Build Tool**: Vite or Create React App
- **State Management**: React Hooks (useState, useContext)

### Backend
- **API Framework**: FastAPI (Python 3.9+)
- **Web Server**: Uvicorn (ASGI server)
- **Authentication**: JWT-based auth (optional)
- **File Handling**: Python Pillow for image processing
- **API Documentation**: FastAPI auto-generated (Swagger/OpenAPI)

### Database
- **Primary Database**: Firebase Firestore (NoSQL)
- **File Storage**: Firebase Storage
- **Alternative**: Supabase (PostgreSQL + Storage)

### Machine Learning
- **Framework**: PyTorch or TensorFlow
- **Vision Model**: EfficientNet, ResNet, or ConvNeXt
- **Multimodal**: BLIP-2, LLaVA, or CLIP + BERT fusion
- **Explainability**: GradCAM for heatmap generation
- **Speech-to-Text**: OpenAI Whisper (optional)
- **Model Serving**: TorchServe or TensorFlow Serving

### Mobile Deployment
- **React Native**: For native iOS/Android apps
- **PWA**: Progressive Web App for mobile browsers
- **Responsive Design**: Optimized for iPhone 13 Pro+, Pixel 5+

## 📋 Prerequisites

Before running the application, ensure you have:

### For Frontend:
- Node.js 18+ and npm/yarn
- Modern web browser

### For Backend:
- Python 3.9 or higher
- pip (Python package manager)
- Virtual environment tool (venv or conda)

### For Machine Learning:
- CUDA-capable GPU (recommended for training/inference)
- 8GB+ RAM
- Pre-trained model weights

### For Firebase:
- Firebase project with Firestore and Storage enabled
- Firebase configuration credentials

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eyevlm.git
cd eyevlm
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# or using yarn
yarn install

# Start development server
npm run dev

# Build for production
npm run build
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database and Storage
3. Download Firebase configuration file
4. Add credentials to `.env` file:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 🔧 Configuration

### Required API Keys and Services

1. **Firebase/Supabase**
   - Create project and get credentials
   - Configure in `.env` file

2. **OpenAI Whisper (Optional for voice input)**
   - Install locally or use API
   - `pip install openai-whisper`

3. **ML Model Endpoints**
   - Deploy trained models to cloud or local server
   - Update API endpoints in backend configuration

## 📦 Backend Requirements (requirements.txt)

The backend requires the following Python packages:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pillow==10.1.0
numpy==1.24.3
torch==2.1.0
torchvision==0.16.0
firebase-admin==6.2.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
pydantic==2.5.0
aiofiles==23.2.1
opencv-python==4.8.1
grad-cam==1.4.8
transformers==4.35.0
openai-whisper==20231117
```

See `requirements.txt` file in the backend directory.

## 🎨 UI/UX Design

- **Design System**: Modern, minimal, medical-grade aesthetic
- **Color Palette**: Soft teal (#0d9488), cyan (#06b6d4), neutral tones
- **Typography**: Inter or SF UI (system fonts)
- **Mobile-First**: Optimized for 375px - 428px width
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Works on iPhone 13 Pro+, Pixel 5+, tablets

## 🔐 Security & Privacy

- End-to-end encryption for data transmission
- Secure cloud storage with access controls
- HIPAA-compliant data handling (if applicable)
- User data anonymization for research
- Regular security audits
- GDPR and local privacy law compliance

## 📱 Mobile Device Support

### iOS
- iPhone 13 Pro and newer
- iOS 15.0+
- Safari, Chrome

### Android
- Pixel 5 and newer
- Android 11+
- Chrome, Firefox

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
pytest

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder to hosting service
```

### Backend (Railway/Heroku/AWS)
```bash
# Use Docker for containerization
docker build -t eyevlm-backend .
docker run -p 8000:8000 eyevlm-backend
```

### Firebase Hosting
```bash
firebase login
firebase init
firebase deploy
```

## 📊 Model Training

For training your own eye condition classification model:

1. Collect and annotate eye images dataset
2. Prepare data in required format
3. Train model using provided training scripts
4. Evaluate model performance
5. Export model for inference
6. Deploy to backend server

See `/ml-models/` directory for detailed instructions.

## 🌐 API Endpoints

### Backend API

**Base URL**: `http://localhost:8000/api/v1`

```
POST /scan/upload          - Upload eye image
POST /scan/symptoms        - Submit symptoms
POST /scan/analyze         - Get screening results
GET  /scan/history/:userId - Get scan history
GET  /conditions           - Get condition information
POST /auth/register        - User registration
POST /auth/login           - User login
```

See API documentation at: `http://localhost:8000/docs`

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

- **Development**: [Your Team]
- **AI/ML**: [ML Team]
- **Medical Advisory**: [Medical Advisors]

## 📞 Support

- **Email**: support@eyevlm.app
- **Issues**: GitHub Issues
- **Documentation**: [Link to docs]

## 🙏 Acknowledgments

- Medical advisors and ophthalmologists
- Open-source community
- Dataset providers
- Beta testers and early users

## ⚖️ Legal

- Privacy Policy: See app settings
- Terms of Service: See app settings
- Medical Disclaimer: App is not FDA approved for diagnostic use

---

**Version**: 1.0.0  
**Last Updated**: November 1, 2025

For detailed documentation, visit: [Documentation Link]

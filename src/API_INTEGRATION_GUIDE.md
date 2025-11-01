# EyeVLM API Integration Guide

This guide explains how to connect the EyeVLM frontend to the backend APIs and external services.

## Table of Contents
1. [Backend API Setup](#backend-api-setup)
2. [Firebase Configuration](#firebase-configuration)
3. [ML Model Endpoints](#ml-model-endpoints)
4. [Voice Processing API](#voice-processing-api)
5. [Frontend Integration](#frontend-integration)

---

## Backend API Setup

### 1. FastAPI Backend Structure

Create a basic FastAPI backend:

```bash
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Main Backend File (`backend/main.py`)

```python
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from PIL import Image
import io
import numpy as np
from typing import Optional

app = FastAPI(title="EyeVLM API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class SymptomInput(BaseModel):
    symptoms: str
    image_id: str

class ScanResult(BaseModel):
    condition: str
    confidence: float
    severity: str
    recommendation: str
    explanation: str
    heatmap_url: Optional[str]

# Load ML models (add your actual model loading code)
# model = torch.load('path/to/your/model.pth')

@app.get("/")
async def root():
    return {"message": "EyeVLM API is running"}

@app.post("/api/v1/scan/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload and preprocess eye image"""
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Check image quality
        quality_check = check_image_quality(image)
        
        # Save to storage (Firebase/Supabase)
        image_id = save_to_storage(image)
        
        return {
            "image_id": image_id,
            "quality": quality_check,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/v1/scan/analyze")
async def analyze_scan(symptoms: str, image_id: str):
    """Analyze eye image with symptoms"""
    try:
        # Retrieve image from storage
        image = retrieve_from_storage(image_id)
        
        # Run ML model inference
        result = run_inference(image, symptoms)
        
        # Generate GradCAM heatmap
        heatmap = generate_heatmap(image, result)
        
        return {
            "condition": result['condition'],
            "confidence": result['confidence'],
            "severity": result['severity'],
            "recommendation": result['recommendation'],
            "explanation": result['explanation'],
            "heatmap_url": heatmap
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def check_image_quality(image):
    """Check if image is clear, not blurry or overexposed"""
    # Implement quality checks
    # - Blur detection
    # - Glare detection
    # - Proper framing
    return "good"

def save_to_storage(image):
    """Save image to Firebase/Supabase storage"""
    # Implement storage logic
    return "image_id_123"

def retrieve_from_storage(image_id):
    """Retrieve image from storage"""
    # Implement retrieval logic
    pass

def run_inference(image, symptoms):
    """Run ML model inference"""
    # Implement model inference
    return {
        "condition": "Pterygium",
        "confidence": 87.5,
        "severity": "medium",
        "recommendation": "non-urgent",
        "explanation": "..."
    }

def generate_heatmap(image, result):
    """Generate GradCAM heatmap"""
    # Implement GradCAM
    return "heatmap_url"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 3. Run Backend

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

---

## Firebase Configuration

### 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Firestore Database
4. Enable Storage
5. Get configuration credentials

### 2. Frontend Firebase Setup

Create `.env` file in frontend root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Firebase Integration Code

Create `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 4. Backend Firebase Setup

```python
import firebase_admin
from firebase_admin import credentials, firestore, storage
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv('FIREBASE_STORAGE_BUCKET')
})

db = firestore.client()
bucket = storage.bucket()

# Save scan result
def save_scan_result(user_id, result_data):
    doc_ref = db.collection('scans').document()
    doc_ref.set({
        'user_id': user_id,
        'timestamp': firestore.SERVER_TIMESTAMP,
        **result_data
    })
    return doc_ref.id

# Upload image
def upload_image(file_bytes, filename):
    blob = bucket.blob(f'images/{filename}')
    blob.upload_from_string(file_bytes, content_type='image/jpeg')
    blob.make_public()
    return blob.public_url
```

---

## ML Model Endpoints

### 1. Model Inference Service

Create `backend/ml_service.py`:

```python
import torch
import torchvision.transforms as transforms
from PIL import Image
import numpy as np

class EyeConditionModel:
    def __init__(self, model_path):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = torch.load(model_path, map_location=self.device)
        self.model.eval()
        
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        
        self.conditions = [
            'Normal',
            'Cataract',
            'Pterygium',
            'Conjunctivitis',
            'Keratitis',
            'Uveitis'
        ]
    
    def predict(self, image: Image.Image, symptoms: str = ""):
        # Preprocess image
        img_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        # Run inference
        with torch.no_grad():
            outputs = self.model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            
        # Get prediction
        confidence, predicted_idx = torch.max(probabilities, 1)
        condition = self.conditions[predicted_idx.item()]
        
        # Determine severity and recommendation
        severity = self._determine_severity(confidence.item())
        recommendation = self._get_recommendation(condition, severity)
        
        return {
            'condition': condition,
            'confidence': round(confidence.item() * 100, 2),
            'severity': severity,
            'recommendation': recommendation,
            'explanation': self._get_explanation(condition)
        }
    
    def _determine_severity(self, confidence):
        if confidence < 0.5:
            return 'low'
        elif confidence < 0.8:
            return 'medium'
        else:
            return 'high'
    
    def _get_recommendation(self, condition, severity):
        if condition == 'Normal':
            return 'home-care'
        elif severity == 'high':
            return 'urgent'
        else:
            return 'non-urgent'
    
    def _get_explanation(self, condition):
        explanations = {
            'Cataract': 'A clouding of the lens that leads to decreased vision...',
            'Pterygium': 'A non-cancerous growth extending onto the cornea...',
            # Add more explanations
        }
        return explanations.get(condition, 'Consult a doctor for proper diagnosis.')

# Initialize model
model_service = EyeConditionModel('models/eye_condition_model.pth')
```

### 2. GradCAM Implementation

```python
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

def generate_gradcam(model, image, target_layer):
    cam = GradCAM(model=model, target_layers=[target_layer])
    grayscale_cam = cam(input_tensor=image)
    
    # Convert to RGB heatmap
    heatmap = show_cam_on_image(image, grayscale_cam[0], use_rgb=True)
    
    return heatmap
```

---

## Voice Processing API

### Using OpenAI Whisper

```python
import whisper

# Load model
whisper_model = whisper.load_model("base")

@app.post("/api/v1/voice/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save temporary audio file
        audio_path = f"temp/{file.filename}"
        with open(audio_path, "wb") as f:
            f.write(await file.read())
        
        # Transcribe
        result = whisper_model.transcribe(audio_path)
        
        # Clean up
        os.remove(audio_path)
        
        return {"transcription": result["text"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Frontend Integration

### 1. Create API Service

Create `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiService = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/api/v1/scan/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  },
  
  async analyzeScan(imageId: string, symptoms: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/scan/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_id: imageId, symptoms }),
    });
    
    if (!response.ok) throw new Error('Analysis failed');
    return response.json();
  },
  
  async transcribeAudio(audioBlob: Blob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    
    const response = await fetch(`${API_BASE_URL}/api/v1/voice/transcribe`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Transcription failed');
    return response.json();
  }
};
```

### 2. Update Components to Use API

Update `EyeCaptureScreen.tsx`:

```typescript
import { apiService } from '../services/api';

const handleCapture = async () => {
  // Capture image logic...
  const imageBlob = await captureImageAsBlob();
  const file = new File([imageBlob], 'eye-scan.jpg', { type: 'image/jpeg' });
  
  try {
    const result = await apiService.uploadImage(file);
    setCapturedImage(result.image_url);
    setImageId(result.image_id);
    setQualityCheck(result.quality);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

Update `SymptomInputScreen.tsx`:

```typescript
const handleVoiceInput = async () => {
  setIsRecording(true);
  
  // Record audio...
  const audioBlob = await recordAudio();
  
  try {
    const result = await apiService.transcribeAudio(audioBlob);
    setTranscribedText(result.transcription);
    setSymptoms(result.transcription);
  } catch (error) {
    console.error('Transcription failed:', error);
  } finally {
    setIsRecording(false);
  }
};
```

---

## Testing the Integration

### 1. Test Backend

```bash
# Start backend
cd backend
uvicorn main:app --reload

# Test endpoints
curl http://localhost:8000/
curl -X POST http://localhost:8000/api/v1/scan/upload -F "file=@test_image.jpg"
```

### 2. Test Frontend

```bash
# Start frontend
npm run dev

# Open browser at http://localhost:5173
```

### 3. Integration Testing

1. Capture an eye image
2. Submit symptoms
3. Verify results are received
4. Check Firebase storage for saved data

---

## Deployment Checklist

- [ ] Set up production Firebase project
- [ ] Deploy ML models to cloud (AWS SageMaker, GCP AI Platform)
- [ ] Configure HTTPS for API
- [ ] Set up environment variables
- [ ] Enable rate limiting and authentication
- [ ] Set up error logging (Sentry)
- [ ] Configure CDN for images
- [ ] Set up monitoring and analytics

---

## Troubleshooting

### CORS Issues
```python
# Update CORS origins in backend
allow_origins=["https://your-production-domain.com"]
```

### Firebase Connection
```bash
# Verify credentials
firebase projects:list
```

### ML Model Loading
```python
# Check CUDA availability
print(torch.cuda.is_available())
```

---

For more information, see:
- FastAPI docs: https://fastapi.tiangolo.com
- Firebase docs: https://firebase.google.com/docs
- PyTorch docs: https://pytorch.org/docs

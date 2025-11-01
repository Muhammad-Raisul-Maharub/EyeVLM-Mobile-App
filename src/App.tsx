import { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { HomeScreen } from './components/HomeScreen';
import { EyeCaptureScreen } from './components/EyeCaptureScreen';
import { SymptomInputScreen } from './components/SymptomInputScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ResultDetailsScreen } from './components/ResultDetailsScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { EyeHealthGuideScreen } from './components/EyeHealthGuideScreen';
import { PrivacyPolicyScreen } from './components/PrivacyPolicyScreen';
import { TermsOfServiceScreen } from './components/TermsOfServiceScreen';
import { EditProfileScreen, type UserProfile } from './components/EditProfileScreen';

export type ScanResult = {
  id: string;
  condition: string;
  confidence: number;
  date: Date;
  symptoms: string;
  imageUrl: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: 'home-care' | 'non-urgent' | 'urgent';
  explanation: string;
  detailedInfo: {
    description: string;
    riskFactors: string[];
    whenToSeekHelp: string;
    faq: { question: string; answer: string }[];
  };
};

export type Screen = 
  | 'onboarding' 
  | 'home' 
  | 'capture' 
  | 'symptoms' 
  | 'processing' 
  | 'results' 
  | 'details'
  | 'history'
  | 'profile'
  | 'how-it-works'
  | 'eye-health-guide'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'edit-profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string>('');
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ScanResult | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Guest User',
    age: '',
    gender: ''
  });

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleImageCaptured = (imageUrl: string) => {
    setCapturedImage(imageUrl);
    setCurrentScreen('symptoms');
  };

  const handleSymptomsSubmit = (symptomText: string) => {
    setSymptoms(symptomText);
    setCurrentScreen('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      const mockResult: ScanResult = {
        id: Date.now().toString(),
        condition: 'Pterygium',
        confidence: 87,
        date: new Date(),
        symptoms: symptomText,
        imageUrl: capturedImage || '',
        severity: 'medium',
        recommendation: 'non-urgent',
        explanation: 'A pterygium is a non-cancerous growth of the conjunctiva that can extend onto the cornea. It is often caused by prolonged exposure to UV light and dry conditions.',
        detailedInfo: {
          description: 'Pterygium is a raised, wedge-shaped growth of the conjunctiva that extends onto the cornea. It typically appears on the side of the eye closest to the nose. The growth is usually yellowish or pink and contains blood vessels.',
          riskFactors: [
            'Prolonged UV exposure',
            'Dry, dusty environments',
            'Living near the equator',
            'Outdoor occupation',
            'Age (more common in adults 20-40)'
          ],
          whenToSeekHelp: 'Seek medical attention if you experience vision changes, persistent redness, significant discomfort, or if the growth appears to be getting larger.',
          faq: [
            {
              question: 'Can pterygium cause blindness?',
              answer: 'In most cases, no. However, if left untreated and the growth extends significantly onto the cornea, it can affect vision.'
            },
            {
              question: 'How is it treated?',
              answer: 'Mild cases may only need lubricating eye drops. Surgery may be recommended if it affects vision or causes significant discomfort.'
            },
            {
              question: 'Can it come back after surgery?',
              answer: 'There is a risk of recurrence, which is why post-operative care and UV protection are important.'
            }
          ]
        }
      };
      
      setCurrentResult(mockResult);
      setScanHistory(prev => [mockResult, ...prev]);
      setCurrentScreen('results');
    }, 3000);
  };

  const handleNewScan = () => {
    setCapturedImage(null);
    setSymptoms('');
    setCurrentResult(null);
    setCurrentScreen('capture');
  };

  const handleViewDetails = (result: ScanResult) => {
    setSelectedHistoryItem(result);
    setCurrentScreen('details');
  };

  const handleViewHistoryItem = (result: ScanResult) => {
    setCurrentResult(result);
    setSelectedHistoryItem(result);
    setCurrentScreen('details');
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-2 sm:p-4">
      {/* Mobile Frame - Responsive for various devices */}
      <div className="w-full max-w-[428px] h-[100dvh] sm:h-[844px] sm:max-h-[90vh] bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden relative sm:border-8 sm:border-slate-900">
        {/* Screen Content */}
        <div className="h-full overflow-y-auto overflow-x-hidden">
          {currentScreen === 'onboarding' && !hasCompletedOnboarding && (
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          )}
          
          {currentScreen === 'home' && (
            <HomeScreen onNavigate={handleNavigate} userName={userProfile.name} />
          )}
          
          {currentScreen === 'capture' && (
            <EyeCaptureScreen 
              onImageCaptured={handleImageCaptured}
              onBack={() => setCurrentScreen('home')}
            />
          )}
          
          {currentScreen === 'symptoms' && (
            <SymptomInputScreen 
              onSubmit={handleSymptomsSubmit}
              onBack={() => setCurrentScreen('capture')}
            />
          )}
          
          {currentScreen === 'processing' && (
            <ProcessingScreen />
          )}
          
          {currentScreen === 'results' && currentResult && (
            <ResultsScreen 
              result={currentResult}
              onViewDetails={() => handleViewDetails(currentResult)}
              onNewScan={handleNewScan}
              onHome={() => setCurrentScreen('home')}
            />
          )}
          
          {currentScreen === 'details' && selectedHistoryItem && (
            <ResultDetailsScreen 
              result={selectedHistoryItem}
              onBack={() => setCurrentScreen(currentResult?.id === selectedHistoryItem.id ? 'results' : 'history')}
            />
          )}
          
          {currentScreen === 'history' && (
            <HistoryScreen 
              history={scanHistory}
              onViewItem={handleViewHistoryItem}
              onBack={() => setCurrentScreen('home')}
            />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileScreen 
              onBack={() => setCurrentScreen('home')} 
              onNavigate={handleNavigate}
              userProfile={userProfile}
            />
          )}
          
          {currentScreen === 'how-it-works' && (
            <HowItWorksScreen onBack={() => setCurrentScreen('home')} />
          )}
          
          {currentScreen === 'eye-health-guide' && (
            <EyeHealthGuideScreen onBack={() => setCurrentScreen('home')} />
          )}
          
          {currentScreen === 'privacy-policy' && (
            <PrivacyPolicyScreen onBack={() => setCurrentScreen('profile')} />
          )}
          
          {currentScreen === 'terms-of-service' && (
            <TermsOfServiceScreen onBack={() => setCurrentScreen('profile')} />
          )}
          
          {currentScreen === 'edit-profile' && (
            <EditProfileScreen 
              onBack={() => setCurrentScreen('profile')}
              onSave={handleSaveProfile}
              currentProfile={userProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

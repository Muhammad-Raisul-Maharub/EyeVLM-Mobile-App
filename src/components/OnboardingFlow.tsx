import { useState } from 'react';
import { Eye, Camera, MessageSquare, CheckCircle, Shield, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';

type OnboardingFlowProps = {
  onComplete: () => void;
};

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [hasConsented, setHasConsented] = useState(false);

  const steps = [
    {
      icon: Eye,
      title: 'Welcome to EyeVLM',
      subtitle: 'Your Eye Screening Assistant',
      description: 'AI-powered eye condition screening to help you understand your eye health and know when to seek professional care.',
      color: 'text-teal-600'
    },
    {
      icon: Camera,
      title: 'Capture Eye Photo',
      subtitle: 'Step 1',
      description: 'Simply take a clear photo of your eye using our guided camera interface. We\'ll provide instant feedback on image quality.',
      color: 'text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Describe Symptoms',
      subtitle: 'Step 2',
      description: 'Share your symptoms using voice input or text. Describe any redness, pain, blurry vision, or irritation you\'re experiencing.',
      color: 'text-cyan-600'
    },
    {
      icon: CheckCircle,
      title: 'Get Screening Results',
      subtitle: 'Step 3',
      description: 'Receive instant screening results with explanations and guidance on whether home care is sufficient or professional consultation is needed.',
      color: 'text-emerald-600'
    }
  ];

  if (step === steps.length) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 p-6">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-amber-600" />
          </div>
          
          <h2 className="text-center">Privacy & Disclaimer</h2>
          
          <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-slate-700">
                  <strong>This is not a medical diagnosis.</strong> EyeVLM is a screening tool to help you understand potential eye conditions and guide you on next steps.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-slate-700">
                  Your images and data are processed securely. We prioritize your privacy and do not share your information without consent.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox 
                checked={hasConsented}
                onCheckedChange={(checked) => setHasConsented(checked as boolean)}
                className="mt-1"
              />
              <span className="text-slate-700">
                I understand this is a screening tool, not a medical diagnosis, and I consent to the processing of my eye images for screening purposes.
              </span>
            </label>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={onComplete}
            disabled={!hasConsented}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            size="lg"
          >
            Get Started
          </Button>
          
          <button
            onClick={() => setStep(step - 1)}
            className="w-full text-slate-600 hover:text-slate-900"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg ${currentStep.color}`}>
          <Icon className="w-12 h-12" />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-slate-500">{currentStep.subtitle}</p>
          <h1 className="text-slate-900">{currentStep.title}</h1>
        </div>
        
        <p className="text-center text-slate-600 max-w-sm px-4">
          {currentStep.description}
        </p>
        
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step 
                  ? 'w-8 bg-teal-600' 
                  : index < step
                  ? 'w-2 bg-teal-400'
                  : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={() => setStep(step + 1)}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          size="lg"
        >
          {step === steps.length - 1 ? 'Continue' : 'Next'}
        </Button>
        
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full text-slate-600 hover:text-slate-900"
          >
            Back
          </button>
        )}
        
        {step === 0 && (
          <button
            onClick={() => setStep(steps.length)}
            className="w-full text-slate-600 hover:text-slate-900"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

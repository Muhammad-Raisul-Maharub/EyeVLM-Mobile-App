import { useState } from 'react';
import { ArrowLeft, Mic, MicOff, Edit3, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

type SymptomInputScreenProps = {
  onSubmit: (symptoms: string) => void;
  onBack: () => void;
};

export function SymptomInputScreen({ onSubmit, onBack }: SymptomInputScreenProps) {
  const [inputMethod, setInputMethod] = useState<'voice' | 'text'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [transcribedText, setTranscribedText] = useState('');

  const commonSymptoms = [
    'Redness',
    'Pain',
    'Blurry vision',
    'Irritation',
    'Itching',
    'Watering',
    'Discharge',
    'Sensitivity to light',
    'Swelling',
    'Dry eyes'
  ];

  const handleVoiceInput = () => {
    setIsRecording(true);
    
    // Simulate voice recording and transcription
    setTimeout(() => {
      setIsRecording(false);
      const mockTranscription = 'I have been experiencing redness and irritation in my right eye for the past two days. There is also some mild pain when I blink.';
      setTranscribedText(mockTranscription);
      setSymptoms(mockTranscription);
    }, 3000);
  };

  const handleSymptomClick = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.replace(symptom, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim());
    } else {
      const newSymptoms = symptoms ? `${symptoms}, ${symptom}` : symptom;
      setSymptoms(newSymptoms);
    }
  };

  const handleSubmit = () => {
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-white">Describe Symptoms</h2>
            <p className="text-teal-100">Tell us what you're experiencing</p>
          </div>
        </div>
        
        {/* Input Method Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setInputMethod('text')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              inputMethod === 'text'
                ? 'bg-white text-teal-700 shadow-lg'
                : 'bg-white/20 text-white'
            }`}
          >
            <Edit3 className="w-5 h-5 mx-auto mb-1" />
            <span>Text Input</span>
          </button>
          
          <button
            onClick={() => setInputMethod('voice')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              inputMethod === 'voice'
                ? 'bg-white text-teal-700 shadow-lg'
                : 'bg-white/20 text-white'
            }`}
          >
            <Mic className="w-5 h-5 mx-auto mb-1" />
            <span>Voice Input</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {inputMethod === 'text' ? (
          <>
            <div className="space-y-3">
              <label className="text-slate-900">
                Describe your symptoms
              </label>
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., I have redness and pain in my left eye..."
                className="min-h-[120px] rounded-2xl resize-none bg-white"
              />
              <p className="text-slate-500">
                Be as detailed as possible about what you're experiencing
              </p>
            </div>
            
            <div className="space-y-3">
              <label className="text-slate-900">
                Common symptoms (tap to add)
              </label>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`cursor-pointer transition-all ${
                      symptoms.includes(symptom)
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-teal-300'
                    }`}
                  >
                    {symptoms.includes(symptom) && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {!isRecording && !transcribedText && (
              <Card className="p-6 text-center bg-white">
                <Mic className="w-16 h-16 mx-auto mb-4 text-teal-600" />
                <h3 className="text-slate-900 mb-2">Voice Input</h3>
                <p className="text-slate-600 mb-6">
                  Tap the microphone button below and describe your symptoms clearly
                </p>
                <Button
                  onClick={handleVoiceInput}
                  className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                  size="lg"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              </Card>
            )}
            
            {isRecording && (
              <Card className="p-8 text-center bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-slate-900 mb-2">Recording...</h3>
                <p className="text-slate-600 mb-6">
                  Speak clearly and describe your symptoms
                </p>
                <div className="flex gap-2 justify-center mb-4">
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-12 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-10 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                  <div className="w-2 h-14 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                  <div className="w-2 h-8 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
                </div>
              </Card>
            )}
            
            {transcribedText && (
              <div className="space-y-4">
                <Card className="p-4 bg-emerald-50 border-2 border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-900">Transcribed</span>
                  </div>
                  <p className="text-slate-700">{transcribedText}</p>
                </Card>
                
                <div className="space-y-2">
                  <label className="text-slate-900">
                    Edit transcription if needed
                  </label>
                  <Textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px] rounded-2xl resize-none bg-white"
                  />
                </div>
                
                <Button
                  onClick={handleVoiceInput}
                  variant="outline"
                  className="w-full rounded-2xl"
                >
                  <MicOff className="w-5 h-5 mr-2" />
                  Record Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-200">
        <Button
          onClick={handleSubmit}
          disabled={!symptoms.trim()}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50"
          size="lg"
        >
          Continue to Analysis
        </Button>
      </div>
    </div>
  );
}

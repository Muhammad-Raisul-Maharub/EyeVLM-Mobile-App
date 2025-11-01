import { ArrowLeft, Camera, MessageSquare, Brain, FileCheck, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

type HowItWorksScreenProps = {
  onBack: () => void;
};

export function HowItWorksScreen({ onBack }: HowItWorksScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-white">How It Works</h2>
            <p className="text-teal-100">Understanding the screening process</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Introduction */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">EyeVLM Screening Process</h3>
          <p className="text-slate-700 leading-relaxed">
            EyeVLM uses artificial intelligence to analyze eye images and symptoms, providing you with preliminary screening results and guidance on when to seek professional care.
          </p>
        </Card>

        {/* Step 1 */}
        <Card className="p-5 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Step 1: Capture Eye Image</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Take a clear, well-lit photo of your eye using your phone's camera. Our app provides real-time guidance to ensure image quality.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Position your eye in the center of the frame</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Ensure good lighting without glare</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Keep your device steady for a sharp image</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Step 2: Describe Symptoms</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Tell us about your symptoms using voice input or text. Be as detailed as possible about what you're experiencing.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Describe pain, redness, or discomfort</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mention vision changes or blurriness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Note how long symptoms have persisted</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Step 3 */}
        <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Step 3: AI Analysis</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Our AI model processes your image and symptoms using advanced computer vision and natural language processing.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Image analysis using trained neural networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Symptom correlation with known conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>GradCAM visualization highlights affected areas</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Step 4 */}
        <Card className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-2">Step 4: Receive Results</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Get instant screening results with clear explanations and recommended next steps.
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Condition prediction with confidence score</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Simple language explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Guidance on home care or seeking medical help</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-5 bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-800 leading-relaxed">
                EyeVLM is a screening tool, not a diagnostic device. Results should not replace professional medical examination. Always consult a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </Card>

        {/* Technology Info */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Our Technology</h3>
          <div className="space-y-3 text-slate-700">
            <p className="leading-relaxed">
              <strong>Vision AI:</strong> Deep learning models trained on thousands of eye images to recognize patterns associated with common eye conditions.
            </p>
            <p className="leading-relaxed">
              <strong>Multimodal Analysis:</strong> Combines visual data with symptom descriptions for more accurate screening.
            </p>
            <p className="leading-relaxed">
              <strong>Explainable AI:</strong> GradCAM heatmaps show which areas of the eye the AI focused on when making its assessment.
            </p>
          </div>
        </Card>
      </div>

      {/* Bottom Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-200">
        <Button
          onClick={onBack}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          size="lg"
        >
          Got It
        </Button>
      </div>
    </div>
  );
}

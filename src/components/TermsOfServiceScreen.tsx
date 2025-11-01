import { ArrowLeft, FileText, AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';

type TermsOfServiceScreenProps = {
  onBack: () => void;
};

export function TermsOfServiceScreen({ onBack }: TermsOfServiceScreenProps) {
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
            <h2 className="text-white">Terms of Service</h2>
            <p className="text-teal-100">Usage terms & disclaimers</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Last Updated */}
        <Card className="p-4 bg-white">
          <p className="text-slate-600">Last Updated: November 1, 2025</p>
        </Card>

        {/* Introduction */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Agreement to Terms</h3>
          <p className="text-slate-700 leading-relaxed">
            By accessing or using the EyeVLM mobile application, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the app.
          </p>
        </Card>

        {/* Medical Disclaimer */}
        <Card className="p-5 bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <h3 className="text-red-900">Medical Disclaimer</h3>
          </div>
          
          <div className="space-y-3 text-red-800 leading-relaxed">
            <p>
              <strong>EyeVLM IS NOT A MEDICAL DEVICE AND DOES NOT PROVIDE MEDICAL DIAGNOSES.</strong>
            </p>
            <p>
              This app is a screening tool designed to provide preliminary information about potential eye conditions. It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare professionals with any questions regarding medical conditions.
            </p>
            <p>
              Never disregard professional medical advice or delay seeking it because of information provided by this app. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
          </div>
        </Card>

        {/* App Purpose */}
        <Card className="p-5 bg-white">
          <div className="flex items-start gap-3 mb-3">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Purpose and Scope</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            EyeVLM is designed to:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Provide preliminary screening for common eye conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Help users understand when to seek professional medical care</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Educate users about eye health and common conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Maintain a personal record of eye health screenings</span>
            </li>
          </ul>
        </Card>

        {/* User Responsibilities */}
        <Card className="p-5 bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">User Responsibilities</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            By using EyeVLM, you agree to:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Provide accurate information about your symptoms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Use the app for personal, non-commercial purposes only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Not rely solely on app results for medical decisions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Consult healthcare professionals for medical concerns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Not share your account with others</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span>Comply with all applicable laws and regulations</span>
            </li>
          </ul>
        </Card>

        {/* Limitations */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Limitations and Accuracy</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            You acknowledge and agree that:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>AI screening results are not 100% accurate and may contain errors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>Image quality affects screening accuracy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>The app may not detect all eye conditions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>False positives and false negatives may occur</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>The app is not suitable for emergency situations</span>
            </li>
          </ul>
        </Card>

        {/* Intellectual Property */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Intellectual Property</h3>
          <p className="text-slate-700 leading-relaxed">
            All content, features, and functionality of EyeVLM, including but not limited to text, graphics, logos, AI models, and software, are owned by EyeVLM or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the app without written permission.
          </p>
        </Card>

        {/* Data Usage */}
        <Card className="p-5 bg-white">
          <div className="flex items-start gap-3 mb-3">
            <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Data Collection and Use</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed">
            By using EyeVLM, you consent to the collection and use of your data as described in our Privacy Policy. This includes:
          </p>
          
          <ul className="space-y-2 text-slate-700 mt-3">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>Eye images for screening and analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>Symptom descriptions and health information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>Anonymized data for improving AI models</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>Usage analytics to enhance app performance</span>
            </li>
          </ul>
        </Card>

        {/* Liability Limitation */}
        <Card className="p-5 bg-slate-50 border-2 border-slate-200">
          <h3 className="text-slate-900 mb-3">Limitation of Liability</h3>
          <p className="text-slate-700 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, EYEVLM AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
          </p>
          
          <ul className="space-y-2 text-slate-700 mt-3">
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>Your use or inability to use the app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>Any inaccuracies or errors in screening results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>Medical decisions made based on app information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-600 mt-1">•</span>
              <span>Unauthorized access to your data</span>
            </li>
          </ul>
        </Card>

        {/* Warranty Disclaimer */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Warranty Disclaimer</h3>
          <p className="text-slate-700 leading-relaxed">
            THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
          </p>
        </Card>

        {/* Age Restriction */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Age Restriction</h3>
          <p className="text-slate-700 leading-relaxed">
            You must be at least 13 years old to use EyeVLM. If you are between 13 and 18 years old (or the age of majority in your jurisdiction), you must have parental or guardian consent to use the app.
          </p>
        </Card>

        {/* Termination */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Termination</h3>
          <p className="text-slate-700 leading-relaxed">
            We reserve the right to suspend or terminate your access to the app at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason in our sole discretion.
          </p>
        </Card>

        {/* Changes to Terms */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Changes to Terms</h3>
          <p className="text-slate-700 leading-relaxed">
            We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms in the app with a new "Last Updated" date. Your continued use of the app after changes constitutes acceptance of the new Terms.
          </p>
        </Card>

        {/* Governing Law */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Governing Law</h3>
          <p className="text-slate-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms or the app shall be resolved in the courts of [Your Jurisdiction].
          </p>
        </Card>

        {/* Contact */}
        <Card className="p-5 bg-teal-50 border-2 border-teal-200">
          <h3 className="text-slate-900 mb-3">Contact Us</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="text-slate-700 space-y-1">
            <p><strong>Email:</strong> legal@eyevlm.app</p>
            <p><strong>Address:</strong> EyeVLM Legal Department, [Your Address]</p>
            <p><strong>Phone:</strong> [Contact Number]</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

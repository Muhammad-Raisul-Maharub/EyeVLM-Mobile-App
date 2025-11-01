import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

type PrivacyPolicyScreenProps = {
  onBack: () => void;
};

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
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
            <h2 className="text-white">Privacy Policy</h2>
            <p className="text-teal-100">How we protect your data</p>
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
          <h3 className="text-slate-900 mb-3">Introduction</h3>
          <p className="text-slate-700 leading-relaxed">
            EyeVLM ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application for eye condition screening.
          </p>
        </Card>

        {/* Information We Collect */}
        <Card className="p-5 bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Information We Collect</h3>
          </div>
          
          <div className="space-y-4 text-slate-700">
            <div>
              <p className="mb-2"><strong>Personal Information:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Name, age, and gender (if provided)</li>
                <li>• Contact information (if provided)</li>
              </ul>
            </div>
            
            <div>
              <p className="mb-2"><strong>Health Information:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Eye images captured through the app</li>
                <li>• Symptom descriptions (text or voice recordings)</li>
                <li>• Screening results and history</li>
              </ul>
            </div>
            
            <div>
              <p className="mb-2"><strong>Technical Information:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Device information and identifiers</li>
                <li>• App usage data and analytics</li>
                <li>• Camera and storage permissions</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* How We Use Information */}
        <Card className="p-5 bg-white">
          <div className="flex items-start gap-3 mb-3">
            <Eye className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">How We Use Your Information</h3>
          </div>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>To provide eye condition screening and analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>To maintain your scan history for your reference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>To improve our AI models and screening accuracy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>To provide customer support and respond to inquiries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 mt-1">•</span>
              <span>To ensure app security and prevent misuse</span>
            </li>
          </ul>
        </Card>

        {/* Data Security */}
        <Card className="p-5 bg-emerald-50 border-2 border-emerald-200">
          <div className="flex items-start gap-3 mb-3">
            <Lock className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Data Security</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            We implement industry-standard security measures to protect your information:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>End-to-end encryption for data transmission</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Secure cloud storage with access controls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Regular security audits and updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Limited employee access to personal data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 mt-1">✓</span>
              <span>Anonymization of data used for research</span>
            </li>
          </ul>
        </Card>

        {/* Data Sharing */}
        <Card className="p-5 bg-white">
          <div className="flex items-start gap-3 mb-3">
            <UserCheck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Data Sharing and Disclosure</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            We do not sell your personal information. We may share your data only in the following circumstances:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span><strong>With your consent:</strong> When you explicitly authorize data sharing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span><strong>Service providers:</strong> Trusted partners who help operate our app (under strict confidentiality agreements)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span><strong>Legal requirements:</strong> When required by law or to protect rights and safety</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span><strong>Anonymized research:</strong> De-identified data for improving medical AI (with no personal identifiers)</span>
            </li>
          </ul>
        </Card>

        {/* Your Rights */}
        <Card className="p-5 bg-white">
          <div className="flex items-start gap-3 mb-3">
            <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <h3 className="text-slate-900">Your Rights</h3>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-3">
            You have the following rights regarding your personal data:
          </p>
          
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span><strong>Access:</strong> Request a copy of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span><strong>Correction:</strong> Update or correct inaccurate information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span><strong>Deletion:</strong> Request deletion of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span><strong>Portability:</strong> Receive your data in a portable format</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-1">•</span>
              <span><strong>Opt-out:</strong> Decline data collection for research purposes</span>
            </li>
          </ul>
        </Card>

        {/* Data Retention */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Data Retention</h3>
          <p className="text-slate-700 leading-relaxed">
            We retain your personal data only as long as necessary for the purposes stated in this policy, or as required by law. You can delete your scan history at any time through the app settings. After deletion, anonymized data may be retained for research and improvement purposes.
          </p>
        </Card>

        {/* Children's Privacy */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Children's Privacy</h3>
          <p className="text-slate-700 leading-relaxed">
            EyeVLM is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with personal information, please contact us to have it removed.
          </p>
        </Card>

        {/* Important Notice */}
        <Card className="p-5 bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-red-900 mb-2">Medical Disclaimer</h3>
              <p className="text-red-800 leading-relaxed">
                EyeVLM is a screening tool and not intended to replace professional medical advice, diagnosis, or treatment. We are not responsible for medical decisions made based on app results. Always consult qualified healthcare professionals for medical concerns.
              </p>
            </div>
          </div>
        </Card>

        {/* Changes to Policy */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Changes to This Policy</h3>
          <p className="text-slate-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy in the app and updating the "Last Updated" date. Your continued use of the app after changes constitutes acceptance of the updated policy.
          </p>
        </Card>

        {/* Contact */}
        <Card className="p-5 bg-teal-50 border-2 border-teal-200">
          <h3 className="text-slate-900 mb-3">Contact Us</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:
          </p>
          <div className="text-slate-700 space-y-1">
            <p><strong>Email:</strong> privacy@eyevlm.app</p>
            <p><strong>Address:</strong> EyeVLM Privacy Office, [Your Address]</p>
            <p><strong>Phone:</strong> [Contact Number]</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

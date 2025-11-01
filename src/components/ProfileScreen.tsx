import { ArrowLeft, User, Globe, Shield, Trash2, FileText, Mail, ChevronRight, Edit } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from './ui/alert-dialog';
import type { Screen } from '../App';
import type { UserProfile } from './EditProfileScreen';

type ProfileScreenProps = {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  userProfile: UserProfile;
};

export function ProfileScreen({ onBack, onNavigate, userProfile }: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-white">Profile & Settings</h2>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/95 backdrop-blur p-4 border-0">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900">{userProfile.name}</h3>
              <p className="text-slate-600">
                {userProfile.age && userProfile.gender 
                  ? `${userProfile.age} years • ${userProfile.gender}`
                  : userProfile.age 
                  ? `${userProfile.age} years`
                  : 'Using EyeVLM Screening'}
              </p>
            </div>
            <button 
              onClick={() => onNavigate('edit-profile')}
              className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center hover:bg-teal-200"
            >
              <Edit className="w-5 h-5 text-teal-700" />
            </button>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Language Settings */}
        <div>
          <h3 className="text-slate-900 mb-3 px-1">Language</h3>
          <Card className="bg-white divide-y divide-slate-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">App Language</p>
                  <p className="text-slate-500">English</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </Card>
        </div>

        {/* Privacy & Data */}
        <div>
          <h3 className="text-slate-900 mb-3 px-1">Privacy & Data</h3>
          <Card className="bg-white divide-y divide-slate-100">
            <button 
              onClick={() => onNavigate('privacy-policy')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">Privacy Policy</p>
                  <p className="text-slate-500">How we protect your data</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => onNavigate('terms-of-service')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">Terms of Service</p>
                  <p className="text-slate-500">Usage terms & disclaimers</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">Save scan history</p>
                  <p className="text-slate-500">Store scans locally</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-slate-900 mb-3 px-1">Support</h3>
          <Card className="bg-white divide-y divide-slate-100">
            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-amber-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">Contact Support</p>
                  <p className="text-slate-500">Get help with the app</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-700" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900">Help & FAQ</p>
                  <p className="text-slate-500">Common questions</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </Card>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="text-slate-900 mb-3 px-1">Data Management</h3>
          <Card className="bg-white">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-700" />
                    </div>
                    <div className="text-left">
                      <p className="text-red-900">Delete All Data</p>
                      <p className="text-red-600">Remove all scans & history</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-400" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your scan history and data. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="rounded-xl bg-red-600 hover:bg-red-700">
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Card>
        </div>

        <Separator />

        {/* App Info */}
        <div className="text-center space-y-2 pb-6">
          <p className="text-slate-900">EyeVLM v1.0.0</p>
          <p className="text-slate-500">
            Eye Screening Assistant
          </p>
          <p className="text-slate-400 max-w-xs mx-auto">
            This app is a screening tool and does not provide medical diagnoses. Always consult with a healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

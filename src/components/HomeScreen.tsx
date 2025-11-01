import { Camera, FileText, History, HelpCircle, User, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import type { Screen } from '../App';

type HomeScreenProps = {
  onNavigate: (screen: Screen) => void;
  userName?: string;
};

export function HomeScreen({ onNavigate, userName = 'Guest' }: HomeScreenProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-teal-100">{greeting}, {userName}!</p>
            <h1 className="text-white mt-1">Eye Health Check</h1>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
        
        <Card className="bg-white/95 backdrop-blur p-4 border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-teal-700" />
            </div>
            <div className="flex-1">
              <p className="text-slate-600">Quick screening in 3 steps</p>
              <p className="text-slate-500">Capture • Describe • Review</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Actions */}
      <div className="flex-1 px-6 py-8 space-y-6">
        <div>
          <h3 className="text-slate-900 mb-4">Main Actions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Card 
              onClick={() => onNavigate('capture')}
              className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-slate-900">Scan Eye</p>
                  <p className="text-slate-500 mt-1">Start screening</p>
                </div>
              </div>
            </Card>

            <Card 
              onClick={() => onNavigate('history')}
              className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-100"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                  <History className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-slate-900">History</p>
                  <p className="text-slate-500 mt-1">Past scans</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-slate-900 mb-4">Learn More</h3>
          
          <div className="space-y-3">
            <Card 
              onClick={() => onNavigate('how-it-works')}
              className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900">How It Works</p>
                <p className="text-slate-500">Learn about the screening process</p>
              </div>
            </Card>

            <Card 
              onClick={() => onNavigate('eye-health-guide')}
              className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-purple-700" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900">Eye Health Guide</p>
                <p className="text-slate-500">Common conditions & prevention</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 safe-bottom">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-teal-600">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-teal-600">Home</span>
          </button>
          
          <button 
            onClick={() => onNavigate('capture')}
            className="flex flex-col items-center gap-1 -mt-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <span className="text-slate-500 mt-1">Scan</span>
          </button>
          
          <button 
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

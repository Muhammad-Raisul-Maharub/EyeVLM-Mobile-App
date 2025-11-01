import { Loader2, Eye, Brain, FileSearch, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function ProcessingScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-sm w-full space-y-8">
        {/* Animated Icon */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse opacity-30" />
          <div className="absolute inset-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute inset-[2px] bg-gradient-to-br from-teal-50 to-cyan-50 rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="w-12 h-12 text-teal-700 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-slate-900">Analyzing Your Data</h2>
          <p className="text-slate-600">
            Processing your eye image and symptoms...
          </p>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-teal-700" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Analyzing eye image</p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-1.5 rounded-full animate-pulse" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileSearch className="w-5 h-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Processing symptoms</p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-purple-700" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900">Generating insights</p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full animate-pulse" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <AlertDescription className="text-amber-900">
            Please wait while we analyze your data. This is a screening tool and not a clinical diagnosis.
          </AlertDescription>
        </Alert>

        {/* Loading indicator */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, Info, Home, Camera, AlertTriangle, CheckCircle, AlertCircle, Share2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { ScanResult } from '../App';

type ResultsScreenProps = {
  result: ScanResult;
  onViewDetails: () => void;
  onNewScan: () => void;
  onHome: () => void;
};

export function ResultsScreen({ result, onViewDetails, onNewScan, onHome }: ResultsScreenProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'home-care':
        return {
          icon: CheckCircle,
          color: 'from-emerald-600 to-green-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          title: 'Home Care Recommended',
          description: 'This condition can typically be managed at home with proper care.'
        };
      case 'non-urgent':
        return {
          icon: AlertCircle,
          color: 'from-amber-600 to-orange-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          title: 'Non-Urgent Consultation',
          description: 'Schedule an appointment with an eye care professional soon.'
        };
      case 'urgent':
        return {
          icon: AlertTriangle,
          color: 'from-red-600 to-rose-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Urgent Referral Needed',
          description: 'Please seek immediate medical attention from an eye specialist.'
        };
      default:
        return {
          icon: Info,
          color: 'from-blue-600 to-cyan-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Consultation Recommended',
          description: 'Please consult with a healthcare professional.'
        };
    }
  };

  const recommendationConfig = getRecommendationConfig(result.recommendation);
  const RecommendationIcon = recommendationConfig.icon;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Screening Results</h2>
          <button 
            onClick={onHome}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
        
        <Card className="bg-white/95 backdrop-blur p-4 border-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-900">{result.condition}</h3>
            <Badge className={`${getSeverityColor(result.severity)} border-2`}>
              {result.severity.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span className="text-slate-700">{result.confidence}%</span>
          </div>
          <p className="text-slate-500 mt-2">Confidence Score</p>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Eye Image with Heatmap */}
        <Card className="overflow-hidden bg-white">
          <div className="relative">
            <img 
              src={result.imageUrl} 
              alt="Eye scan" 
              className="w-full h-48 object-cover"
            />
            {/* Simulated heatmap overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-transparent mix-blend-multiply" />
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg">
              <span className="text-white">GradCAM Heatmap</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-slate-600">
              The highlighted area shows regions of interest identified by our AI model.
            </p>
          </div>
        </Card>

        {/* Explanation */}
        <Card className="p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-teal-600" />
            <h3 className="text-slate-900">What This Means</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {result.explanation}
          </p>
        </Card>

        {/* Recommendation */}
        <Card className={`p-5 ${recommendationConfig.bgColor} border-2 ${recommendationConfig.borderColor}`}>
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${recommendationConfig.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <RecommendationIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">{recommendationConfig.title}</h3>
              <p className="text-slate-700">
                {recommendationConfig.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Symptoms Review */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Your Reported Symptoms</h3>
          <p className="text-slate-700 leading-relaxed">
            {result.symptoms}
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="h-12 rounded-2xl border-2 border-teal-200 hover:bg-teal-50"
          >
            <Info className="w-5 h-5 mr-2" />
            View Details
          </Button>
          
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-2 border-slate-200 hover:bg-slate-50"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Result
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 space-y-3">
        <Button
          onClick={onNewScan}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          size="lg"
        >
          <Camera className="w-5 h-5 mr-2" />
          New Scan
        </Button>
        
        <button
          onClick={onHome}
          className="w-full text-slate-600 hover:text-slate-900"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

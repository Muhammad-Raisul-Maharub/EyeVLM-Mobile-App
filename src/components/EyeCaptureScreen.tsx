import { useState, useRef, useEffect } from 'react';
import { Camera, RotateCcw, Zap, ZapOff, ArrowLeft, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

type EyeCaptureScreenProps = {
  onImageCaptured: (imageUrl: string) => void;
  onBack: () => void;
};

export function EyeCaptureScreen({ onImageCaptured, onBack }: EyeCaptureScreenProps) {
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [qualityCheck, setQualityCheck] = useState<'good' | 'blur' | 'glare' | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simulate camera access
    setHasCamera(true);
  }, []);

  const handleCapture = () => {
    // Simulate image capture
    const mockImageUrl = 'https://images.unsplash.com/photo-1574350822445-5949664c3c92?w=800';
    setCapturedImage(mockImageUrl);
    
    // Simulate quality check
    const qualities: ('good' | 'blur' | 'glare')[] = ['good', 'blur', 'glare'];
    const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
    setQualityCheck(randomQuality);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setQualityCheck(null);
  };

  const handleUseImage = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center gap-4 relative z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-white">Capture Eye Photo</h2>
          <p className="text-slate-400">Position your eye in the frame</p>
        </div>
        <button
          onClick={() => setShowTutorial(true)}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Camera Preview / Captured Image */}
      <div className="flex-1 relative bg-slate-800 flex items-center justify-center">
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured eye" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            {/* Simulated camera preview */}
            <div className="absolute inset-0 opacity-40">
              <div className="w-full h-full bg-gradient-to-br from-teal-900/20 to-blue-900/20" />
            </div>
            
            {/* Eye position guide overlay */}
            <div className="relative z-10">
              <div className="w-64 h-48 rounded-full border-4 border-teal-400 border-dashed flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-teal-400" />
                  <p className="text-teal-400">Position your eye here</p>
                </div>
              </div>
            </div>
            
            {/* Corner guides */}
            <div className="absolute top-20 left-12 w-12 h-12 border-l-2 border-t-2 border-teal-400" />
            <div className="absolute top-20 right-12 w-12 h-12 border-r-2 border-t-2 border-teal-400" />
            <div className="absolute bottom-32 left-12 w-12 h-12 border-l-2 border-b-2 border-teal-400" />
            <div className="absolute bottom-32 right-12 w-12 h-12 border-r-2 border-b-2 border-teal-400" />
          </div>
        )}

        {/* Quality feedback */}
        {qualityCheck && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <Alert className={`${
              qualityCheck === 'good' 
                ? 'bg-emerald-500/95 text-white border-emerald-400' 
                : 'bg-amber-500/95 text-white border-amber-400'
            } backdrop-blur`}>
              <div className="flex items-center gap-2">
                {qualityCheck === 'good' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <AlertDescription className="text-white">
                  {qualityCheck === 'good' && 'Good quality image!'}
                  {qualityCheck === 'blur' && 'Image appears blurry. Please retake.'}
                  {qualityCheck === 'glare' && 'Glare detected. Adjust lighting.'}
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-slate-900 px-6 py-6 space-y-4">
        {!capturedImage ? (
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                flashEnabled 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {flashEnabled ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
            </button>
            
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-4 border-white"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
            
            <div className="w-14 h-14" />
          </div>
        ) : (
          <div className="space-y-3">
            {qualityCheck === 'good' && (
              <Button
                onClick={handleUseImage}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                size="lg"
              >
                Use This Photo
              </Button>
            )}
            
            <Button
              onClick={handleRetake}
              variant="outline"
              className="w-full h-14 rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Photo
            </Button>
          </div>
        )}
      </div>

      {/* Tutorial Dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="rounded-3xl max-w-sm">
          <DialogHeader>
            <DialogTitle>How to Take a Good Photo</DialogTitle>
            <DialogDescription>
              Follow these tips for the best results
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700">1</span>
              </div>
              <div>
                <p className="text-slate-900">Hold still</p>
                <p className="text-slate-600">Keep your device steady for a clear image</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700">2</span>
              </div>
              <div>
                <p className="text-slate-900">Good lighting</p>
                <p className="text-slate-600">Ensure adequate lighting without glare</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700">3</span>
              </div>
              <div>
                <p className="text-slate-900">Position correctly</p>
                <p className="text-slate-600">Center your eye in the guide frame</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700">4</span>
              </div>
              <div>
                <p className="text-slate-900">Keep eye open</p>
                <p className="text-slate-600">Show the front of your eye clearly</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setShowTutorial(false)}
            className="w-full rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600"
          >
            Got It
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

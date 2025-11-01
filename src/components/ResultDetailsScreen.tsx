import { ArrowLeft, AlertCircle, Info, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Alert, AlertDescription } from './ui/alert';
import type { ScanResult } from '../App';

type ResultDetailsScreenProps = {
  result: ScanResult;
  onBack: () => void;
};

export function ResultDetailsScreen({ result, onBack }: ResultDetailsScreenProps) {
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
            <h2 className="text-white">Detailed Information</h2>
            <p className="text-teal-100">{result.condition}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Image */}
        <Card className="overflow-hidden bg-white">
          <img 
            src={result.imageUrl} 
            alt="Eye scan" 
            className="w-full h-48 object-cover"
          />
        </Card>

        {/* Description */}
        <Card className="p-5 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-teal-600" />
            <h3 className="text-slate-900">About {result.condition}</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {result.detailedInfo.description}
          </p>
        </Card>

        {/* Highlighted Area Explanation */}
        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 mb-2">AI Analysis Highlight</h3>
              <p className="text-slate-700 leading-relaxed">
                The heatmap overlay on your eye image shows the areas our AI model focused on when making this assessment. Warmer colors (red/yellow) indicate regions of higher interest.
              </p>
            </div>
          </div>
        </Card>

        {/* Risk Factors */}
        <Card className="p-5 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-slate-900">Risk Factors</h3>
          </div>
          <ul className="space-y-3">
            {result.detailedInfo.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-700">•</span>
                </div>
                <span className="text-slate-700 flex-1">{factor}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* When to Seek Help */}
        <Alert className="bg-red-50 border-2 border-red-200">
          <AlertCircle className="w-5 h-5 text-red-700" />
          <AlertDescription>
            <h3 className="text-red-900 mb-2">When to Seek Medical Help</h3>
            <p className="text-red-800 leading-relaxed">
              {result.detailedInfo.whenToSeekHelp}
            </p>
          </AlertDescription>
        </Alert>

        {/* FAQ Section */}
        <Card className="p-5 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-slate-900">Frequently Asked Questions</h3>
          </div>
          
          <Accordion type="single" collapsible className="space-y-3">
            {result.detailedInfo.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 rounded-xl px-4 bg-slate-50">
                <AccordionTrigger className="text-slate-900 hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Disclaimer */}
        <Alert className="bg-blue-50 border-2 border-blue-200">
          <Info className="w-5 h-5 text-blue-700" />
          <AlertDescription className="text-blue-900">
            This information is for educational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </div>

      {/* Bottom Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-200">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full h-14 rounded-2xl border-2"
          size="lg"
        >
          Back to Results
        </Button>
      </div>
    </div>
  );
}

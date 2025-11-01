import { ArrowLeft, Eye, AlertCircle, Info, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useState } from 'react';

type EyeHealthGuideScreenProps = {
  onBack: () => void;
};

type Condition = {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string;
  whenToSeekHelp: string;
};

export function EyeHealthGuideScreen({ onBack }: EyeHealthGuideScreenProps) {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const conditions: Condition[] = [
    {
      name: 'Cataract',
      description: 'A cataract is a clouding of the normally clear lens of the eye, which leads to a decrease in vision. It develops slowly and is most commonly related to aging, but can also occur due to trauma, radiation, or as a side effect of medications.',
      symptoms: [
        'Cloudy or blurry vision',
        'Faded colors',
        'Glare and halos around lights',
        'Poor night vision',
        'Double vision in one eye',
        'Frequent changes in eyeglass prescription'
      ],
      causes: [
        'Aging (most common)',
        'Diabetes',
        'Excessive UV light exposure',
        'Smoking and alcohol use',
        'Eye injury or inflammation',
        'Prolonged use of corticosteroid medications',
        'Genetic factors'
      ],
      prevention: [
        'Wear sunglasses with UV protection',
        'Quit smoking',
        'Manage diabetes and other health conditions',
        'Eat a healthy diet rich in antioxidants',
        'Limit alcohol consumption',
        'Get regular eye examinations'
      ],
      treatment: 'Early cataracts may be managed with stronger eyeglasses and better lighting. However, surgery is the only effective treatment when cataracts significantly impair vision. Cataract surgery involves removing the clouded lens and replacing it with a clear artificial lens.',
      whenToSeekHelp: 'Consult an eye care professional if you notice changes in your vision, difficulty with daily activities like reading or driving, or increased sensitivity to light and glare.'
    },
    {
      name: 'Pterygium',
      description: 'Pterygium is a non-cancerous growth of the conjunctiva (the clear mucous membrane covering the white part of the eye) that extends onto the cornea. It often appears as a raised, wedge-shaped tissue growth, usually on the side closest to the nose.',
      symptoms: [
        'Raised, wedge-shaped growth on the eye',
        'Redness and inflammation',
        'Dry, itchy sensation',
        'Feeling of having something in the eye',
        'Blurred vision (if growth extends over cornea)',
        'Irritation from wind, dust, or smoke'
      ],
      causes: [
        'Prolonged exposure to UV light',
        'Dry, dusty, sandy, or windy environments',
        'Living in sunny climates near the equator',
        'Outdoor occupations or activities',
        'Chronic eye irritation',
        'Genetic predisposition'
      ],
      prevention: [
        'Wear UV-protective sunglasses and wide-brimmed hats',
        'Use artificial tears to keep eyes moist',
        'Avoid prolonged exposure to wind and dust',
        'Wear protective eyewear in harsh environments',
        'Take breaks from outdoor activities in bright sunlight'
      ],
      treatment: 'Mild pterygium may only require lubricating eye drops and monitoring. If it causes significant discomfort or affects vision, surgical removal may be recommended. Post-surgery, medications help reduce inflammation and prevent recurrence.',
      whenToSeekHelp: 'See an eye doctor if you notice a growth on your eye, experience persistent redness or irritation, have vision changes, or if the pterygium appears to be growing rapidly.'
    },
    {
      name: 'Conjunctivitis (Pink Eye)',
      description: 'Conjunctivitis, commonly known as pink eye, is an inflammation or infection of the conjunctiva. It can be caused by viruses, bacteria, allergens, or irritants. The condition is highly contagious when caused by infectious agents.',
      symptoms: [
        'Redness in the white of the eye',
        'Increased tearing or watery discharge',
        'Thick yellow or green discharge (bacterial)',
        'Itchy or burning eyes',
        'Crusty eyelids, especially upon waking',
        'Sensitivity to light',
        'Gritty feeling in the eyes'
      ],
      causes: [
        'Viral infections (most common)',
        'Bacterial infections',
        'Allergies (pollen, dust, pet dander)',
        'Chemical irritants (chlorine, smoke)',
        'Foreign objects in the eye',
        'Blocked tear duct (in newborns)'
      ],
      prevention: [
        'Wash hands frequently',
        'Avoid touching or rubbing eyes',
        'Don\'t share personal items (towels, pillows, eye makeup)',
        'Change pillowcases regularly',
        'Remove contact lenses if eyes become irritated',
        'Keep distance from people with pink eye',
        'Manage allergies effectively'
      ],
      treatment: 'Viral conjunctivitis usually resolves on its own within 1-2 weeks. Bacterial conjunctivitis may require antibiotic eye drops. Allergic conjunctivitis is treated with antihistamine or anti-inflammatory drops. Cool compresses and artificial tears can provide comfort.',
      whenToSeekHelp: 'Seek medical attention if you experience severe pain, vision changes, intense redness, symptoms lasting more than a week, or if you have a weakened immune system.'
    },
    {
      name: 'Keratitis',
      description: 'Keratitis is an inflammation of the cornea (the clear, dome-shaped front surface of the eye). It can be caused by infections, injuries, or underlying conditions. If left untreated, keratitis can lead to serious complications including vision loss.',
      symptoms: [
        'Eye pain and discomfort',
        'Redness and bloodshot appearance',
        'Excessive tearing or discharge',
        'Difficulty opening the eyelid',
        'Blurred or decreased vision',
        'Sensitivity to light (photophobia)',
        'Feeling of something in the eye',
        'Swollen eyelids'
      ],
      causes: [
        'Bacterial, viral, fungal, or parasitic infections',
        'Improper contact lens use or care',
        'Eye injury or trauma',
        'Contaminated water exposure',
        'Dry eyes',
        'Vitamin A deficiency',
        'Weakened immune system'
      ],
      prevention: [
        'Practice proper contact lens hygiene',
        'Never sleep in contact lenses unless prescribed',
        'Wash hands before touching eyes or lenses',
        'Replace contact lens solution and cases regularly',
        'Remove lenses if eyes become red or irritated',
        'Avoid swimming or showering with contacts',
        'Protect eyes from injury with safety glasses'
      ],
      treatment: 'Treatment depends on the cause. Bacterial keratitis requires antibiotic eye drops. Viral keratitis may need antiviral medications. Fungal or parasitic infections require specific antimicrobial treatments. Severe cases may need hospitalization and intensive therapy.',
      whenToSeekHelp: 'Keratitis is a medical emergency. Seek immediate medical attention if you experience eye pain, redness, vision changes, or discharge, especially if you wear contact lenses or had an eye injury.'
    },
    {
      name: 'Uveitis',
      description: 'Uveitis is inflammation of the uvea, the middle layer of the eye that consists of the iris, ciliary body, and choroid. It can affect one or both eyes and may be acute or chronic. Uveitis can damage vital eye tissue and lead to permanent vision loss if not treated promptly.',
      symptoms: [
        'Eye redness',
        'Eye pain',
        'Blurred or decreased vision',
        'Sensitivity to light (photophobia)',
        'Floating spots in vision (floaters)',
        'Dark, floating shapes',
        'Small pupil size',
        'Headaches'
      ],
      causes: [
        'Autoimmune disorders (rheumatoid arthritis, lupus)',
        'Inflammatory diseases (Crohn\'s disease, ulcerative colitis)',
        'Infections (toxoplasmosis, herpes, tuberculosis)',
        'Eye injury or surgery',
        'Cancer (rarely)',
        'Unknown causes (idiopathic) in many cases'
      ],
      prevention: [
        'Manage underlying autoimmune conditions',
        'Treat infections promptly',
        'Protect eyes from injury',
        'Get regular eye examinations',
        'Inform your doctor of family history of uveitis',
        'Follow prescribed treatment plans for related conditions'
      ],
      treatment: 'Treatment aims to reduce inflammation and prevent complications. Options include corticosteroid eye drops, oral medications, or injections. Immunosuppressive drugs may be needed for chronic cases. Treatment of underlying conditions is also essential.',
      whenToSeekHelp: 'Seek immediate medical attention if you experience sudden eye pain, redness, vision changes, or increased light sensitivity. Uveitis requires urgent evaluation and treatment to prevent vision loss.'
    }
  ];

  if (selectedCondition) {
    const condition = conditions.find(c => c.name === selectedCondition);
    if (!condition) return null;

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedCondition(null)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-white">{condition.name}</h2>
              <p className="text-teal-100">Detailed Information</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
          {/* Description */}
          <Card className="p-5 bg-white">
            <h3 className="text-slate-900 mb-3">What is {condition.name}?</h3>
            <p className="text-slate-700 leading-relaxed">{condition.description}</p>
          </Card>

          {/* Symptoms */}
          <Card className="p-5 bg-blue-50 border-2 border-blue-200">
            <h3 className="text-slate-900 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Common Symptoms
            </h3>
            <ul className="space-y-2">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Causes */}
          <Card className="p-5 bg-amber-50 border-2 border-amber-200">
            <h3 className="text-slate-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              Causes & Risk Factors
            </h3>
            <ul className="space-y-2">
              {condition.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Prevention */}
          <Card className="p-5 bg-emerald-50 border-2 border-emerald-200">
            <h3 className="text-slate-900 mb-3">Prevention Tips</h3>
            <ul className="space-y-2">
              {condition.prevention.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Treatment */}
          <Card className="p-5 bg-white">
            <h3 className="text-slate-900 mb-3">Treatment Options</h3>
            <p className="text-slate-700 leading-relaxed">{condition.treatment}</p>
          </Card>

          {/* When to Seek Help */}
          <Card className="p-5 bg-red-50 border-2 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-red-900 mb-2">When to Seek Medical Help</h3>
                <p className="text-red-800 leading-relaxed">{condition.whenToSeekHelp}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            <h2 className="text-white">Eye Health Guide</h2>
            <p className="text-teal-100">Learn about common eye conditions</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Introduction */}
        <Card className="p-5 bg-white">
          <h3 className="text-slate-900 mb-3">Understanding Eye Conditions</h3>
          <p className="text-slate-700 leading-relaxed">
            Learn about common eye conditions that EyeVLM can help screen for. Tap on any condition below to read detailed information about symptoms, causes, prevention, and treatment.
          </p>
        </Card>

        {/* Conditions List */}
        <div className="space-y-3">
          {conditions.map((condition, idx) => (
            <Card 
              key={idx}
              onClick={() => setSelectedCondition(condition.name)}
              className="p-5 cursor-pointer hover:shadow-lg transition-all bg-white border-2 border-transparent hover:border-teal-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-2">{condition.name}</h3>
                  <p className="text-slate-600 line-clamp-2">
                    {condition.description}
                  </p>
                </div>
                <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180 ml-4 flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>

        {/* General Eye Health Tips */}
        <Card className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
          <h3 className="text-slate-900 mb-3">General Eye Health Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Get regular comprehensive eye exams</span>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Maintain a healthy diet rich in omega-3 fatty acids, vitamins C and E</span>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Wear sunglasses that block UV rays</span>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Take breaks from screen time (20-20-20 rule)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Don't smoke and limit alcohol consumption</span>
            </li>
            <li className="flex items-start gap-2 text-slate-700">
              <span className="text-cyan-600 mt-1">•</span>
              <span>Practice good hygiene, especially with contact lenses</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

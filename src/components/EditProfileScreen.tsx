import { ArrowLeft, User, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

type EditProfileScreenProps = {
  onBack: () => void;
  onSave: (profile: UserProfile) => void;
  currentProfile: UserProfile;
};

export type UserProfile = {
  name: string;
  age: string;
  gender: string;
};

export function EditProfileScreen({ onBack, onSave, currentProfile }: EditProfileScreenProps) {
  const [name, setName] = useState(currentProfile.name);
  const [age, setAge] = useState(currentProfile.age);
  const [gender, setGender] = useState(currentProfile.gender);

  const handleSave = () => {
    onSave({ name, age, gender });
    onBack();
  };

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
            <h2 className="text-white">Edit Profile</h2>
            <p className="text-teal-100">Update your information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
        {/* Profile Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Name Field */}
        <Card className="p-5 bg-white">
          <div className="space-y-3">
            <Label htmlFor="name" className="flex items-center gap-2 text-slate-900">
              <User className="w-4 h-4 text-teal-600" />
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="rounded-xl h-12"
            />
            <p className="text-slate-500">This helps personalize your experience</p>
          </div>
        </Card>

        {/* Age Field */}
        <Card className="p-5 bg-white">
          <div className="space-y-3">
            <Label htmlFor="age" className="flex items-center gap-2 text-slate-900">
              <Calendar className="w-4 h-4 text-blue-600" />
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="rounded-xl h-12"
              min="1"
              max="120"
            />
            <p className="text-slate-500">Age can help provide more relevant health information</p>
          </div>
        </Card>

        {/* Gender Field */}
        <Card className="p-5 bg-white">
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-900">
              <Users className="w-4 h-4 text-purple-600" />
              Gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-slate-500">Optional - helps provide relevant health information</p>
          </div>
        </Card>

        {/* Privacy Note */}
        <Card className="p-4 bg-blue-50 border-2 border-blue-200">
          <p className="text-blue-900 leading-relaxed">
            Your personal information is stored securely and used only to personalize your experience. See our Privacy Policy for details.
          </p>
        </Card>
      </div>

      {/* Bottom Buttons */}
      <div className="px-6 py-4 bg-white border-t border-slate-200 space-y-3">
        <Button
          onClick={handleSave}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          size="lg"
        >
          Save Changes
        </Button>
        
        <button
          onClick={onBack}
          className="w-full text-slate-600 hover:text-slate-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { User, MapPin, Heart, Upload, Check } from 'lucide-react';
import { UserProfile } from '../../../types/user';
import { createUserProfile, uploadProfilePicture } from '../../../services/database';
import { getAuth } from 'firebase/auth';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    firstName: '',
    middleName: '',
    lastName: '',
    age: 18,
    city: '',
    state: '',
    gender: 'male',
    customGender: '',
    bio: '',
    preferences: {
      yogaTypes: [],
      experienceLevel: 'beginner',
      goals: []
    }
  });

  const auth = getAuth();
  const user = auth.currentUser;

  // Pre-made avatars
  const avatars = [
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
  ];

  const yogaTypes = [
    'Hatha Yoga', 'Vinyasa Flow', 'Ashtanga', 'Power Yoga', 
    'Hot Yoga', 'Restorative Yoga', 'Prenatal Yoga', 'Meditation',
    'Yin Yoga', 'Kundalini', 'Bikram', 'Iyengar'
  ];

  const goals = [
    'Improve Flexibility', 'Build Strength', 'Reduce Stress', 
    'Better Sleep', 'Weight Loss', 'Mindfulness', 
    'Pain Relief', 'Spiritual Growth', 'Better Posture'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof UserProfile] as object) || {}),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayToggle = (field: string, value: string) => {
    const [parent, child] = field.split('.');
    const currentArray = (formData[parent as keyof UserProfile] as any)?.[child] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value];
    
    handleInputChange(field, newArray);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target?.result as string);
        setSelectedAvatar(''); // Clear avatar selection
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setProfilePictureFile(null);
    setProfilePicturePreview('');
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let profilePictureUrl = '';
      
      // Upload profile picture if selected
      if (profilePictureFile) {
        profilePictureUrl = await uploadProfilePicture(profilePictureFile, user.uid);
         setProfilePicturePreview(profilePictureUrl); 
      } else if (selectedAvatar) {
        profilePictureUrl = selectedAvatar;
      }

      const profileData: UserProfile = {
        firebaseUid: user.uid,
        role: 'USER', // Default role, can be changed later
        firstName: formData.firstName!,
        middleName: formData.middleName,
        lastName: formData.lastName!,
        age: formData.age!,
        city: formData.city!,
        state: formData.state!,
        gender: formData.gender!,
        customGender: formData.gender === 'other' ? formData.customGender : undefined,
        profilePicture: profilePictureUrl,
        bio: formData.bio,
        preferences: formData.preferences!
      };

      const createdProfile = await createUserProfile(profileData);
      onComplete(createdProfile);
    } catch (error) {
      // console.error('Error creating profile:', error);
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.age && formData.age >= 13;
      case 2:
        return formData.city && formData.state && formData.gender;
      case 3:
        return true; // Profile picture is optional
      case 4:
        return formData.preferences?.experienceLevel;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Balanse
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Let's personalize your yoga journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your middle name (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your age"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Gender */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Location & Identity</h2>
                <p className="text-gray-600">Where are you located?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your state/province"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="space-y-2">
                  {['male', 'female', 'other'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-3 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="capitalize">{gender}</span>
                    </label>
                  ))}
                </div>

                {formData.gender === 'other' && (
                  <input
                    type="text"
                    value={formData.customGender}
                    onChange={(e) => handleInputChange('customGender', e.target.value)}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Please specify"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Profile Picture */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Upload className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Profile Picture</h2>
                <p className="text-gray-600">Choose your profile picture or select an avatar</p>
              </div>

              {/* Upload Section */}
              <div className="text-center">
                <div className="mb-4">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-emerald-200"
                    />
                  ) : selectedAvatar ? (
                    <img
                      src={selectedAvatar}
                      alt="Selected Avatar"
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-emerald-200"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <label className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Avatar Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Or choose an avatar
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`relative rounded-full overflow-hidden border-4 transition-all ${
                        selectedAvatar === avatar
                          ? 'border-emerald-500 scale-110'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Your Preferences</h2>
                <p className="text-gray-600">Help us customize your experience</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Experience Level *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('preferences.experienceLevel', level)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        formData.preferences?.experienceLevel === level
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{level}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {level === 'beginner' && 'New to yoga'}
                        {level === 'intermediate' && 'Some experience'}
                        {level === 'advanced' && 'Regular practice'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Yoga Types You're Interested In
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {yogaTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleArrayToggle('preferences.yogaTypes', type)}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        formData.preferences?.yogaTypes?.includes(type)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Goals
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleArrayToggle('preferences.goals', goal)}
                      className={`px-3 py-2 rounded-full text-sm transition-all ${
                        formData.preferences?.goals?.includes(goal)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Profile...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
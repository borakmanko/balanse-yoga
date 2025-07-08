import React, { useState, useEffect } from 'react';
import { User, MapPin, Heart, Upload, X, Save } from 'lucide-react';
import { UserProfile } from '../../../types/user';
import { updateUserProfile, uploadProfilePicture } from '../../../services/database';
import { getAuth } from 'firebase/auth';
import { getUserProfile } from '../../../services/database'; // Import this

interface ProfileEditProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdate: (profile: UserProfile) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onClose, onUpdate }) => {
  
  const [loading, setLoading] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');
  
  const [formData, setFormData] = useState<UserProfile>(profile);

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
        setSelectedAvatar('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setProfilePictureFile(null);
    setProfilePicturePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return;

  setLoading(true);
  try {
    let profilePictureUrl = formData.profilePicture;
    if (profilePictureFile) {
      profilePictureUrl = await uploadProfilePicture(profilePictureFile, user.uid);
    } else if (selectedAvatar && selectedAvatar !== formData.profilePicture) {
      profilePictureUrl = selectedAvatar;
    }

    const updatedData = {
      ...formData,
      profilePicture: profilePictureUrl
    };

    await updateUserProfile(user.uid, updatedData);

    // Fetch the latest profile from backend
    const refreshedProfile = await getUserProfile(user.uid);
    if (refreshedProfile) {
      onUpdate(refreshedProfile); // Use the fresh data from backend
    } else {
      alert('Failed to refresh profile after update.');
    }
    onClose();
  } catch (error) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <p className="text-gray-600 mt-1">Update your information and preferences</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Profile Picture Section */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
              
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
                ) : formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Current Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-emerald-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              <label className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors text-sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>

              {/* Avatar Selection */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Or choose an avatar</h4>
                <div className="flex justify-center space-x-2 flex-wrap gap-2">
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`relative rounded-full overflow-hidden border-2 transition-all ${
                        selectedAvatar === avatar
                          ? 'border-emerald-500 scale-110'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <img
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className="w-12 h-12 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName || ''}
                    onChange={(e) => handleInputChange('middleName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="flex space-x-4">
                  {['male', 'female', 'other'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="capitalize">{gender}</span>
                    </label>
                  ))}
                </div>

                {formData.gender === 'other' && (
                  <input
                    type="text"
                    value={formData.customGender || ''}
                    onChange={(e) => handleInputChange('customGender', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Please specify"
                  />
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Experience Level
                  </label>
                  <div className="flex space-x-4">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleInputChange('preferences.experienceLevel', level)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          formData.preferences?.experienceLevel === level
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <span className="capitalize">{level}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Yoga Types You're Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {yogaTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleArrayToggle('preferences.yogaTypes', type)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
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
                  <div className="flex flex-wrap gap-2">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => handleArrayToggle('preferences.goals', goal)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
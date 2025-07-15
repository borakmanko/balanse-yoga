export interface UserProfile {
  id?: string;
  firebaseUid: string;
  role: 'USER' | 'ADMIN';
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
  gender: 'male' | 'female' | 'other';
  customGender?: string;
  profilePicture?: string;
  avatar?: string;
  preferences: {
    yogaTypes: string[];
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    goals: string[];
  };
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingEvent {
  id?: string;
  userId: string;
  classId: string;
  instructorId: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: 'booked' | 'cancelled' | 'completed';
  createdAt?: Date;
}

export interface YogaClass {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number;
  level: string;
  instructorId: string;
  maxCapacity: number;
  price: number;
}
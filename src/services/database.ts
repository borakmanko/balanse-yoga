import axios from 'axios';
import { UserProfile, BookingEvent, YogaClass } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// User Profile Services
export const createUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, profile);
    return response.data;
  } catch (error) {
    // console.error('Error creating user profile:', error);
     if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const getUserProfile = async (firebaseUid: string): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${firebaseUid}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    // console.error('Error fetching user profile:', error);
      if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const updateUserProfile = async (firebaseUid: string, profile: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${firebaseUid}`, profile);
    return response.data;
  } catch (error) {
    // console.error('Error updating user profile:', error);
      if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

// Booking Services
export const createBooking = async (booking: BookingEvent): Promise<BookingEvent> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, booking);
    return response.data;
  } catch (error) {
    // console.error('Error creating booking:', error);
     if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const getUserBookings = async (userId: string): Promise<BookingEvent[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching user bookings:', error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const getAvailableClasses = async (date: string): Promise<YogaClass[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes/available?date=${date}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching available classes:', error);
     if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePicture = async (file: File, firebaseUid: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('firebaseUid', firebaseUid);
    
   const response = await axios.post(
  `${API_BASE_URL}/upload/profile-picture?firebaseUid=${firebaseUid}`,
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);
    
    return response.data.imageUrl;
  } catch (error) {
    // console.error('Error uploading profile picture:', error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    throw error;
  }
};
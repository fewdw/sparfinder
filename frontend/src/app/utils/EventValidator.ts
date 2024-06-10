// src/utils/Validator.ts

// Validate event name
export const validateName = (name: string): boolean => {
    const regex = /^.{1,100}$/;
    return regex.test(name);
  };
  
  // Validate description
  export const validateDescription = (description: string): boolean => {
    return description.length >= 5 && description.length <= 500;
  };
  
  // Validate date
  export const validateDate = (date: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) {
      return false;
    }
  
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset hours to compare only dates, not times
  
    return inputDate > today;
  };
  
  // Validate time
  export const validateTime = (time: string): boolean => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  };
  
  // Validate event duration
  export const validateDuration = (length_time: number): boolean => {
    return length_time >= 1 && length_time <= 5;
  };
  
  // Validate location
  export const validateLocation = (location: string): boolean => {
    return location.length >= 5 && location.length <= 500;
  };
  
  // Validate maximum participants
  export const validateMaxParticipants = (max_participants: number): boolean => {
    return max_participants >= 2 && max_participants <= 100;
  };
  
  // Exported functions from Validator.ts to be used in the form component
  
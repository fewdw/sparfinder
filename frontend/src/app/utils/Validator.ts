// src/utils/Validator.ts

// Validate username
export const validateUsername = (username: string): boolean => {
  const regex = /^[a-z0-9_.]{5,15}$/;
  return regex.test(username);
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate date with specific age range for birthdate
export const validateDate = (date: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    return false;
  }
  
  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
    return false;
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const minAgeDate = new Date(currentDate.setFullYear(currentYear - 13));
  const maxAgeDate = new Date(currentDate.setFullYear(currentYear - 65));
  
  if (inputDate > minAgeDate || inputDate < maxAgeDate) {
    return false;
  }
  
  return true;
};

// Validate password
export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const maxLength = 30;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /[0-9]/;
  const hasNoSpaces = /^\S+$/;

  return (
    password.length >= minLength &&
    password.length <= maxLength &&
    hasSpecialChar.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasDigit.test(password) &&
    hasNoSpaces.test(password)
  );
};

// Validate role type
export const validateRoleType = (role: string): boolean => {
  return role === 'boxer' || role === 'coach';
};

// Validate first name and last name
export const validateName = (name: string): boolean => {
  const regex = /^[A-Za-z\s]{3,30}$/;
  return regex.test(name);
};

// Validate file size and format
export const validateFile = (file: File): boolean => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validFormats = ["image/jpeg", "image/png", "image/gif"];

  return file.size <= maxSize && validFormats.includes(file.type);
};

// Validate select field (Country, Level, Stance, Gender)
export const validateSelect = (value: string, validValues: string[]): boolean => {
  return validValues.includes(value);
};

// Validate number of fights
export const validateNumOfFights = (numOfFights: string): boolean => {
  const validRanges = ["0-5", "5-15", "15-30", "30-60", "60-100", "100+"];
  return validateSelect(numOfFights, validRanges);
};

// Validate weight as a positive number
export const validateWeight = (weight: string): boolean => {
  return /^\d+$/.test(weight) && parseInt(weight) > 0;
};

// General number validation for weights and other numeric inputs
export const validateNumber = (number: string): boolean => {
  return /^\d+$/.test(number) && parseInt(number) > 0;
};

// Validate gym name
export const validateGymName = (name: string): boolean => {
  const regex = /^[A-Za-z0-9\s]{5,50}$/;
  return regex.test(name);
};

// Validate gym address
export const validateGymAddress = (address: string): boolean => {
  const regex = /^[A-Za-z0-9\s]{10,500}$/;
  return regex.test(address);
};

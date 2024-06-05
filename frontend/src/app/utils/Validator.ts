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

// Validate birthdate
export const validateBirthdate = (birthdate: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(birthdate)) {
    return false;
  }
  
  const birthDate = new Date(birthdate);
  if (isNaN(birthDate.getTime())) {
    return false;
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const minAgeDate = new Date(currentDate.setFullYear(currentYear - 13));
  const maxAgeDate = new Date(currentDate.setFullYear(currentYear - 65));
  
  if (birthDate > minAgeDate) {
    return false; // User is younger than 13
  }
  
  if (birthDate < maxAgeDate) {
    return false; // User is older than 65
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
  const regex = /^[A-Za-z\s]{1,30}$/;
  return regex.test(name);
};

// Validate file size and format
export const validateFile = (file: File): boolean => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validFormats = ["image/jpeg", "image/png", "image/gif"];

  return file.size <= maxSize && validFormats.includes(file.type);
};

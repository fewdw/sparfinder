// src/tests/Validator.test.ts
import { validateUsername, validateEmail, validateBirthdate, validatePassword, validateRoleType, validateName, validateFile } from '../utils/Validator';

describe('Validator Tests', () => {
  describe('validateUsername', () => {
    test.each([
      ['validuser', true],
      ['user_123', true],
      ['user.name', true],
      ['invalid user', false],
      ['user!', false],
      ['us', false],
      ['thisusernameiswaytoolong', false],
      ['VALIDUSER', false],
    ])('validateUsername(%s) should return %s', (username, expected) => {
      expect(validateUsername(username)).toBe(expected);
    });
  });

  describe('validateEmail', () => {
    test.each([
      ['test@example.com', true],
      ['user.name@example.com', true],
      ['user@sub.example.com', true],
      ['invalid-email', false],
      ['user@.com', false],
      ['user@com', false],
      ['user@com.', false],
    ])('validateEmail(%s) should return %s', (email, expected) => {
      expect(validateEmail(email)).toBe(expected);
    });
  });

  describe('validateBirthdate', () => {
    test.each([
      ['2000-01-01', true],
      ['2010-01-01', true],
      ['1955-01-01', false], // Older than 65
      ['2015-01-01', false], // Younger than 13
      ['invalid-date', false],
      ['2020-13-01', false],
      ['2000-01-35', false],
    ])('validateBirthdate(%s) should return %s', (birthdate, expected) => {
      expect(validateBirthdate(birthdate)).toBe(expected);
    });
  });

  describe('validatePassword', () => {
    test.each([
      ['Password1!', true],
      ['Pass123!', true],
      ['pass123!', false], // No uppercase
      ['PASSWORD123!', false], // No lowercase
      ['Password!', false], // No digit
      ['Password123', false], // No special character
      [' Pass123!', false], // Space at the beginning
      ['Pass123! ', false], // Space at the end
      ['Short1!', false], // Too short
      ['ThisIsAVeryLongPasswordThatExceedsTheMaxLength123!', false], // Too long
    ])('validatePassword(%s) should return %s', (password, expected) => {
      expect(validatePassword(password)).toBe(expected);
    });
  });

  describe('validateRoleType', () => {
    test.each([
      ['boxer', true],
      ['coach', true],
      ['trainer', false],
      ['user', false],
      ['admin', false],
    ])('validateRoleType(%s) should return %s', (role, expected) => {
      expect(validateRoleType(role)).toBe(expected);
    });
  });

  describe('validateName', () => {
    test.each([
      ['John', true],
      ['AnnaMarie', true],
      ['OConnor', true],
      ['Max', true],
      ['A', true], // Minimum length
      ['ThisNameIsWayTooLongToBeValidThisNameIsWayTooLongToBeValid', false], // Exceeds 30 characters
      ['John123', false], // Numbers not allowed
    ])('validateName(%s) should return %s', (name, expected) => {
      expect(validateName(name)).toBe(expected);
    });
  });

  describe('validateFile', () => {
    const generateFile = (type: string, size: number) => {
      const blob = new Blob(["a".repeat(size)], { type });
      const file = new File([blob], "testfile", { type });
      return file;
    };

    test.each([
      [generateFile("image/jpeg", 4 * 1024 * 1024), true], // Valid JPEG file under 5MB
      [generateFile("image/png", 5 * 1024 * 1024), true], // Valid PNG file exactly 5MB
      [generateFile("image/gif", 6 * 1024 * 1024), false], // Valid GIF file over 5MB
      [generateFile("text/plain", 4 * 1024 * 1024), false], // Invalid text file under 5MB
    ])('validateFile(%o) should return %s', (file, expected) => {
      expect(validateFile(file)).toBe(expected);
    });
  });
});

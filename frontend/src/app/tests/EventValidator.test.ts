import {
    validateName,
    validateDescription,
    validateDate,
    validateTime,
    validateDuration,
    validateLocation,
    validateMaxParticipants
  } from '../utils/EventValidator';
  
  describe('Validator Functions', () => {
    // Test validateName
    describe('validateName', () => {
      test.each([
        ['Valid Event Name', true],
        ['', false],
        ['a'.repeat(101), false] // longer than 100 characters
      ])('validateName(%s) should return %s', (name, expected) => {
        expect(validateName(name)).toBe(expected);
      });
    });
  
    // Test validateDescription
    describe('validateDescription', () => {
      test.each([
        ['Valid description here.', true],
        ['Short', true],
        ['a', false],
      ])('validateDescription(%s) should return %s', (description, expected) => {
        expect(validateDescription(description)).toBe(expected);
      });
    });
  
    // Test validateDate
    describe('validateDate', () => {
      test.each([
        ['2030-12-31', true],
        ['2023-06-10', false], // assuming today is past this date
        ['2024-02-30', false], // invalid date
        ['abc', false]
      ])('validateDate(%s) should return %s', (date, expected) => {
        expect(validateDate(date)).toBe(expected);
      });
    });
  
    // Test validateTime
    describe('validateTime', () => {
      test.each([
        ['23:59', true],
        ['00:00', true],
        ['24:00', false], // invalid time
        ['12:60', false], // invalid minutes
        ['test', false]
      ])('validateTime(%s) should return %s', (time, expected) => {
        expect(validateTime(time)).toBe(expected);
      });
    });
  
    // Test validateDuration
    describe('validateDuration', () => {
      test.each([
        [1, true],
        [5, true],
        [0, false], // less than 1
        [6, false] // more than 5
      ])('validateDuration(%s) should return %s', (duration, expected) => {
        expect(validateDuration(duration)).toBe(expected);
      });
    });
  
    // Test validateLocation
    describe('validateLocation', () => {
      test.each([
        ['12345 Main St', true],
        ['Main', false], // too short
        ['a'.repeat(501), false] // longer than 500 characters
      ])('validateLocation(%s) should return %s', (location, expected) => {
        expect(validateLocation(location)).toBe(expected);
      });
    });
  
    // Test validateMaxParticipants
    describe('validateMaxParticipants', () => {
      test.each([
        [2, true],
        [100, true],
        [1, false], // less than 2
        [101, false] // more than 100
      ])('validateMaxParticipants(%s) should return %s', (maxParticipants, expected) => {
        expect(validateMaxParticipants(maxParticipants)).toBe(expected);
      });
    });
  });
  
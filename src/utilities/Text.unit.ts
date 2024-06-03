import { isUpperCase, toTitleCase } from './Text';

describe('Text Utilities', () => {
  describe('isUpperCase', () => {
    it('should return true for uppercase characters', () => {
      expect(isUpperCase('A')).toBeTruthy();
      expect(isUpperCase('Z')).toBeTruthy();
    });

    it('should return false for lowercase characters', () => {
      expect(isUpperCase('a')).toBeFalsy();
      expect(isUpperCase('z')).toBeFalsy();
    });

    it('should return false for non-alphabetic characters', () => {
      expect(isUpperCase('1')).toBeFalsy();
      expect(isUpperCase('!')).toBeFalsy();
    });

    it('should return true for uppercase strings', () => {
      expect(isUpperCase('HELLO')).toBeTruthy();
    });

    it('should return false for mixed case strings', () => {
      expect(isUpperCase('Hello')).toBeFalsy();
    });

    it('should return false for non-alphabetic strings', () => {
      expect(isUpperCase('123')).toBeFalsy();
    });
  });

  describe('toTitleCase', () => {
    it('should capitalise the first letter of each word', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
    });

    it('should have no effect on non-alphabet word tokens', () => {
      expect(toTitleCase('hello world 123')).toBe('Hello World 123');
      expect(toTitleCase('hello world!')).toBe('Hello World!');
      expect(toTitleCase('hello world! 123')).toBe('Hello World! 123');
      expect(toTitleCase('!123! %456%')).toBe('!123! %456%');
    });
  });
});

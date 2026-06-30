import getInitials from '@/utils/getInitials';

describe('getInitials utility', () => {
  it('should return initials for two word name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('should return first two letters for single word', () => {
    expect(getInitials('John')).toBe('JO');
  });

  it('should return empty string for undefined or empty name', () => {
    expect(getInitials(undefined)).toBe('');
    expect(getInitials('')).toBe('');
  });
});

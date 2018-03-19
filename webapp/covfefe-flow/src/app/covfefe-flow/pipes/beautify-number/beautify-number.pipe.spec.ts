import { BeautifyNumberPipe } from './beautify-number.pipe';

describe('BeautifyNumberPipe', () => {
  let pipe: BeautifyNumberPipe;

  beforeEach(() => {
    pipe = new BeautifyNumberPipe();
  });

  it('should handle values < 1K', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(1)).toBe('1');
    expect(pipe.transform(456)).toBe('456');
    expect(pipe.transform(999)).toBe('999');
  });

  it('should handle values in [1K, 1M)', () => {
    expect(pipe.transform(1000)).toBe('1K');
    expect(pipe.transform(2745)).toBe('2.7K');
    expect(pipe.transform(13853)).toBe('13K');
    expect(pipe.transform(999999)).toBe('999K');
  });

  it('should handle values in [1M, 1B)', () => {
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(6245478)).toBe('6.2M');
    expect(pipe.transform(84564920)).toBe('84M');
    expect(pipe.transform(999999999)).toBe('999M');
  });

  it('should handle values in [1B, 1T)', () => {
    expect(pipe.transform(1000000000)).toBe('1B');
    expect(pipe.transform(5944546708)).toBe('5.9B');
    expect(pipe.transform(79546741920)).toBe('79B');
    expect(pipe.transform(999999999999)).toBe('999B');
  });

  it('should handle values >= 1T', () => {
    expect(pipe.transform(1000000000000)).toBe('1000B');
    expect(pipe.transform(999999999999999)).toBe('999999B');
  });

  it('should handle negative values', () => {
    expect(pipe.transform(-1)).toBe('-1');
    expect(pipe.transform(-729)).toBe('-729');
    expect(pipe.transform(-136389)).toBe('-136K');
    expect(pipe.transform(-8295372)).toBe('-8.2M');
  });
});

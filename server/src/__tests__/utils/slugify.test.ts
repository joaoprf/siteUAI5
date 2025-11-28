import { describe, it, expect } from '@jest/globals';
import { slugify, generateUniqueSlug } from '../../utils/slugify.js';

describe('slugify', () => {
  it('should convert text to slug format', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello! World@2024')).toBe('hello-world2024');
  });

  it('should handle Portuguese characters', () => {
    expect(slugify('ÁçãoÉêíÓôú')).toBe('acaoeeioou');
  });

  it('should replace spaces with hyphens', () => {
    expect(slugify('Multiple   Spaces    Here')).toBe('multiple-spaces-here');
  });

  it('should remove leading/trailing hyphens', () => {
    expect(slugify('  -  Leading and Trailing  -  ')).toBe('leading-and-trailing');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('should convert to lowercase', () => {
    expect(slugify('UPPERCASE TEXT')).toBe('uppercase-text');
  });
});

describe('generateUniqueSlug', () => {
  it('should return base slug if not exists', async () => {
    const checkExists = async (slug: string) => false;
    const result = await generateUniqueSlug('test-post', checkExists);
    expect(result).toBe('test-post');
  });

  it('should append number if slug exists', async () => {
    let callCount = 0;
    const checkExists = async (slug: string) => {
      callCount++;
      return callCount === 1; // First call returns true (exists)
    };
    
    const result = await generateUniqueSlug('test-post', checkExists);
    expect(result).toBe('test-post-2');
  });

  it('should increment until unique slug is found', async () => {
    let callCount = 0;
    const checkExists = async (slug: string) => {
      callCount++;
      return callCount <= 3; // First 3 calls return true
    };
    
    const result = await generateUniqueSlug('test-post', checkExists);
    expect(result).toBe('test-post-4');
  });
});

import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('mock', () => {
  describe('mock basic', () => {
    it("mock('') work", () => {
      const randomString = faker.mock('')
      expect(randomString).toBeTypeOf('string');
    });

    it("mock('@string') work", () => {
      const randomString = faker.mock('@string')
      expect(randomString).toBeTypeOf('string');
    });

    it("mock('@number') work", () => {
      const randomNum = faker.mock('@number')
      expect(randomNum).toBeTypeOf('number');
      expect(randomNum).toSatisfy(Number.isInteger);
    });
  })
})
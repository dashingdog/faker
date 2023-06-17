import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('mock', () => {
  describe('mock basic', () => {
    it("mock('') work", () => {
      const randomString = faker.mock('')
      expect(randomString).toBeTypeOf('string');
    });

    it("mock('@boolean') work", () => {
      const randomBoolean = faker.mock('@boolean')
      expect(randomBoolean).toBeTypeOf('boolean');
    });

    it("mock('@string') work", () => {
      const randomString = faker.mock('@string')
      expect(randomString).toBeTypeOf('string');
    });

    it("mock('@string(3,5)') work", () => {
      const randomString = faker.mock('@string(3,5)')
      expect(randomString).toBeTypeOf('string');
      expect(randomString.length).toBeGreaterThanOrEqual(3);
      expect(randomString.length).toBeLessThanOrEqual(5);
    });

    it("mock('@number') work", () => {
      const randomNum = faker.mock('@number')
      expect(randomNum).toBeTypeOf('number');
      expect(randomNum).toSatisfy(Number.isInteger);
    });

    it("mock('@number(3,5)') work", () => {
      const randomNum = faker.mock('@number(3,5)')
      expect(randomNum).toBeGreaterThanOrEqual(3);
      expect(randomNum).toBeLessThanOrEqual(5);
    });
  })

  describe('mock object',()=>{
    it("mock single object params work", () => {
      const result = faker.mock({
        'string|1-10':'***',
        'number|1-100':20
      })
      expect(result).toBeTypeOf('object');
      expect(result.string).toBeTypeOf('string')
      expect(result.number).toBeTypeOf('number')
    });

    // it("mock nested object params work", () => {
    //   const randomString = faker.mock('')
    //   expect(randomString).toBeTypeOf('string');
    // });

    describe('mock array',()=>{
      it("mock single object params work", () => {
        const result = faker.mock({
          "array|1-10": [
            "Mock.js"
          ]
        })
        expect(Array.isArray(result.array)).toBe(true);
        expect(result.array[0]).toBe('Mock.js')
        expect(result.array.length).toBeGreaterThanOrEqual(1)
        expect(result.array.length).toBeLessThanOrEqual(10);
      });
  
    })
  })
})
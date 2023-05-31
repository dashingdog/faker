import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('number', () => {
    describe('int', () => {
        it('should return an integer between 0 and Number.MAX_SAFE_INTEGER (inclusive) by default', () => {
          const actual = faker.number.int();
  
          expect(actual).toBeTypeOf('number');
          expect(actual).toSatisfy(Number.isInteger);
  
          expect(actual).toBeGreaterThanOrEqual(0);
          expect(actual).lessThanOrEqual(Number.MAX_SAFE_INTEGER);
        });
  
        it('should return a random number given a maximum value as Number', () => {
          const actual = faker.number.int(10);
  
          expect(actual).toBeTypeOf('number');
          expect(actual).toSatisfy(Number.isInteger);
  
          expect(actual).toBeGreaterThanOrEqual(0);
          expect(actual).toBeLessThanOrEqual(10);
        });
  
        it('should return a random number given a maximum value as Object', () => {
          const actual = faker.number.int({ max: 10 });
  
          expect(actual).toBeTypeOf('number');
          expect(actual).toSatisfy(Number.isInteger);
  
          expect(actual).toBeGreaterThanOrEqual(0);
          expect(actual).toBeLessThanOrEqual(10);
        });
  
        it('should return a random number given a maximum value of 0', () => {
          const actual = faker.number.int({ max: 0 });
  
          expect(actual).toBe(0);
        });
  
        it('should return a random number given a negative number minimum and maximum value of 0', () => {
          const actual = faker.number.int({ min: -100, max: 0 });
  
          expect(actual).toBeTypeOf('number');
          expect(actual).toSatisfy(Number.isInteger);
  
          expect(actual).toBeGreaterThanOrEqual(-100);
          expect(actual).toBeLessThanOrEqual(0);
        });
  
        it('should return a random number between a range', () => {
          for (let i = 0; i < 100; i++) {
            const actual = faker.number.int({ min: 22, max: 33 });
  
            expect(actual).toBeTypeOf('number');
            expect(actual).toSatisfy(Number.isInteger);
  
            expect(actual).toBeGreaterThanOrEqual(22);
            expect(actual).toBeLessThanOrEqual(33);
          }
        });
  
        it('should return inclusive negative max value', () => {
          let foundNegative4 = false;
          let foundNegative5 = false;
  
          for (let iter = 0; iter < 1000; iter++) {
            const actual = faker.number.int({ min: -5, max: -4 });
  
            if (actual === -4) {
              foundNegative4 = true;
            } else if (actual === -5) {
              foundNegative5 = true;
            }
  
            expect(actual).toBeTypeOf('number');
            expect(actual).toSatisfy(Number.isInteger);
  
            expect(actual).toBeGreaterThanOrEqual(-5);
            expect(actual).toBeLessThanOrEqual(-4);
  
            if (foundNegative4 && foundNegative5) {
              break;
            }
          }
  
          expect(foundNegative4).toBeTruthy();
          expect(foundNegative5).toBeTruthy();
        });
  
        it('should not mutate the input object', () => {
          const input: {
            min?: number;
            max?: number;
            precision?: number;
            otherProperty: string;
          } = Object.freeze({
            min: 1,
            precision: 1,
            otherProperty: 'hello darkness my old friend',
          });
  
          expect(() => faker.number.int(input)).not.toThrow();
        });
  
        // it('should throw when min > max', () => {
        //   const min = 10;
        //   const max = 9;
  
        //   expect(() => {
        //     faker.number.int({ min, max });
        //   }).toThrow(
        //     new FakerError(`Max ${max} should be greater than min ${min}.`)
        //   );
        // });
  
        // it('should throw when there is no integer between min and max', () => {
        //   expect(() => {
        //     faker.number.int({ min: 2.1, max: 2.9 });
        //   }).toThrow(
        //     new FakerError(`No integer value between 2.1 and 2.9 found.`)
        //   );
        // });
      });
})
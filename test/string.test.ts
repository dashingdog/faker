import { describe, expect, it } from 'vitest';
import { faker,FakerError } from '../src';

describe('string', () => {
    describe('alpha', () => {
        it('should return single letter when no length provided', () => {
          const actual = faker.string.alpha();

          expect(actual).toHaveLength(1);
        });

        it('should return any letters when no option is provided', () => {
          const actual = faker.string.alpha();

          expect(actual).toMatch(/^[a-zA-Z]$/);
        });

        it.each([
          ['upper', /^[A-Z]{250}$/],
          ['lower', /^[a-z]{250}$/],
          ['mixed', /^[a-zA-Z]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.string.alpha({ length: 250, casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate 5 random letters', () => {
          const actual = faker.string.alpha(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.string.alpha(length);

            expect(actual).toBe('');
          }
        );

        it('should return a random amount of characters', () => {
          const actual = faker.string.alpha({ length: { min: 10, max: 20 } });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

        it('should be able to ban some characters', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'p'],
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able to ban some characters via string', () => {
          const actual = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: 'ap',
          });

          expect(actual).toHaveLength(5);
          expect(actual).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should be able handle mistake in excluded characters array', () => {
          const alphaText = faker.string.alpha({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'a', 'p'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being excluded (string)', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz';
          expect(() =>
            faker.string.alpha({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should throw if all possible characters being excluded (string[])', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz'.split('');
          expect(() =>
            faker.string.alpha({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should not mutate the input object', () => {
          const input: {
            length: number;
            casing: 'mixed';
            exclude: string[];
          } = Object.freeze({
            length: 5,
            casing: 'mixed',
            exclude: ['a', '%'],
          });

          expect(() => faker.string.alpha(input)).not.toThrow();
          expect(input.exclude).toEqual(['a', '%']);
        });
      });

      describe('alphaNumeric', () => {
        it('should generate single character when no additional argument was provided', () => {
          const actual = faker.string.alphanumeric();

          expect(actual).toHaveLength(1);
        });

        it.each([
          ['upper', /^[A-Z0-9]{250}$/],
          ['lower', /^[a-z0-9]{250}$/],
          ['mixed', /^[a-zA-Z0-9]{250}$/],
        ] as const)('should return %s-case', (casing, pattern) => {
          const actual = faker.string.alphanumeric({ length: 250, casing });
          expect(actual).toMatch(pattern);
        });

        it('should generate 5 random characters', () => {
          const actual = faker.string.alphanumeric(5);

          expect(actual).toHaveLength(5);
        });

        it.each([0, -1, -100])(
          'should return empty string when length is <= 0',
          (length) => {
            const actual = faker.string.alphanumeric(length);

            expect(actual).toBe('');
          }
        );

        it('should return a random amount of characters', () => {
          const actual = faker.string.alphanumeric({
            length: { min: 10, max: 20 },
          });

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          expect(actual.length).toBeGreaterThanOrEqual(10);
          expect(actual.length).toBeLessThanOrEqual(20);
        });

        it('should be able to ban all alphabetic characters', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz'.split('');
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all alphabetic characters via string', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all numeric characters', () => {
          const exclude = '0123456789'.split('');
          const alphaText = faker.string.alphanumeric({
            length: 5,
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to ban all numeric characters via string', () => {
          const exclude = '0123456789';
          const alphaText = faker.string.alphanumeric({
            length: 5,
            exclude,
          });

          expect(alphaText).toHaveLength(5);
          for (const excludedChar of exclude) {
            expect(alphaText).not.includes(excludedChar);
          }
        });

        it('should be able to handle mistake in excluded characters array', () => {
          const alphaText = faker.string.alphanumeric({
            length: 5,
            casing: 'lower',
            exclude: ['a', 'p', 'a'],
          });

          expect(alphaText).toHaveLength(5);
          expect(alphaText).toMatch(/^[0-9b-oq-z]{5}$/);
        });

        it('should throw if all possible characters being excluded (string)', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz0123456789';
          expect(() =>
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should throw if all possible characters being excluded (string[])', () => {
          const exclude = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
          expect(() =>
            faker.string.alphanumeric({
              length: 5,
              casing: 'lower',
              exclude,
            })
          ).toThrow(
            new FakerError(
              'Unable to generate string: No characters to select from.'
            )
          );
        });

        it('should not mutate the input object', () => {
          const input: {
            length: number;
            exclude: string[];
          } = Object.freeze({
            length: 5,
            exclude: ['a', '0', '%'],
          });

          expect(() => faker.string.alphanumeric(input)).not.toThrow();
          expect(input.exclude).toEqual(['a', '0', '%']);
        });
      });
})
import type { Faker } from '../..';
import type { LiteralUnion } from '../../utils/type';
import { FakerError } from '../../errors/faker-error';

const UPPER_CHARS: ReadonlyArray<string> = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
  ''
);
const LOWER_CHARS: ReadonlyArray<string> = 'abcdefghijklmnopqrstuvwxyz'.split(
  ''
);
const DIGIT_CHARS: ReadonlyArray<string> = '0123456789'.split('');

export type Casing = 'upper' | 'lower' | 'mixed';

export type LowerAlphaChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

export type UpperAlphaChar =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type NumericChar =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type AlphaChar = LowerAlphaChar | UpperAlphaChar;
export type AlphaNumericChar = AlphaChar | NumericChar;


export class StringModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      StringModule.prototype
    ) as Array<keyof StringModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  // 根据字符串集合和长度生成字符串
  fromCharacters(
    characters: string | ReadonlyArray<string>,
    length:
      | number
      | {
          /**
           * The minimum length of the string to generate.
           */
          min: number;
          /**
           * The maximum length of the string to generate.
           */
          max: number;
        } = 1
  ): string {
    length = this.faker.helpers.rangeToNumber(length);
    if (length <= 0) {
      return '';
    }

    if (typeof characters === 'string') {
      characters = characters.split('');
    }

    if (characters.length === 0) {
      throw new FakerError(
        'Unable to generate string: No characters to select from.'
      );
    }

    return this.faker.helpers
      .multiple(() => this.faker.helpers.arrayElement(characters as string[]), {
        count: length,
      })
      .join('');
  }

  alpha(
    options:
    | number
    | {
      length?:
      | number
      | {
          min: number;
          max: number;
        };
        
      casing?: Casing;
      exclude?: ReadonlyArray<LiteralUnion<AlphaChar>> | string;
    } = {}
  ):string{
    if (typeof options === 'number') {
      options = {
        length: options,
      };
    }

    const length = this.faker.helpers.rangeToNumber(options.length ?? 1);
    if (length <= 0) {
      return '';
    }

    const { casing = 'mixed' } = options;
    let { exclude = [] } = options;

    if (typeof exclude === 'string') {
      exclude = exclude.split('');
    }

    let charsArray: string[];
    switch (casing) {
      case 'upper':
        charsArray = [...UPPER_CHARS];
        break;
      case 'lower':
        charsArray = [...LOWER_CHARS];
        break;
      case 'mixed':
      default:
        charsArray = [...LOWER_CHARS, ...UPPER_CHARS];
        break;
    }

    charsArray = charsArray.filter((elem) => !exclude.includes(elem));

    return this.fromCharacters(charsArray, length);
  }

  alphanumeric(
    options:
      | number
      | {
          /**
           * The number or range of characters and digits to generate.
           *
           * @default 1
           */
          length?:
            | number
            | {
                /**
                 * The minimum number of characters and digits to generate.
                 */
                min: number;
                /**
                 * The maximum number of characters and digits to generate.
                 */
                max: number;
              };
          /**
           * The casing of the characters.
           *
           * @default 'mixed'
           */
          casing?: Casing;
          /**
           * An array of characters and digits which should be excluded in the generated string.
           *
           * @default []
           */
          exclude?: ReadonlyArray<LiteralUnion<AlphaNumericChar>> | string;
        } = {}
  ): string {
    if (typeof options === 'number') {
      options = {
        length: options,
      };
    }

    const length = this.faker.helpers.rangeToNumber(options.length ?? 1);
    if (length <= 0) {
      return '';
    }

    const { casing = 'mixed' } = options;
    let { exclude = [] } = options;

    if (typeof exclude === 'string') {
      exclude = exclude.split('');
    }

    let charsArray = [...DIGIT_CHARS];

    switch (casing) {
      case 'upper':
        charsArray.push(...UPPER_CHARS);
        break;
      case 'lower':
        charsArray.push(...LOWER_CHARS);
        break;
      case 'mixed':
      default:
        charsArray.push(...LOWER_CHARS, ...UPPER_CHARS);
        break;
    }

    charsArray = charsArray.filter((elem) => !exclude.includes(elem));

    return this.fromCharacters(charsArray, length);
  }
}



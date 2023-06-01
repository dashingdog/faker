import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';

export class HelpersModule {
    constructor(private readonly faker: Faker) {
        // Bind `this` so namespaced is working correctly
        for (const name of Object.getOwnPropertyNames(
          HelpersModule.prototype
        ) as Array<keyof HelpersModule | 'constructor'>) {
          if (name === 'constructor' || typeof this[name] !== 'function') {
            continue;
          }
    
          this[name] = this[name].bind(this);
        }
      }

    // 获取随机的number数
    rangeToNumber(
        numberOrRange:
          | number
          | {
              /**
               * The minimum value for the range.
               */
              min: number;
              /**
               * The maximum value for the range.
               */
              max: number;
            }
      ): number {
        if (typeof numberOrRange === 'number') {
          return numberOrRange;
        }
    
        return this.faker.number.int(numberOrRange);
      }

      // 生成一个数组，其中包含给定方法返回的值。
      multiple<TResult>(
        method: () => TResult,
        options: {
          /**
           * The number or range of elements to generate.
           *
           * @default 3
           */
          count?:
            | number
            | {
                /**
                 * The minimum value for the range.
                 */
                min: number;
                /**
                 * The maximum value for the range.
                 */
                max: number;
              };
        } = {}
      ): TResult[] {
        const count = this.rangeToNumber(options.count ?? 3);
        if (count <= 0) {
          return [];
        }
    
        // TODO @ST-DDT 2022-11-21: Add support for unique option
    
        return Array.from({ length: count }, method);
      }

      // 从给定的数组中返回随机元素。
      arrayElement<T>(array: ReadonlyArray<T>): T {
        // TODO @xDivisionByZerox 2023-04-20: Remove in v9
        if (array == null) {
          throw new FakerError(
            'Calling `faker.helpers.arrayElement()` without arguments is no longer supported.'
          );
        }
    
        if (array.length === 0) {
          throw new FakerError('Cannot get value from empty dataset.');
        }
    
        const index =
          array.length > 1 ? this.faker.number.int({ max: array.length - 1 }) : 0;
    
        return array[index];
      }
}

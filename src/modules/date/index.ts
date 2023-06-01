import type { Faker } from '../..';
import {FakerError} from '../../errors/faker-error'

// 根据date参数转换为Date类型，如果转换失败，则返回fallback参数
function toDate(
    date: string | Date | number | undefined,
    fallback: () => Date
  ): Date {
    date = new Date(date);
    if (isNaN(date.valueOf())) {
      date = fallback();
    }
  
    return date;
  }
  
export class DateModule {
    constructor(private readonly faker: Faker) {
        // Bind `this` so namespaced is working correctly
        for (const name of Object.getOwnPropertyNames(
          DateModule.prototype
        ) as Array<keyof DateModule | 'constructor'>) {
          if (name === 'constructor' || typeof this[name] !== 'function') {
            continue;
          }
    
          this[name] = this[name].bind(this);
        }
      }


      
      // 随机生成一个近期日期
      recent(
        options:{ days?: number; refDate?: string | Date | number } = {},
        legacyRefDate?: string | Date | number
      ): Date {

        const { days = 1, refDate = legacyRefDate } = options;
    
        if (days <= 0) {
          throw new FakerError('Days must be greater than 0.');
        }
    
        const date = toDate(refDate, this.faker.defaultRefDate);
        const range = {
          min: 1000,
          max: days * 24 * 3600 * 1000,
        };
    
        let future = date.getTime();
        future -= this.faker.number.int(range); // some time from now to N days ago, in milliseconds
        date.setTime(future);
    
        return date;
      }
}
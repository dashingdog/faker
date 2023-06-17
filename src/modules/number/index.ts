import { type Faker,FakerError } from "../..";
import type {IntOption} from './type'
export class NumberModule {
  
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      NumberModule.prototype
    ) as Array<keyof NumberModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  // 生成随机int类型
    int(options:IntOption = {}){
        if (typeof options === 'number') {
            options = { max: options };
          }
      
          const { min = 0, max = Number.MAX_SAFE_INTEGER } = options;
          const effectiveMin = Math.ceil(min);
          const effectiveMax = Math.floor(max);
          if (effectiveMin === effectiveMax) {
            return effectiveMin;
          }
          if (effectiveMax < effectiveMin) {
            if (max >= min) {
              throw new FakerError(
                `No integer value between ${min} and ${max} found.`
              );
            }
      
            throw new FakerError(`Max ${max} should be greater than min ${min}.`);
          }
          const real = Math.random();
          return Math.floor(real * (effectiveMax + 1 - effectiveMin) + effectiveMin);
    }
}
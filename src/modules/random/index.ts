import type { Faker } from "../..";

export class RandomModule {

    constructor(private readonly faker: Faker) {
        // Bind `this` so namespaced is working correctly
        for (const name of Object.getOwnPropertyNames(
            RandomModule.prototype
        ) as Array<keyof RandomModule | 'constructor'>) {
          if (name === 'constructor' || typeof this[name] !== 'function') {
            continue;
          }
    
          this[name] = this[name].bind(this);
        }
      }

    boolean(){
        return Math.random() < 0.5;
    }

    number(){
        return this.faker.number.int()
    }

    string(){
        return this.faker.string.alpha();
    }
    
}
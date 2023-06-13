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

    number(min?:number,max?:number){
        return this.faker.number.int({
            min,
            max
        })
    }

    string(min=1,max=5){
        return this.faker.string.alpha(
            { length: { min, max }}
            );
    }

    id(){

    }

    phone(){
        
    }
    
}
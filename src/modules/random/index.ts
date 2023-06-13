import type { Faker } from "../..";
function generateRandomDigits(length:number) {
    let digits = '';
    for (let i = 0; i < length; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    return digits;
  }
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
        const areaCodes = [
            '130', '131', '132', '134', '135', '136', '137', '138', '139', // 移动号段
            '147', '150', '151', '152', '153', '155', '156', '157', '158', '159', // 移动号段
            '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', // 虚拟运营商号段
            '180', '181', '182', '183', '184', '185', '186', '187', '188', '189' // 移动号段
            ];
            
            const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
            const phoneNumber = areaCode + generateRandomDigits(8);
            
            return phoneNumber;
    }
    
}
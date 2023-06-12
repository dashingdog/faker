import type { Faker } from "../..";
import type { mockOptions } from './type'
import {getType} from '../../utils/type'
import {RE_PLACEHOLDER} from '../../utils/constant'
export class MockModule {
    [key: string]: any;

    constructor(private readonly faker: Faker) {
        // Bind `this` so namespaced is working correctly
        for (const name of Object.getOwnPropertyNames(
            MockModule.prototype
        ) as Array<keyof MockModule | 'constructor'>) {
          if (name === 'constructor' || typeof this[name] !== 'function') {
            continue;
          }
    
          this[name] = this[name].bind(this);
        }
    }

      mock(template : mockOptions){
        return this.gen(template);
      }

      gen(template:mockOptions,name?:string){
        // TODO: 校验下template合法性
        // 获取类型
        const type = getType(template);
        if(!this.hasOwnProperty(type)&&!(typeof this[type] === 'function')){
            return template
        }
        const context={}
        const data = this[type]({
            type, // 属性值类型
            template, // 属性值模板
            // name, // 属性名
            // rule,
            // context,
            // parsedName: name ? name.replace(constant.RE_KEY, '$1') : name,
          })
          if (!context.root) {
            context.root = data
          }
          return data
      }

      string(options){
        let source = ''
        let match
        let result = ''
        if(options.template.length){
          RE_PLACEHOLDER.exec('')
          while (match = RE_PLACEHOLDER.exec(options.template)) {
            console.log(match)
            const handler = this.faker.random[match[1]]
            const replaced = handler();
            if(replaced)
            result = replaced
          }
        }else{
            // 调用生成随机字符串
            result = this.faker.random.string()
        }
        return result;
      }

      number(){

      }

      object(){

      }

      array(){

      }

      boolean(){

      }
}

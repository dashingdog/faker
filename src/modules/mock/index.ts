import type { Faker } from "../..";
import type { mockOptions,GenerateOptions } from './type'
import {getType} from '../../utils/type'
import {RE_PLACEHOLDER,RE_KEY} from '../../utils/constant'
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

      string(options:GenerateOptions){
        let source = ''
        let match
        let result = ''
        if(options.template.length){
          RE_PLACEHOLDER.exec('')
          match = RE_PLACEHOLDER.exec(options.template)
          console.log(match)
          if(match){
            const fnAll = match[0]
            const fnName = match[1]
            const handler = this.faker.random[fnName]
            const regExp = /\(([^)]*)\)/;
            const matches = regExp.exec(fnAll);
            let parameters = '';
            if (matches) {
              parameters = matches[1];
            }
            try{
              const params = JSON.parse(`[${parameters}]`);
              const replaced = handler(...params);
              if(replaced!==undefined)
              result = replaced
            }catch(error){
              console.log(error)
            }
          }
        }else{
            // 调用生成随机字符串
            result = this.faker.random.string()
          }
          return result;
      }

      number(){

      }

      object(options:GenerateOptions){
        const result = {}

        // 储存所有key
        let keys: string[] = Object.keys(options.template);
        keys.forEach(key=>{
          // 过滤掉|后面的部分 string|1-2 保留string
          let parsedKey = key.replace(RE_KEY, '$1')
          const generatedValue = this.gen(options.template[key],key);
          result[parsedKey] = generatedValue
        })

        return result
      }

      array(){

      }

      boolean(){

      }
}

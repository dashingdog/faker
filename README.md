# faker
faker是一套模拟数据工具，可以快速构造多种基础类型数据，也可通过模板快速生成数组、对象等结构数据

## 安装

``` shell
// 虚拟
npm install --save-dev faker
```

## 使用
``` js
import { faker , Faker} from 'faker'

const num = faker.random.number()

```


## 基础功能

### random

random提供四种随机数方便调用

``` js
// 生成随机数字 min 最小长度，max 最大长度
faker.random.number(min,max):number
// 生成随机字符串 min 最小长度，max 最大长度
faker.random.string(min,max):string
//生成随机布尔值
faker.random.boolean():boolean
// 生成随机手机号
faker.random.phone()):string
```

### string

``` js
// 返回随机字符串
faker.string.alpha(alphaOption):string


// 使用案例
faker.string.alpha(3) // abc
faker.string.alpha({length:3,include:['qwer','asdf'] }) // qwerqwerasdf

type alphaOption = number | {
  // 字符长度
    length?:number|{
          min: number;
          max: number;
        },
  	// 返回字符集大小写
  	casing?:Casing,
  	// 传入inclue则从include中选择字符
   	include?: string[];
		// 需要过滤的字符
    exclude?: ReadonlyArray<LiteralUnion<AlphaChar>> | string;
 };

export type Casing = 'upper' | 'lower' | 'mixed';

```



### number

``` js
// 返回随机整数
faker.number.int(IntOption):number
// 使用案例
faker.number.int({min:3,max:4})// 3

type IntOption = number | {
    min?: number;
    max?: number;
 };
```



### date

``` js
// 生成一个随机日期
faker.date.recent(option:DateOption):Date

DateOption = { days?: number; refDate?: string | Date | number }
```




## 模板功能

### mock

mock可以方便的组合基础类型进行调用

``` js
// 支持调用函数
faker.mock('@number')

faker.mock('@number(1,100)')

// 支持生成数组
faker.mock({
  "array|1-10": [
    "Mock.js"
  ]
})

// 支持生成对象
faker.mock({
    'string|1-10':'***',
    'number|1-100':20
})

```


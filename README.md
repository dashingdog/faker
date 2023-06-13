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

``` js
// 生成随机数字
faker.random.number(min,max):number
// 生成随机字符串
faker.random.string(min,max):string
//生成随机布尔值
faker.random.boolean():boolean
// 生成随机手机号
faker.random.phone()):string
```

### date

``` js
// 生成一个随机日期
faker.date.recent(option:DateOption):Date

DateOption = { days?: number; refDate?: string | Date | number }
```




## 模板功能

### mock

``` js
// 支持调用函数
faker.mock('@number')

faker.mock('@number(1,100)')

// 支持生成对象
faker.mock({
  "array|1-10": [
    "Mock.js"
  ]
})

// 支持生成数组
faker.mock({
    'string|1-10':'***',
    'number|1-100':20
})

```


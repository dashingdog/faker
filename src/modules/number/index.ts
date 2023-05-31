export class NumberModule {

    int(options:
        | number
        | {
            /**
             * 最小值
             *
             * @default 0
             */
            min?: number;
            /**
             * 最大值
             *
             * @default Number.MAX_SAFE_INTEGER
             */
            max?: number;
          } = {}){
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
            // 异常提示
          }
          const real = Math.random();
          return Math.floor(real * (effectiveMax + 1 - effectiveMin) + effectiveMin);
    }
}
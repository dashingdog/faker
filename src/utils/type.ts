export type LiteralUnion<TSuggested extends TBase, TBase = string> =
  | TSuggested
  | (TBase & { zz_IGNORE_ME?: never });

  export const getType = function (value: any): string {
    return isDef(value) 
      ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)![1].toLowerCase() 
      : String(value)
  }
  
  export const isDef = function (value: unknown): boolean {
    return value !== undefined && value !== null
  }
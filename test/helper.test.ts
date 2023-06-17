import { describe, expect, it } from 'vitest';
import { faker,FakerError } from '../src';

describe('helper', () => {
    it('multiple default count is 3', () => {
       const list = faker.helpers.multiple(()=>'abc')
       expect(list.length).toBe(3)
    });

    it('multiple count <=0 return []', () => {
        const list = faker.helpers.multiple(()=>'abc',{count:0})
        expect(list.length).toBe(0)

        const list2 = faker.helpers.multiple(()=>'abc',{count:-1})
        expect(list2.length).toBe(0)
     });

    it('arrayElement result in array',()=>{
        const list = [1,2,3,4,5];
        const result =  faker.helpers.arrayElement(list);
        expect(list.includes(result)).toBe(true)
    })

    it('arrayElement lisrt only one work',()=>{
        const list = [1];
        const result =  faker.helpers.arrayElement(list);
        expect(result).toBe(list[0])
    })

    it('arrayElement list params is null throw error ',()=>{
        expect(()=>faker.helpers.arrayElement(null)).toThrow( new FakerError(
            'Calling `faker.helpers.arrayElement()` without arguments is no longer supported.'
          ));
    })

    it('arrayElement list params is empty array throw error ',()=>{
        expect(()=>faker.helpers.arrayElement([])).toThrow( new FakerError(
            'Cannot get value from empty dataset.'
          ));
    })

    it('rangeToNumber work',()=>{
        const num = faker.helpers.rangeToNumber({min:1,max:10})
        expect(num).toBeGreaterThanOrEqual(1)
        expect(num).toBeLessThanOrEqual(10);
    })
})
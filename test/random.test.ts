import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('random', () => {
  it('random.number default work',()=>{
    expect(faker.random.number()).toBeTypeOf('number')
  })

  it('random.number default work',()=>{
      const randomNum = faker.random.number(3,5)
      expect(randomNum).toBeGreaterThanOrEqual(3);
      expect(randomNum).toBeLessThanOrEqual(5);  })

  it('random.string default work',()=>{
    expect(faker.random.string()).toBeTypeOf('string')
  })

  it('random.string default work',()=>{
    expect(faker.random.string()).toBeTypeOf('string')
  })

  it('random.boolean default work',()=>{
    expect(faker.random.boolean()).toBeTypeOf('boolean')
  })

  it('random.id  work',()=>{
    expect(faker.random.phone().length).toBe(11)
  })
})
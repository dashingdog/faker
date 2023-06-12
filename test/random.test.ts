import { describe, expect, it } from 'vitest';
import { faker } from '../src';

describe('random', () => {
  it('random.number default work',()=>{
    expect(faker.random.number()).toBeTypeOf('number')
  })

  it('random.string default work',()=>{
    expect(faker.random.string()).toBeTypeOf('string')
  })

  it('random.boolean default work',()=>{
    expect(faker.random.boolean()).toBeTypeOf('boolean')
  })
})
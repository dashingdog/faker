import {RE_RANGE,RE_KEY} from '../../utils/constant'

export const parse = (name: string | undefined | number)=>{
  name = name === undefined ? '' : (name + '')
  const parameters = name.match(RE_KEY)
  // name|min-max, name|count
  const range = parameters && parameters[3] && parameters[3].match(RE_RANGE)
  const min = range && range[1] && parseInt(range[1], 10)
  const max = range && range[2] && parseInt(range[2], 10)
  const result = {
    // 1 name, 2 inc, 3 range, 4 decimal
    parameters,
    // 1 min, 2 max
    range,
    min,
    max,
  }

  for (const r in result) {
      if (result[r] != undefined) {
      return result
      }
  }

  return {} as typeof result
}
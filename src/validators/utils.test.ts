import { describe, expect, test } from '@jest/globals'
import {
  isArray,
  isBoolean,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isObject,
  isObjectPrototype,
  isError,
  isFunction,
  isRegExp,
  isPrimitive,
  isBuffer,
  isDate,
  isMatch,
  isAlpha,
  isAlphaNum
} from './utils'

describe('[utils] isArray', () => {
  test('has Array', () => expect(isArray([])).toBeTruthy())
  test('Object is not Array', () => expect(isArray({ a: 1, b: 2 })).toBeFalsy())
  test('Null is not Array', () => expect(isArray(null)).toBeFalsy())
})

describe('[utils] isBoolean', () => {
  test('has Boolean', () => expect(isBoolean(true)).toBeTruthy())
  test('has Boolean', () => {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Boolean
    expect(isBoolean(new Boolean(true))).toBeTruthy()
  })
  test('has Boolean', () => expect(isBoolean(false)).toBeTruthy())
  test('String is not Boolean', () => expect(isBoolean('true')).toBeFalsy())
})

describe('[utils] isNull', () => {
  test('has Null', () => expect(isNull(null)).toBeTruthy())
  test('Undefined is not Null', () => expect(isNull(undefined)).toBeFalsy())
  test('0 is not Null', () => expect(isNull(0)).toBeFalsy())
  test('Empty String is not Null', () => expect(isNull('')).toBeFalsy())
})

describe('[utils] isNullOrUndefined', () => {
  test('has NullOrUndefined', () => expect(isNullOrUndefined(null)).toBeTruthy())
  test('has NullOrUndefined', () => expect(isNullOrUndefined(undefined)).toBeTruthy())
  test('Empty String is not NullOrUndefined', () => expect(isNullOrUndefined('')).toBeFalsy())
})

describe('[utils] isNumber', () => {
  test('has Number', () => expect(isNumber(4)).toBeTruthy())
  test('has Number', () => {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number
    expect(isNumber(new Number(4))).toBeTruthy()
  })
  test('String number is not Number', () => expect(isNumber('4')).toBeFalsy())
})

describe('[validators/utils] isString', () => {
  test('has String', () => expect(isString('shopopop')).toBeTruthy())
  test('has String', () => {
    // https:// developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String
    expect(isString(new String('shopopop'))).toBeTruthy()
  })
  test('Number is not String', () => expect(isString(3306)).toBeFalsy())
})

describe('[validators/utils] isSymbol', () => {
  test('has Symbol', () => expect(isSymbol(Symbol('test'))).toBeTruthy())
  test('String is not Symbol', () => expect(isSymbol('string')).toBeFalsy())
})

describe('[validators/utils] isUndefined', () => {
  test('has Undefined', () => {
    let t
    expect(isUndefined(t)).toBeTruthy()
  })
  test('String is not Undefined', () => expect(isUndefined('undefined')).toBeFalsy())
  test('Object is not Undefined', () => expect(isUndefined({})).toBeFalsy())
})

describe('[validators/utils] isObject', () => {
  test('has Object', () => expect(isObject({ a: 4 })).toBeTruthy())
  test('has Object', () => expect(isObject({})).toBeTruthy())
  test('has Object', () => expect(isObject([1, 2])).toBeTruthy())
  test('has Object', () => expect(isObject(new Map([['a', 4]]))).toBeTruthy())
  test('has Object', () => expect(isObject(new Set(['a', 4]))).toBeTruthy())
  test('String is not Object', () => expect(isObject('shopopop')).toBeFalsy())
})

describe('[validators/utils] isObjectPrototype', () => {
  test('has ObjectPrototype', () => expect(isObjectPrototype({ a: 4 })).toBeTruthy())
  test('has ObjectPrototype', () => expect(isObjectPrototype({})).toBeTruthy())
  test('Array is not ObjectPrototype', () => expect(isObjectPrototype(['44'])).toBeFalsy())
  test('Map is not ObjectPrototype', () => expect(isObjectPrototype(new Map([['a', 4]]))).toBeFalsy())
  test('Set is not ObjectPrototype', () => expect(isObjectPrototype(new Set(['a', 4]))).toBeFalsy())
})

describe('[validators/utils] isError', () => {
  test('has Error', () => {
    const a = new Error()
    expect(isError(a)).toBeTruthy()
  })
  test('has Error', () => {
    const b = new TypeError()
    expect(isError(b)).toBeTruthy()
  })
  test('has Error', () => {
    const c = new RangeError()
    expect(isError(c)).toBeTruthy()
  })
  test('String is not Error', () => expect(isError('error')).toBeFalsy())
})

describe('[validators/utils] IsFunction', () => {
  test('has Function', () => {
    const a = function (): void {}
    expect(isFunction(a)).toBeTruthy()
  })
  test('Object is not ObjectPrototype', () => expect(isFunction({})).toBe(false))
})

describe('[validators/utils] isRegExp', () => {
  test('has RegExp', () => expect(isRegExp(new RegExp(/ba/))).toBeTruthy())
  test('has RegExp', () => expect(isRegExp(/ba/)).toBeTruthy())
  test('Null is not RegExp', () => expect(isRegExp(null)).toBeFalsy())
  test('Undefined is not RegExp', () => expect(isRegExp(undefined)).toBeFalsy())
})

describe('[validators/utils] isPrimitive', () => {
  test('has Primitive', () => expect(isPrimitive(4)).toBeTruthy())
  test('has Primitive', () => expect(isPrimitive('shopopop')).toBeTruthy())
  test('has Primitive', () => expect(isPrimitive('true')).toBeTruthy())
  test('has Primitive', () => expect(isPrimitive(Symbol('test'))).toBeTruthy())
  test('has Primitive', () => expect(isPrimitive(null)).toBeTruthy())
  test('has Primitive', () => expect(isPrimitive(undefined)).toBeTruthy())
  test('Array is not Primitive', () => expect(isPrimitive([4, 5])).toBeFalsy())
  test('Object is not Primitive', () => expect(isPrimitive({ a: 4 })).toBeFalsy())
})

describe('[validators/utils] isBuffer', () => {
  test('has Buffer', () => expect(isBuffer(Buffer.from('shopopop'))).toBeTruthy())
  test('String is not buffer', () => expect(isBuffer('shopopop')).toBeFalsy())
})

describe('[validators/utils] isDate', () => {
  test('has Date', () => expect(isDate(new Date())).toBeTruthy())
  test('String is not Date', () => expect(isDate('2020-10-04T10:00:00.000Z')).toBeFalsy())
})

describe('[validators/utils] isMatch', () => {
  test('has Match', () => expect(isMatch('a', /^([a-z])+$/i)).toBeTruthy())
  test('is not Match', () => expect(isMatch('5', /^([a-z])+$/i)).toBeFalsy())
})

describe('[validators/utils] isAlpha', () => {
  test('"baBA" has Alpha', () => expect(isAlpha('baBA')).toBeTruthy())
  test('"151A" is not Alpha', () => expect(isAlpha('151A')).toBeFalsy())
})

describe('[validators/utils] isAlphaNum', () => {
  test('"151A" has AlphaNum', () => expect(isAlphaNum('151A')).toBeTruthy())
  test('"151A@" is not AlphaNum', () => expect(isAlphaNum('151A@')).toBeFalsy())
})

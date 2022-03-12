import { describe, expect, test } from '@jest/globals'
import { distinct } from './distinct'

describe('[colllections/distinct] Distinct', () => {
  test('Array Distinct', () => expect(distinct([])).toEqual([]))
  test('Array Distinct', () => expect(distinct([true, 'a', 4, 'a', true])).toEqual([true, 'a', 4]))
  test('Array Distinct', () => expect(distinct([null, undefined, 4, undefined, null])).toEqual([null, undefined, 4]))
  test('Array Distinct', () => expect(distinct([true, 'a', 4, 'a', true])).toEqual([true, 'a', 4]))
  test('Array Distinct', () => expect(distinct([{ a: 4 }, { a: 4 }])).toEqual([{ a: 4 }, { a: 4 }]))
})

import { describe, expect, test } from '@jest/globals'
import { randomInteger, randomSalt } from './random'
import { isString } from '../validators/utils'

describe('[utils/random] randomInteger', () => {
  test('0 -> 3 RandomInteger', () => {
    const rand = randomInteger(0, 3)
    expect(rand).toBeGreaterThanOrEqual(0)
    expect(rand).toBeLessThanOrEqual(3)
  })
  test('-3 -> 0 RandomInteger', () => {
    const rand = randomInteger(-3, 0)
    expect(rand).toBeGreaterThanOrEqual(-3)
    expect(rand).toBeLessThanOrEqual(0)
  })
  test('1 -> 1 RandomInteger', () => expect(randomInteger(1, 1)).toBe(1))
})

describe('[utils/random] randomSalt', () => {
  test('RandomSalt', () => {
    const salt = randomSalt(16)
    expect(isString(salt)).toBeTruthy()
    expect(salt.length).toBe(16)
  })
})

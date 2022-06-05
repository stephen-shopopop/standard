import { describe, expect, test } from '@jest/globals'
import { match, when } from '../patterns/matching'
import { isFunction } from '../validators'

describe('[pattern/matching] when', () => {
  test('return pattern when curring "when" with predicate & execution', () => {
    const condition = when((name: string) => typeof name === 'string')
    const pattern = condition((name: string) => name)

    expect(isFunction(condition)).toBeTruthy()
    expect(isFunction(pattern.predicate)).toBeTruthy()
    expect(isFunction(pattern.execution)).toBeTruthy()
  })
})

describe('[pattern/matching] match', () => {
  test('return error when curring match whitout pattern & default execution', () => {
    try {
      match('test')(
        when((name: string) => typeof name === 'number')((name: string) => name.toLocaleUpperCase)
      )()
    } catch (error) {
      expect(error instanceof Error).toBeTruthy()
      expect(String(error)).toEqual('Error: Error: no pattern matched. Please use a wildcard pattern.')
    }
  })

  test('return array when curring match with string type', () => {
    const result = match('lorem')(
      when((word: string) => word.length === 0)((word: string) => [word])
    )((word: string) => [word, 'latium'])

    expect(result).toEqual(['lorem', 'latium'])
  })

  test('return undefined when curring match with event return undefined', () => {
    const word = match('lorem')(
      when((user: string) => user.length > 0)((user: string) => { user = 'ipsum' })
    )()

    expect(word).toEqual(undefined)
  })

  test('return value when async curring match with execution return promise', async () => {
    const predicate = (word: string): Boolean => word.length > 0
    const execution = async (word: string): Promise<string> => await Promise.resolve(String([word, 'ipsum']))

    const word = await match('lorem')(
      when(predicate)(execution)
    )()

    expect(String(word)).toEqual('lorem,ipsum')
  })
})

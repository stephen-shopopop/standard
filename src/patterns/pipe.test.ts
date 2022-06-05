import { describe, expect, test } from '@jest/globals'
import { pipe } from './pipe'
import { isFunction } from '../validators'

describe('[pattern/pipe] pipe', () => {
  test('return function when pipe', () => {
    const sanitizeWord = pipe(
      (word: string) => word.trim(),
      (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
    )

    expect(isFunction(sanitizeWord)).toBeTruthy()
  })

  test('return type string when curring pipe with type string', () => {
    const word = pipe(
      (word: string) => word.trim(),
      (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
    )(' lorem')

    expect(word).toEqual('Lorem')
  })

  test('return type array when curring pipe with type array', () => {
    const words = pipe(
      (words: string[]) => words.map((word: string) => word.trim()),
      (words: string[]) => words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    )([' Lorem', 'ipsum'])

    expect(words).toEqual(['Lorem', 'Ipsum'])
  })
})

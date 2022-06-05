import { describe, expect, test } from '@jest/globals'
import { asyncPipe } from './asyncPipe'
import { isFunction } from '../validators'

describe('[pattern/pipeAsync] pipeAsync', () => {
  test('return function when pipeAsync', () => {
    const sanitizeWord = asyncPipe(
      (word: string) => word.trim(),
      (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
      async (word: string) => (await word) + 't',
      async (word: string) => await Promise.resolve(word + 's')
    )

    expect(isFunction(sanitizeWord)).toBeTruthy()
  })

  test('return type string when curring pipe with type string', async () => {
    const word = await asyncPipe(
      (word: string) => word.trim(),
      (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
      async (word: string) => await Promise.resolve(word + 's')
    )(' lorem')

    expect(word).toEqual('Lorems')
  })
})

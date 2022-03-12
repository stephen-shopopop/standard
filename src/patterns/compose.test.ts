import { describe, expect, test } from '@jest/globals'
import { compose } from './compose'
import { isFunction } from '../validators'

describe('[pattern/compose] compose', () => {
  test('return function when compose', () => {
    const nameToEmail = compose(
      (word: string) => word + 'example.com',
      (word: string) => word + '@'
    )

    expect(isFunction(nameToEmail)).toBeTruthy()
  })

  test('return type string when curring compose with type string', () => {
    const word: string = compose(
      (word: string) => word + 'example.com',
      (word: string) => word + '@'
    )('lorem')

    expect(word).toEqual('lorem@example.com')
  })
})

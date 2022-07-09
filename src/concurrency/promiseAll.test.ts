import { describe, expect, test } from '@jest/globals'
import { fail } from 'assert'
import { promiseAll } from './promiseAll'

describe('[concurrency/promiseAll] pipe', () => {
  test('promiseAll should return all promises result', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    const ret = await promiseAll<string | number>([
      fn(),
      Promise.resolve(87),
      Promise.resolve('test')
    ])

    expect(ret).toEqual([9, 87, 'test'])
  })

  test('An promise error should stop promiseAll and catch error', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    expect.hasAssertions()

    try {
      await promiseAll([
        fn(),
        Promise.reject(new Error('Error promise'))
      ])
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe('Error promise')
      } else {
        fail('Bad error catch')
      }
    }
  })
})

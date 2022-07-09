import { describe, expect, test } from '@jest/globals'
import { promiseAllSettled } from './promiseAllSettled'

describe('[concurrency/promiseAll] pipe', () => {
  test('it should return all promises result', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    const ret = await promiseAllSettled<number | string>([
      fn(),
      Promise.resolve(87),
      Promise.resolve('test')
    ])

    expect(ret).toEqual([
      {
        status: 'fulfilled',
        value: 9
      }, {
        status: 'fulfilled',
        value: 87
      }, {
        status: 'fulfilled',
        value: 'test'
      }
    ])
  })

  test('An promise error should return reason after resolve all promise', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    const [ret] = await promiseAllSettled([
      Promise.reject(new Error('Error promise')),
      fn()
    ])

    expect(ret.status).toEqual('rejected')
    expect(ret.reason.message).toEqual('Error promise')
  })
})

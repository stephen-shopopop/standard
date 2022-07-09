import { describe, expect, test } from '@jest/globals'
import { promiseAllSettled } from './promiseAllSettled'

describe('[concurrency/promiseAll] pipe', () => {
  test('it should return result all promises', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    const ret = await promiseAllSettled([
      fn(),
      Promise.resolve(87)
    ])

    expect(ret).toEqual([
      {
        status: 'fulfilled',
        value: 9
      }, {
        status: 'fulfilled',
        value: 87
      }
    ])
  })

  test('An promise error should return reason after resolve all promise', async () => {
    async function fn (): Promise<number> {
      return await Promise.resolve(9)
    }

    const ret = await promiseAllSettled([
      fn(),
      Promise.reject(new Error('Error promise'))
    ])

    expect(ret).toEqual('')
    expect(ret[1].reason.message).toEqual('Error promise')
  })
})

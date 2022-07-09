// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { sleep } from '../utils'
import { isInteger } from '../validators'

export interface PromiseSettled<T> {
  status: 'fulfilled' | 'rejected'
  reason?: any
  value?: T
}

export async function promiseAllSettled<T> (
  promises: Array<Promise<T>>,
  batchSize = 0,
  delay = 0
): Promise<Array<PromiseSettled<Awaited<T>>>> {
  const n = isInteger(batchSize) && batchSize > 0
    ? batchSize
    : promises.length

  let ret: Array<PromiseSettled<Awaited<T>>> = []

  while (promises.length > 0) {
    const batchResult = await Promise.allSettled(promises.splice(0, n))

    ret = [...ret, ...batchResult]

    await sleep(delay)
  }

  return ret
}

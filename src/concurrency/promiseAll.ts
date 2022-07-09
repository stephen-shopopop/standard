// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { sleep } from '../utils'
import { isInteger } from '../validators'

export async function promiseAll<T> (
  promises: Array<Promise<T>>,
  batchSize = 0,
  delay = 0
): Promise<Array<Awaited<T>>> {
  const n = isInteger(batchSize) && batchSize > 0
    ? batchSize
    : promises.length

  let ret: Array<Awaited<T>> = []

  while (promises.length > 0) {
    const batchResult = await Promise.all(promises.splice(0, n))

    ret = [...ret, ...batchResult]

    await sleep(delay)
  }

  return ret
}

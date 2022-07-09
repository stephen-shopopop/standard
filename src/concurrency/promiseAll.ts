// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { sleep } from '../utils'

export async function promiseAll<T> (
  promises: Array<Promise<T>>,
  batchSize?: number,
  delay = 0
): Promise<any[]> {
  let output: any[] = []
  const n = Number(batchSize) === batchSize && batchSize % 1 === 0 && batchSize > 0
    ? batchSize
    : promises.length

  while (promises.length > 0) {
    const batchResult = await Promise.all(promises.splice(0, n))

    output = [...output, ...batchResult]

    await sleep(delay)
  }

  return output
}

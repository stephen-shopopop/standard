// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Handle } from '../types/pattern'

/**
 * @param functions Handle
 * @returns T
 *
 * ```ts
 * import { pipe } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const sanitizeName = pipe(
 *    (name: string) => name.trim(),
 *    (name: string) => name.charAt(0).toUpperCase() + name.slice(1),
 *    async (word: string) => await Promise.resolve(word + 's'),
 * )
 *
 * const name = await sanitizeName(' jean ')
 *
 * assert.equal(name, 'Jeans')
 * ```
 */
export function asyncPipe <T> (...functions: Function[]): Handle<T> {
  return (arg: T): T =>
    functions.reduce((prev: T, currentFn: Function) =>
      prev instanceof Promise
        ? prev.then(value => currentFn(value))
        : currentFn(prev)
    , arg)
}
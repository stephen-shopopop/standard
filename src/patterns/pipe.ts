// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Handle } from '../types/pattern'

/**
 * @param functions Handle
 * @returns T
 *
 * ```ts
 * import { patterns } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const sanitizeName = patterns.pipe(
 *    (name: string) => name.trim(),
 *    (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
 * )
 *
 * const name = sanitizeName(' jean ')
 *
 * assert.equal(name, 'Jean')
 * ```
 *
 *  * ```ts
 * import { patterns } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const sanitizeName = patterns.pipe(
 *    (name: string) => name.trim(),
 *    (name: string) => name.charAt(0).toUpperCase() + name.slice(1),
 *    async(name: string) => await Promise.resolve(name + '!')
 * )
 *
 * const name = await sanitizeName(' jean ')
 *
 * assert.equal(name, 'Jean!')
 * ```
 */
export function pipe <T> (...functions: Array<Handle<T>>): Handle<T> {
  return (arg: T): T =>
    functions
      .reduce((prev: T, currentFn: Function) =>
        prev instanceof Promise
          ? prev.then(value => currentFn(value))
          : currentFn(prev)
      , arg)
}

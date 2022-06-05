// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Handle, PromiseHandle } from '../types/pattern'

/**
 * @param functions Handle
 * @returns T
 *
 * ```ts
 * import { compose } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const createEmailByName = compose(
 *    (name: string) => name + 'example.org',
 *    (name: string) => name + '@',
 * )
 *
 * const email = createEmailByName('jean')
 *
 * assert.equal(email, 'jean@example.org')
 * ```
 */
export function compose <T> (...functions: Array<Handle<T> | PromiseHandle<T>>): Handle<T> | PromiseHandle<T> {
  return (arg: T): T =>
    functions
      .reverse()
      .reduce((prev: T, currentFn: Function) =>
        prev instanceof Promise
          ? prev.then(value => currentFn(value))
          : currentFn(prev)
      , arg)
}

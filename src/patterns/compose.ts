// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Handle } from '../types/pattern'

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
export function compose <T> (...functions: Array<Handle<T>>): Handle<T> {
  return (arg: T): T =>
    functions
      .reverse()
      .reduce((previous: T, current: Handle<T>) => current(previous), arg)
}

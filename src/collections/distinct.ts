// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

/**
 * @param array
 * @returns array
 * Distinct elements in array
 * ```ts
 * import { collections } from from "@stephen-shopopop/standard"
 * import assert from "assert"
 *
 * const numbers = [ 3, 2, 5, 2, 5 ]
 * const distinctNumbers = collections.distinct(numbers)
 *
 * assert.equal(distinctNumbers, [ 3, 2, 5 ])
 * ```
 */
export function distinct<T> (array: readonly T[]): T[] {
  const set = new Set(array)

  return Array.from(set)
}

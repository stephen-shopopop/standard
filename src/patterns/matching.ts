// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Function, Pattern, Predicate } from '../types/pattern'

const throwError = (): any => {
  throw new Error('Error: no pattern matched. Please use a wildcard pattern.')
}

/**
 * Pattern for pattern matching
 *
 * ```ts
 * import { patterns } from "@stephen-shopopop/standard"
 *
 * const predicate = (name: string) => typeof name === 'string'
 * const execution = (name: string) => name.toUpperCase()
 * const pattern = patterns.when(predicate)(execution)
 * ```
 */
export const when = <T>(predicate: Predicate<T>) => {
  return <O>(
    execution: Function<T, O>
  ): Pattern<T, O> => {
    return {
      predicate,
      execution
    }
  }
}

/**
 *  Pattern matching
 *
 * ```ts
 * import { patterns } from "@stephen-shopopop/std"
 * import assert from 'assert/strict'
 *
 * const predicate = (name: string) => typeof name === 'string'
 * const execution = (name: string) => name.toUpperCase()
 * const pattern = patterns.when(predicate)(execution)
 *
 * const name = patterns.match('lorem')(pattern)()
 *
 * assert.equal(name, 'LOREM')
 * ```
 */
export const match = <T>(value: T) =>
  <O>(...patterns: Array<Pattern<T, O>>) =>
    (defaultEvent?: Function<T, O>): O => {
      const filteredPatterns = patterns.filter(
        (pattern: Pattern<T, O>) => pattern.predicate(value)
      )

      return filteredPatterns.length >= 1
        ? filteredPatterns[0].execution(value)
        : typeof defaultEvent === 'function'
          ? defaultEvent(value)
          : throwError()
    }

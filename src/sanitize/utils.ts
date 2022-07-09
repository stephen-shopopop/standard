// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { pipe } from '../patterns'
import { Handle } from '../types/pattern'

/**
 * @param char string
 * @returns Handle<string>
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const stripSlashesLeft = sanitize.ltrim('/')
 * const path = stripSlashesLeft('///delivery')
 *
 * assert.equal(path, 'delivery')
 * ```
 */
export function ltrim (char?: string): Handle<string> {
  return (string: string) =>
    typeof char !== 'string'
      ? string.trimStart()
      : string.replace(new RegExp(`^${char}*`), '')
}

/**
 * @param char string
 * @returns Handle<string>
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const stripSlashesRight = sanitize.rtrim('/')
 * const path = stripSlashesRight('delivery////')
 *
 * assert.equal(path, 'delivery')
 * ```
 */
export function rtrim (char?: string): Handle<string> {
  return (string: String) =>
    typeof char !== 'string'
      ? string.trimEnd()
      : string.replace(new RegExp(`${char}*$`), '')
}

/**
 * @param char string
 * @returns Handle<string>
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const stripSlashes = sanitize.rtrim('/')
 * const path = stripSlashes('////delivery////')
 *
 * assert.equal(path, 'delivery')
 * ```
 */
export function trim (char?: string): Handle<string> {
  return (string: string) => {
    return pipe(
      ltrim(char),
      rtrim(char)
    )(string)
  }
}

/**
 * @param value string
 * @returns string
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * assert.equal(sanitize.quoteString('lorem ipsum'), '"lorem ipsum"')
 * assert.equal(sanitize.quoteString(['lorem', 99]), 'lorem,99')
 * ```
 */
export function quoteString (value: unknown): string {
  return typeof value === 'string'
    ? JSON.stringify(value)
    : String(value)
}

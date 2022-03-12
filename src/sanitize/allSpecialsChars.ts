// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

/**
 * Sanitize all specials characters: /\\?¿¡[]=<>:;,._-'"&$#*()|~`!{}
 *
 * @param value string
 * @returns string
 *
 * ```ts
 * import { sanitizeAllspecialsChars } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const name = sanitizeAllspecialsChars('<p>shopopop</p><br>')
 *
 * assert.equal(name, 'pshopopoppbr')
 * ```
 */
export const sanitizeAllspecialsChars = (value: string): string => {
  const specialChars = '[/?¿¡\\[\\]=<>:;,\\.\\_\\-\'"&$#*()|~`!{}\\\\]'

  return value
    .replace(new RegExp(specialChars, 'gi'), '')
    .replace(/%20/gi, ' ')
    .replace(/[\r\n\t]+/gi, ' ')
}

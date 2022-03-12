// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

/**
 * Escape all bad unicode (https://javascript.info/regexp-unicode)
 * @param value string
 * @returns string
 *
 * ```ts
 * import { escapeBadUnicode } from "@shopopop/std"
 * import assert from 'assert/strict'
 *
 * const string = escapeBadUnicode('Hello world 🙂!')
 *
 * assert.equal(string, 'Hello world !')
 * ```
 */
export const escapeBadUnicode = (value: string): string =>
  value
    .replace(/\p{So}/gu, '')
    .replace(/\p{M}/gu, '')
    .replace(/\p{C}/gu, '')

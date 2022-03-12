// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

/**
 * random number between the inclusive `lower` and `upper`
 * @param lower number
 * @param upper number
 * @returns number
 * ```ts
 * import { randomInteger } from "@stephen-shopopop/standard"
 *
 * const random = randomInteger(0, 99)
 * ```
 */
export function randomInteger (lower: number, upper: number): number {
  return lower + Math.floor(Math.random() * (upper - lower + 1))
}

/**
 * @param length number salt length
 * @returns string
 * ```ts
 * import { randomSalt } from "@stephen-shopopop/standard"
 *
 * const random = randomSalt(16)
 * ```
 */
export function randomSalt (length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+;:,.?'
  let salt = ''
  for (let i = 0; i < length; i++) {
    const random = randomInteger(0, chars.length - 1)
    salt += chars.charAt(random)
  }
  return salt
}

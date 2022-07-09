// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

/**
 * Sanitize all html tags
 * @param value string
 * @returns string
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const textarea = sanitize.stripTags('<p>shopopop</p><br>')
 *
 * assert.equal(textarea, 'shopopop')
 * ```
 */
export const stripTags = (value: string): string =>
  value
    .replace(/<!--[\s\S]*?(-->|$)/gi, '')
    .replace(/<(script|style)[^>]*>[\s\S]*?(<\/\1>|$)/gi, '')
    .replace(/<\/?[a-z][\s\S]*?(>|$)/gi, '')

/**
 * replace accent with their corresponding value
 * @param value string
 * @returns string
 *
 * ```ts
 * import { sanitize } from "@stephen-shopopop/standard"
 * import assert from 'assert/strict'
 *
 * const address = sanitize.removeAccents('Allée du Moulin 44980 Angoulême')
 *
 * assert.equal(address, 'Allee du Moulin 44980 Angouleme')
 * ```
 */
export const removeAccents = (value: string): string => {
  const charNotClean = '@ÀÁÂÃÄÅÆªÇĆČÈÉÊËĘĖĒÎÏÌÍĮĪÔŒÖÒÓÕØŌÑŃÙÚÛÜÚŪÝàáâãäåçćčéèéêëęėēîïìíįīñńôœºöòóõøōúûüùūýÿ©'
  const clean = 'aAAAAAAAACCCEEEEEEEIIIIIIOOOOOOOONNUUUUUUYaaaaaaccceeeeeeeeiiiiiinnooooooooouuuuuyyc'

  return value
    .split('')
    .map((letter: string) => {
      const accentIndex = charNotClean.indexOf(letter)

      return accentIndex !== -1 ? clean[accentIndex] : letter
    })
    .join('')
    .replace(/[¿¡]/gi, '')
}

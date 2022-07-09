import { describe, expect, test } from '@jest/globals'
import {
  allspecialsChars
} from './allSpecialsChars'

describe('[sanitize/sanitizeAllspecialschars] sanitizeAllspecialsChars', () => {
  test.each`
    string | expected
    ${'<p>shopopop</p><br>'} | ${'pshopopoppbr'}
    ${'\rHello\tWorld!\n'} | ${' Hello World '}
    ${encodeURI('https://www.shopopop.com/account?q= to')} | ${'httpswwwshopopopcomaccountq to'}
    ${'\\n \\\\H [4,9]'} || ${'n H 49'}
    ${'/?¿¡[]=<>:;,._-\'"&$#*()|~`!{}'} || ${''}
  `('returns $expected when sanitizeAllspecialsChars $string', ({ string, expected }) => {
    expect(allspecialsChars(string)).toEqual(expected)
  })
})

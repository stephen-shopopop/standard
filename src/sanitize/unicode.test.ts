import { describe, expect, test } from '@jest/globals'
import { escapeBadUnicode } from './unicode'

const accents = '@ÀÁÂÃÄÅÆªÇĆČÈÉÊËĘĖĒÎÏÌÍĮĪÔŒÖÒÓÕØŌÑŃÙÚÛÜÚŪÝàáâãäåçćčéèéêëęėēîïìíįīñńôœºöòóõøōúûüùūýÿ'
const specialsChars = '/?¿¡[]=<>:;,._-\'"&$#*()|~`!{}'
const text = `
Hello world!

 I am here
`

describe('[sanitize/unicode] escapeBadUnicode', () => {
  test.each`
    string | expected
    ${specialsChars} | ${specialsChars}
    ${'\n\t\r\f'} | ${''}
    ${'🙂😉🙁'} | ${''}
    ${accents} | ${accents}
    ${' Hello world🙂!'} | ${' Hello world!'}
    ${text} | ${'Hello world! I am here'}
  `('returns $expected when escapeBadUnicode $string', ({ string, expected }) => {
    expect(escapeBadUnicode(string)).toEqual(expected)
  })
})

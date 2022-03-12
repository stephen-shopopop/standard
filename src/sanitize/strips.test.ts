import { describe, expect, test } from '@jest/globals'
import {
  stripTags,
  removeAccents
} from './strips'

describe('[sanitize/strips] stripTags', () => {
  test.each`
    string | expected
    ${'<p attr="test">path</p><br>'} | ${'path'}
    ${'<script>eval("1 + 1")</script>'} | ${''}
    ${'<style>.button { color: red; }</style>'} | ${''}
    ${'<link href="http://google.com"/>'} | ${''}
    ${'<!-- comment --><p>Hello</p>'} | ${'Hello'}
  `('returns $expected when stripTags $string', ({ string, expected }) => {
    expect(stripTags(string)).toEqual(expected)
  })
})

describe('[sanitize/strips] removeAccents', () => {
  test.each`
    string | expected
    ${'Allée du Moulin 44980 Angoulême'} | ${'Allee du Moulin 44980 Angouleme'}
    ${'¡mierda! ¿outch?'} | ${'mierda! outch?'}
    ${'@ÀÁÂÃÄÅÆªÇĆČÈÉÊËĘĖĒÎÏÌÍĮĪÔŒÖÒÓÕØŌÑŃÙÚÛÜÚŪÝ'} | ${'aAAAAAAAACCCEEEEEEEIIIIIIOOOOOOOONNUUUUUUY'}
    ${'àáâãäåçćčéèéêëęėēîïìíįīñńôœºöòóõøōúûüùūýÿ©'} | ${'aaaaaaccceeeeeeeeiiiiiinnooooooooouuuuuyyc'}
  `('returns $expected when stripTags $string', ({ string, expected }) => {
    expect(removeAccents(string)).toEqual(expected)
  })
})

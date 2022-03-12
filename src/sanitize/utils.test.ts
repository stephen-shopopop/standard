import { describe, expect, test } from '@jest/globals'
import {
  ltrim,
  trim,
  rtrim,
  quoteString
} from './utils'
import { isFunction } from '../validators'

describe('[sanitize/utils] ltrim', () => {
  test.each`
    string | char | expected
    ${'//path'} | ${'/'} | ${'path'}
    ${'   path'} | ${undefined} | ${'path'}
    ${'  path'} | ${null} | ${'path'}
  `('returns $expected when curring $string ltrim char $char', ({ string, char, expected }) => {
    expect(ltrim(char)(string)).toEqual(expected)
  })

  test('ltrim return function', () => {
    const unSlashesLeft = ltrim('/')
    expect(isFunction(unSlashesLeft)).toBeTruthy()
    expect(unSlashesLeft('////lorem')).toEqual('lorem')
  })
})

describe('[sanitize/utils] rtrim', () => {
  test.each`
    string | char | expected
    ${'path//'} | ${'/'} | ${'path'}
    ${'path   '} | ${undefined} | ${'path'}
    ${'path   '} | ${null} | ${'path'}
  `('returns $expected when curring $string rtrim char $char', ({ string, char, expected }) => {
    expect(rtrim(char)(string)).toEqual(expected)
  })

  test('rtrim return function', () => {
    const unSlashesRight = rtrim('/')
    expect(isFunction(unSlashesRight)).toBeTruthy()
    expect(unSlashesRight('lorem////')).toEqual('lorem')
  })
})

describe('[sanitize/utils] trim', () => {
  test.each`
    string | char | expected
    ${'//path//'} | ${'/'} | ${'path'}
    ${'  path   '} | ${undefined} | ${'path'}
    ${'  path   '} | ${null} | ${'path'}
  `('returns $expected when curring $string rtrim char $char', ({ string, char, expected }) => {
    expect(trim(char)(string)).toEqual(expected)
  })

  test('trim return function', () => {
    const unSlashes = trim('/')
    expect(isFunction(unSlashes)).toBeTruthy()
    expect(unSlashes('//lorem//')).toEqual('lorem')
  })
})

describe('[sanitize/utils] quoteString', () => {
  test.each`
    value | expected
    ${'lorem ipsum'} | ${JSON.stringify('lorem ipsum')}
    ${'https://www.shopopop.com/query=auth'} | ${'"https://www.shopopop.com/query=auth"'}
    ${['lorem', 7]} | ${'lorem,7'}
    ${99.1} | ${'99.1'}
    ${{ a: 'lorem' }} | ${'[object Object]'}
    ${new Map([['text', 'lorem']])} | ${'[object Map]'}
    ${new Set(['text', 'lorem'])} | ${'[object Set]'}
  `('returns $expected when $value quoteString', ({ value, expected }) => {
    expect(quoteString(value)).toEqual(expected)
  })
})

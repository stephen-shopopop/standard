import { describe, expect, test } from '@jest/globals'
import { deepMerge } from './deepMerge'

describe('[colllections/deepMerge] DeepMerge', () => {
  test('DeepMerge', () => {
    const a = { foo: true, bar: 4, test: { a: 3 } }
    const b = { foo: { bar: true }, test: { b: 8 } }
    expect(deepMerge(a, b)).toEqual({ foo: { bar: true }, bar: 4, test: { a: 3, b: 8 } })
  })

  test('Objects different in DeepMerge', () => {
    const a = { foo: { a: 3 } }
    const b = { foo: new Map([['a', 4]]) }
    expect(deepMerge(a, b)).toEqual({ foo: new Map([['a', 4]]) })
  })

  test('Symbol DeepMerge', () => {
    const key = Symbol('test')
    const a = { [key]: true }
    const b = { [key]: false }
    expect(deepMerge(a, b)[key]).toBeFalsy()
  })

  test('Number DeepMerge', () => {
    const a = { 9: true }
    const b = { 9: false }
    expect(deepMerge(a, b)).toEqual({ 9: false })
  })

  test('Array DeepMerge', () => {
    const a = { key: [1, 2], foo: [3] }
    const b = { key: [3], foo: 4 }
    expect(deepMerge(a, b)).toEqual({ key: [1, 2, 3], foo: 4 })
  })

  test('Map DeepMerge', () => {
    const a = { key: new Map([['a', 4]]) }
    const b = { key: new Map([['a', 7], ['b', 5]]) }
    expect(deepMerge(a, b)).toEqual({ key: new Map([['a', 7], ['b', 5]]) })
  })

  test('Set DeepMerge', () => {
    const a = { key: new Set([1, 2]) }
    const b = { key: new Set([3]) }
    expect(deepMerge(a, b)).toEqual({ key: new Set([1, 2, 3]) })
  })

  test('DeepMerge', () => {
    const Class = class {
      get (): boolean {
        return true
      }
    }
    const a = {
      class: null,
      function () {},
      get: false,
      boolean: true,
      null: null,
      undefined: undefined
    }
    const b = {
      class: new Class(),
      function () {},
      get get () {
        return true
      },
      boolean: false,
      null: null,
      undefined: undefined
    }
    expect(deepMerge(a, b)).toEqual(b)
  })
})

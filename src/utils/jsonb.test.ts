import { describe, expect, test } from '@jest/globals'
import { jsonb } from './jsonb'
import { isBuffer } from '../validators/utils'

describe('[utils/jsonb] jsonb', () => {
  test('Serialize Jsonb', () => {
    const serialize = jsonb.serialize(Buffer.from('test'))
    const deserialize = jsonb.deserialize(serialize)
    expect(serialize).toBe('":base64:dGVzdA=="')
    expect(isBuffer(deserialize)).toBeTruthy()
    expect(deserialize.toString('utf8')).toBe('test')
  })
  test('Serialize object Jsonb', () => {
    const serialize = jsonb.serialize({ a: 4, b: [1, 2] })
    expect(serialize).toBe('{"a":4,"b":[1,2]}')
  })
  test('Deserialize Jsonb', () => {
    const serialize = jsonb.serialize('test')
    const deserialize = jsonb.deserialize(serialize)
    expect(deserialize).toBe('test')
  })
})

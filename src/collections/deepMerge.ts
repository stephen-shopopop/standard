// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { isObject } from '../validators/utils'

function isMergeable (
  value: NonNullable<object>
): value is Record<PropertyKey, unknown> {
  return Object.getPrototypeOf(value) === Object.prototype
}

function mergeObjects (
  left: Readonly<NonNullable<unknown>>,
  right: Readonly<NonNullable<unknown>>
): Readonly<NonNullable<unknown>> {
  if (isMergeable(left) && isMergeable(right)) {
    return deepMerge(left, right)
  }

  if ((Array.isArray(left)) && (Array.isArray(right))) {
    return [...left, ...right]
  }

  if ((left instanceof Map) && (right instanceof Map)) {
    return new Map([...left, ...right])
  }

  if ((left instanceof Set) && (right instanceof Set)) {
    return new Set([...left, ...right])
  }

  return right
}

/**
 * @param record Object
 * @param other Object
 * @returns Object
 * ```ts
 * import { deepMerge } from "@shopopop/std"
 * import assert from "assert"
 *
 * const a = {foo: true}
 * const b = {foo: {bar: true}}
 *
 * assert.equal(deepMerge(a, b), {foo: {bar: true}});
 * ```
 */
export function deepMerge<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>
> (
  record: Readonly<T>,
  other: Readonly<U>
): NonNullable<Record<PropertyKey, unknown>> {
  const result: Record<PropertyKey, unknown> = {}

  const keys = new Set([
    ...Object.keys(record),
    ...Object.keys(other)
  ])

  for (const key of keys) {
    const left = Reflect.get(record, key)

    if (!Reflect.has(other, key)) {
      result[key] = left

      continue
    }

    const right = Reflect.get(other, key)

    if (isObject(left) && isObject(right)) {
      result[key] = mergeObjects(left, right)

      continue
    }

    result[key] = right
  }

  return result
}

// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

export interface Mem {
  json: any
  set: (key: string, value: any, ttl: number) => any
  del: (key: string) => void
  get: (key: string, defaut: any) => any
}

interface Data {
  expiration: number
  value: any
}

export function mem (callback: Function): Mem {
  const mutate = (key: string, value?: any): any =>
    typeof callback === 'function'
      ? queueMicrotask(() => callback(key, value))
      : null

  const n = new Map<string, Data>()

  return {
    json: () => Array.from(n.entries()),

    set: (key: string, value: any, ttl = 0) =>
      n.set(key, {
        value,
        expiration: ttl !== 0 ? new Date().getTime() + (+ttl) : 0
      }),

    del: (key: string): void => {
      return n.delete(key) && mutate(key, null)
    },

    get: (key: string, defaut = undefined): any => {
      if (!n.has(key)) return defaut

      if (n.get(key)?.expiration === 0) return n.get(key)?.value
      else if ((n.get(key)?.expiration ?? 0) > new Date().getTime()) return n.get(key)?.value
      else n.delete(key)

      mutate(key, null)

      return defaut
    }

  }
}

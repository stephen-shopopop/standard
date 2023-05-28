// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { warn } from '../utils'

export interface Make {
  sub: (topic: string, callback: Function) => void
  pub: (topic: string, ...data: any) => void
  unsub: (topic: string, fn?: Function) => void
}

/**
 * Make channel
 * @param maxSubscribers
 * @returns
 */
export function make (maxSubscribers = 20): Make {
  const limit = +maxSubscribers - 1

  const n = new Map<string, Function[]>()

  return {
    /**
     * Subscribe to an topic
     * @param topic
     * @param callback
     * @returns
     */
    sub: (topic: string, callback: Function): void => {
      if (typeof callback !== 'function') return

      const i = n.get(topic) ?? []

      if (i.length > limit) return

      (i.length > 0 && i.push(callback)) || n.set(topic, [callback])
    },
    /**
     * Publish event to topic
     * @param topic
     * @param data
     */
    pub: (topic: string, ...data: any): void => {
      queueMicrotask(() => {
        const i = (n.get(topic) ?? [])
          .slice()
          .map(fn => fn(data))
          .length

        if (i > limit) {
          warn('(channel) Possible channel memory leak detected. %d subscribers added maxSubscribers to increase limit', i)
        }
      })
    },

    /**
     * Unsubscribe to an topic
     * @param topic
     * @param fn
     */
    unsub: (topic: string, fn?: Function): void => {
      fn ?? n.delete(topic)

      const i = n.get(topic)

      if ((fn != null) && i != null) while (i.includes(fn)) i.splice(i.indexOf(fn), 1)
    }
  }
}

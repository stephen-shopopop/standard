// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { jsonbuffer } from '../deps'

export const jsonb = {
  serialize: jsonbuffer.stringify,
  deserialize: jsonbuffer.parse
}

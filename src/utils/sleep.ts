// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { promisify } from 'util'

export const sleep = promisify(setTimeout)

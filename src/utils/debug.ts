// Copyright 2021-2022 Shopopop. All rights reserved. ISC license.

import { Console } from 'console'

const console = new Console({ stdout: process.stdout, stderr: process.stderr })

export const debug = console.debug
export const warn = console.warn

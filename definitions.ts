// Source - https://stackoverflow.com/a/44386122
// Posted by Akshar Patel
// Retrieved 2026-08-24, License - CC BY-SA 3.0

import { type Request } from "express"
export interface extRequest extends Request {
  user?: string // or any other type
}

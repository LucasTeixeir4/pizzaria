import { Request } from 'express';
declare namespace Express {
    export interface Request extends Express.Request {
        user_id: string
    }
}


declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}

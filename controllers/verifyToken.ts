import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken'

export const vetifyToken = function (req: any, res:Response, next: NextFunction) {
  const token = req.cookies.auth

  if (token) {
    const verified = jwt.verify(token, 'Aaaaaaa')
    req.user = verified
  } else {
    req.user = false
  }
  next()
};

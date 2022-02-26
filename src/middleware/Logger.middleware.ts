import { NextFunction, Request, Response } from "express";

const Logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

export default Logger;

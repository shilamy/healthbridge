import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;

    if (!roles.includes(userRole)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};

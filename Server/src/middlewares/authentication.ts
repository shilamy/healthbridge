import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../utils/jwtUtils';
import { UserRole } from '../utils/roles';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['sessionId'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const user = decodeToken(token);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user as  { id: string; role: UserRole };
    next();
}

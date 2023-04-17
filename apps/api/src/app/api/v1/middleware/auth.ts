import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
}

interface DecodedToken {
  // Define the properties of the decoded JWT token
  // For example:
  userId: number;
  iat: number;
  exp: number;
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // No token found, send 401 Unauthorized response
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded: DecodedToken | undefined) => {
      if (err || !decoded) {
        // Invalid token, send 401 Unauthorized response
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        const currentTime: number = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          // Token has expired, send 401 Unauthorized response
          return res.status(401).json({ message: 'Unauthorized' });
        } else {
          // Token is valid and not expired, add decoded token to request object and proceed to next middleware
          next();
        }
      }
    }
  );
}

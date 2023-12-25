import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (id: string): string => {
    return jwt.sign({ id }, process.env.SECRET_KEY || 'jwt', {
        expiresIn: process.env.EXPIRES_IN,
    });
};

export const verifyToken = (token: string): JwtPayload | null => {
    const key = process.env.SECRET_KEY as string;
    const decode = jwt.verify(token, key);
    if (typeof decode === 'string') return null;
    return decode;
};

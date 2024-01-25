import { randomBytes } from 'crypto';
const secret = randomBytes(32).toString('hex');

export const jwtConstants = {
    secret: secret,
};

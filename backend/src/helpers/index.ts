import crypto from "crypto";
export const random = () => crypto.randomBytes(128).toString("base64");

const SECRET = 'IF-YOU-SEE-SEE-THIS-IN-PRODUCTION-SHOOT-ARTTU-KORPELA'
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

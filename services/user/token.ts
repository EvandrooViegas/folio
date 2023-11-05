import env from "../env";
import * as jose from "jose"



type AuthJWTClaims = {
  id: string
} | undefined
const createAuthJWT = async (id: string | undefined | null) => {
  if (!id) return;
  const secret = env.jwtSecret;
  if (!secret) return;
  const encodedSecret = new TextEncoder().encode(secret)
  const alg = 'HS256'
  const jwt = await new jose.SignJWT({ id })
  .setProtectedHeader({ alg })
  .setExpirationTime(24 * 30+"h") // 1 month
  .sign(encodedSecret)
  return jwt
};

const readAuthJWT = async (token: string | undefined) => {
  if(!token) return
  const secret = env.jwtSecret;
  if (!secret) return;
  const encodedSecret = new TextEncoder().encode(secret)
  const { payload } = await jose.jwtVerify(token, encodedSecret)
  return payload as AuthJWTClaims
};

export { createAuthJWT, readAuthJWT };

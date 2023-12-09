import env from "../env";
import * as jose from "jose"
import { AUTH_COOKIE_TOKEN_EXP } from "./config";


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
  .setExpirationTime(AUTH_COOKIE_TOKEN_EXP) // 1 month
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

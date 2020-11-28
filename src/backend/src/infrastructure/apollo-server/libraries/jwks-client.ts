import jwt, { Algorithm, GetPublicKeyOrSecret } from 'jsonwebtoken';
import jwksClient, { CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const client = jwksClient({
  jwksUri: process.env.AUTH0_JWKS_URI!,
});

const getKey: GetPublicKeyOrSecret = (header, cb) => {
  client.getSigningKey(header.kid!, function (err, key) {
    const signingKey = (key as CertSigningKey).publicKey || (key as RsaSigningKey).rsaPublicKey;
    cb(null, signingKey);
  });
};

const options = {
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'] as Algorithm[],
};

type AccessToken = {
  sub: string;
  [key: string]: string;
};
type VerifyTokenWithJwksFunc = (token: string) => Promise<{ error?: Error; decoded?: AccessToken }>;

export const verifyTokenWithJwks: VerifyTokenWithJwksFunc = async (token) =>
  new Promise((resolve, _reject) => {
    jwt.verify(token, getKey, options, (error, decoded) => {
      if (error) {
        resolve({ error });
      }
      if (decoded) {
        resolve({ decoded: decoded as AccessToken });
      }
    });
  });

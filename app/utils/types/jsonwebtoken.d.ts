declare module 'jsonwebtoken' {
  export interface JwtPayload {
    [key: string]: any;
  }

  export interface SignOptions {
    algorithm?: string;
    expiresIn?: string | number;
    notBefore?: string | number;
    audience?: string | string[];
    subject?: string;
    issuer?: string;
    jwtid?: string;
    noTimestamp?: boolean;
    header?: object;
    encoding?: string;
  }

  export interface VerifyOptions {
    algorithms?: string[];
    audience?: string | string[];
    clockTolerance?: number;
    issuer?: string | string[];
    ignoreExpiration?: boolean;
    ignoreNotBefore?: boolean;
    subject?: string;
    clockTimestamp?: number;
    nonce?: string;
    maxAge?: string;
  }

  export interface DecodeOptions {
    complete?: boolean;
    json?: boolean;
  }

  export interface JwtHeader {
    alg: string;
    typ?: string;
    kid?: string;
  }

  export interface SigningKeyCallback {
    (err: Error | null, signingKey?: Secret): void;
  }

  export interface GetPublicKeyOrSecret {
    (header: JwtHeader, callback: SigningKeyCallback): void;
  }

  export type Secret = string | Buffer | { key: string | Buffer; passphrase: string };

  export function sign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions): string;

  export function verify<T extends JwtPayload>(token: string, secretOrPublicKey: Secret | GetPublicKeyOrSecret, options?: VerifyOptions): T;

  export function decode<T extends JwtPayload>(token: string, options?: DecodeOptions): T | null;

  export function isValidSignature(token: string, secretOrPublicKey: Secret): boolean;
}

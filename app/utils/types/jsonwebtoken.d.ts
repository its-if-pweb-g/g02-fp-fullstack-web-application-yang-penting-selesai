declare module 'jsonwebtoken' {
    export interface JwtPayload {
      [key: string]: any;
    }
  
    export interface SignOptions {
      algorithm?: string;
      expiresIn?: string | number;
      issuer?: string;
      audience?: string;
      jwtid?: string;
      notBefore?: string | number;
      subject?: string;
      keyid?: string;
      header?: object;
      noTimestamp?: boolean;
    }
  
    export interface VerifyOptions {
      algorithms?: string[];
      audience?: string | string[];
      clockTolerance?: number;
      issuer?: string | string[];
      ignoreExpiration?: boolean;
      subject?: string;
      complete?: boolean;
      json?: boolean;
      maxAge?: string;
    }
  
    export function sign(payload: string | object | Buffer, secretOrPrivateKey: string | Buffer, options?: SignOptions): string;
  
    export function verify<T extends JwtPayload>(token: string, secretOrPublicKey: string | Buffer, options?: VerifyOptions): T;
  
    export function decode<T extends JwtPayload>(token: string, options?: object): T | null;
  
    export function isValidSignature(token: string, secretOrPublicKey: string | Buffer): boolean;
  }
  
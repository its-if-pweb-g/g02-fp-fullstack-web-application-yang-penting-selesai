declare module "js-cookie" {
    interface CookieAttributes {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    }
  
    interface Cookies {
      get(name: string): string | undefined;
      getJSON<T>(name: string): T | undefined;
      set(name: string, value: string | object, options?: CookieAttributes): void;
      remove(name: string, options?: CookieAttributes): void;
      withAttributes(options: CookieAttributes): Cookies;
    }
  
    const Cookies: Cookies;
  
    export default Cookies;
}  
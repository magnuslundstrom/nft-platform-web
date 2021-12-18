declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_TARGET_ENV: 'dev' | 'staging' | 'prod';
  }
}

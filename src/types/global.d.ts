declare namespace NodeJS {
  export interface ProcessEnv {
    TARGET_ENV: 'dev' | 'staging' | 'prod';
  }
}

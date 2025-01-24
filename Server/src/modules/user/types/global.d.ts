declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_SERVER: string;
      SMTP_USER: string;
      SMTP_KEY: string;
      SMTP_SENDER: string;
    }
  }
}

export {};

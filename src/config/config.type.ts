export type DatabaseConfig = {
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
}
export type AppConfigType = {
    nodeEnv: string;
    name: string;
    workingDirectory?: string;
    frontendDomain?: string;
    backendDomain?: string;
    port: number;
    apiPrefix?: string;
    fallbackLanguage?: string;
    headerLanguage?: string;
  }
  export type AuthConfig = {}

  
  
  export type DatabaseConfigType = {
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
    maxConnections: number;
    sslEnabled?: boolean;
    rejectUnauthorized?: boolean;
    ca?: string;
    key?: string;
    cert?: string;
  }
  
  export type BotConfigType = {
    token: string;
  }
  export type AllConfigType = {
    app: AppConfigType;
    auth: AuthConfig;
    database: DatabaseConfigType;
    bot: BotConfigType;
  }
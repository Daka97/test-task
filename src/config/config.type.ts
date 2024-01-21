export type DatabaseConfig = {
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
}

export type AppConfig = {
    nodeEnv: string;
    name: string;
    port: number;
};
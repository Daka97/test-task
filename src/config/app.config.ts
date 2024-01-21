import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';


export default registerAs<AppConfig>('app', () => {
  
    return {
      nodeEnv: process.env.NODE_ENV || 'development',
      name: process.env.APP_NAME || 'app',
      port: process.env.APP_PORT
        ? parseInt(process.env.APP_PORT, 10)
        : process.env.PORT
          ? parseInt(process.env.PORT, 10)
          : 3000,
    };
  });
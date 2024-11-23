import path from 'path';
import {CorsOptions} from 'cors';
import { configDotenv } from 'dotenv';

const envFile = process.env['NODE_ENV']
  ? `.${process.env['NODE_ENV']}.env`
  : '.env';

configDotenv({ path: envFile });

const rootPath = __dirname;

const corsWhitelist = ['http://localhost:5173', 'http://localhost:5183', 'http://165.227.144.15'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const config = {
  port: process.env['PORT'] || 8000,
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: process.env['MONGO_DB_URL'] || 'mongodb://localhost/shop',
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  }
};

export default config;
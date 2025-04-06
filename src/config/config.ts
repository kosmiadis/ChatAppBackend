import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongodb_uri: string;
    origin_url: string;
    jwt_secret: string;
}

const AppConfig: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodb_uri: String(process.env.MONGODB_URI),
    origin_url: String(process.env.ORIGIN_URl),
    jwt_secret: String(process.env.JWT_SECRET),
}

export default AppConfig;
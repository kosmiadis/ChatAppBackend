import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongodb_uri: string;
}

const AppConfig: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodb_uri: String(process.env.MONGODB_URI)
}

export default AppConfig;
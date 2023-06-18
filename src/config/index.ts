import dotenv from 'dotenv';
dotenv.config();

export const { APP_NAME, APP_PORT, TELEGRAM_BOTTOKEN, MONGO_CONNECT_URL } =
	process.env;
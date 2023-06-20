import dotenv from 'dotenv';
dotenv.config();

export const { APP_NAME, APP_PORT, TELEGRAM_BOTTOKEN, MONGO_CONNECT_URL, IMDB_BASEURL, IMDB_KEY, IMDB_HOST } =
	process.env;

import axios from "axios";
import { IMDB_BASEURL, IMDB_HOST, IMDB_KEY } from "../config";

export default async function findMovies(query: string) {
	const options = {
		method: "GET",
		url: `${IMDB_BASEURL}/title/v2/find`,
        params: { title: query, limit: 5, sortArg: 'moviemeter, asc' },
		headers: {
			"X-RapidAPI-Key":
				IMDB_KEY,
			"X-RapidAPI-Host": IMDB_HOST
        },
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
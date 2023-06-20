import { Context, Scenes} from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";
import findMovies from "../utils/findMovies";

export const searchScene = new Scenes.BaseScene<Scenes.SceneContext>("search");

searchScene.enter(async (ctx: Context) => {
     const message = `💫 Powering up the cosmic search portal! Just beam the title into the text field and let the adventure begin!

And hey, for a pinpoint star-map to your movie, throw in the year encased in brackets like this: star wars [2003]. Or plot in an IMDB_ID using this format: tt5433138. Happy space-surfing! 🚀`;

		await ctx.reply(message);
})

searchScene.on("text", async (ctx: Context) => {
    if(ctx.message && "text" in ctx.message) {
        const userQuery = ctx.message.text;
        console.log(userQuery);
        const matchedResults = await findMovies(userQuery as string);
        const matchedMovies = [];
        for(const item of matchedResults.results) {
            if(item.titleType === "movie")
                matchedMovies.push(item);
        }
        for (const i of matchedMovies) {
			console.log(i.title, "---", i.year);
		}
        ctx.reply("DONE")
    }
})
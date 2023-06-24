import { Context, Markup, Scenes} from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";
import findMovies from "../utils/findMovies";

interface MySceneSession extends Scenes.SceneSession {
	matchedMovies?: Array<any>;
    messageId?: number;
}
interface MySceneContext extends Scenes.SceneContext {
	session: MySceneSession;
}

export const searchScene = new Scenes.BaseScene<MySceneContext>("search");

searchScene.enter(async (ctx: Context) => {
     const message = `💫 Powering up the cosmic search portal! Just beam the title into the text field and let the adventure begin!

And hey, for a pinpoint star-map to your movie, throw in the year encased in brackets like this: star wars [2003]. Or plot in an IMDB_ID using this format: tt5433138. Happy space-surfing! 🚀`;

		await ctx.reply(message);
})

searchScene.on("text", async (ctx: MySceneContext) => {
	if (ctx.message && "text" in ctx.message) {
		const userQuery = ctx.message.text;
		const matchedResults = await findMovies(userQuery as string);
		const matchedMovies = [];
		for (const item of matchedResults.results) {
			if (item.titleType === "movie") matchedMovies.push(item);
		}

		let movieCounter = -1;
		const sentMessage = await ctx.reply(
			"Please select the movie you want to add to your list.",
			Markup.inlineKeyboard(
				matchedMovies.map((i) => {
					movieCounter++;
					return [
						Markup.button.callback(
							`${i.title} [${i.year}]`,
							`selectedMovie_${movieCounter}`
						),
					];
				})
			)
		);
        ctx.session.messageId = sentMessage.message_id;
		ctx.session.matchedMovies = matchedMovies;
	}
});

searchScene.action(/selectedMovie_(.*)/, async (ctx: MySceneContext) => {
    ctx.answerCbQuery('Getting the details of the selected movie...');
	if (ctx && "match" in ctx && Array.isArray(ctx.match)) {
		const movieIndex = parseInt(ctx.match[0].split("_")[1]);
		if (ctx.session.matchedMovies && ctx.session.matchedMovies.length > 0 && ctx.session.messageId) {
			const selectedMovie = ctx.session.matchedMovies[movieIndex];

            if ( 'callback_query' in ctx.update && ctx.update.callback_query.message) {
				const chatId = ctx.update.callback_query.message.chat.id;
				const messageId = ctx.update.callback_query.message.message_id;

				await ctx.telegram.deleteMessage(chatId, messageId);
			}

            const sentMessage = await ctx.replyWithPhoto(selectedMovie.image.url, {
				caption: `You have selected: ${selectedMovie.title}`,
				reply_markup: {
					inline_keyboard: [
						[
							Markup.button.callback("Add", "ADD_ACTION"),
							Markup.button.callback(
								"Search Again",
								"SEARCH_AGAIN_ACTION"
							),
						],
					],
				},
			});

            ctx.session.messageId = sentMessage.message_id;
		}
	}
});

searchScene.action('ADD_ACTION', async (ctx: MySceneContext) => {
    ctx.answerCbQuery("Adding to your list...");
    if ("callback_query" in ctx.update && ctx.update.callback_query.message) {
		const chatId = ctx.update.callback_query.message.chat.id;
		const messageId = ctx.update.callback_query.message.message_id;

		await ctx.telegram.deleteMessage(chatId, messageId);
	}

    // TODO: check if the movie has been already released

    // TODO: check if the user has already added the movie to the list

    // TODO: if not already in the list, add the movie to the list
    await ctx.reply("The movie is added to your list.");
	return searchScene.leave();
})

searchScene.action('SEARCH_AGAIN_ACTION', async (ctx: MySceneContext) => {
    ctx.answerCbQuery('Searching again..')
    if ("callback_query" in ctx.update && ctx.update.callback_query.message) {
		const chatId = ctx.update.callback_query.message.chat.id;
		const messageId = ctx.update.callback_query.message.message_id;

		await ctx.telegram.deleteMessage(chatId, messageId);
	}
    await ctx.scene.reenter();
})
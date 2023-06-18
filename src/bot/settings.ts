import { Context } from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";

export default async function settings(ctx: Context) {
    await ctx.reply("I am fetching your details..");
    
    if ('message' in ctx.update) {
        const { id, is_bot, first_name, last_name, username, language_code } =
			ctx.update.message.from;
		const message = `First name: ${first_name} \nLast name: ${last_name} \nUsername: ${username}`;
		await ctx.reply(message);
    }

	return await mainKeyboard(ctx);
}
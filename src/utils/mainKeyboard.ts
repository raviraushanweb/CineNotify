import { Context, Markup } from "telegraf";

export default async function mainKeyboard(
	ctx: Context,
	message = "Welcome to CineNotify! How can I assist you today?"
) {
	await ctx.reply(
		message,
		Markup.keyboard([
			["🔍 Search", "🎥 My collection"],
			["🛠️ Settings", "🙋‍♂️ About"],
			["📂 Request feature", "📩 Contact"],
		])
			.oneTime()
			.resize()
	);
}
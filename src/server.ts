import { Telegraf, Markup, Context, Scenes, session } from "telegraf";
import mongoose from "mongoose";
import { contactScene } from "./bot/contact";
import { featureRequestScene } from "./bot/featureRequest";
import {searchScene} from "./bot/search";

import {
	APP_PORT,
	APP_NAME,
	TELEGRAM_BOTTOKEN,
	MONGO_CONNECT_URL,
} from "./config";
import about from "./bot/about";
import mainKeyboard from "./utils/mainKeyboard";
import settings from "./bot/settings";


interface MyContext extends Scenes.SceneContext {}

const bot = new Telegraf<MyContext>(TELEGRAM_BOTTOKEN as string);
const stage = new Scenes.Stage<MyContext>([contactScene, featureRequestScene, searchScene], {
	ttl: 10,
});

bot.use(session());
bot.use(stage.middleware());

async function connect() {
	try {
		if (!MONGO_CONNECT_URL) {
			throw new Error("MONGO_CONNECT_URL must be defined.");
		}
		await mongoose.connect(MONGO_CONNECT_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
	}
}

connect();

bot.start( async (ctx) =>
	{
		const {id, is_bot, first_name, last_name, username, language_code} = ctx.update.message.from;
		const userInfo = {first_name, last_name, username, language_code};
		// TODO: store the user details in the DB
		await mainKeyboard(ctx);
	}
);

bot.hears("🔍 Search", (ctx: MyContext) => ctx.scene.enter("search"));
bot.hears("🎥 My collection", async (ctx) => {
	await ctx.reply("You clicked on My collection!");
});
bot.hears("🛠️ Settings", settings);
bot.hears("🙋‍♂️ About", about);
bot.hears("📩 Contact", (ctx: MyContext) => ctx.scene.enter("contact"));
bot.hears("📂 Request feature", (ctx: MyContext) =>
	ctx.scene.enter("featureRequest")
);


bot.use(Telegraf.log());

bot.launch();
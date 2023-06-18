import { Scenes, Markup, Context } from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";

export const contactScene = new Scenes.BaseScene<Scenes.SceneContext>("contact");

contactScene.enter((ctx: Context) => ctx.reply("Please enter your message:"));
contactScene.on("text", async (ctx: Context) => {
	if (ctx.message && "text" in ctx.message) {
		const userMessage = ctx.message.text;
		console.log("User's message:", userMessage);

        // TODO: store this message in DB along with user's username and userid

        await mainKeyboard(
			ctx,
			"Thank you for your message!!!"
		);
		return contactScene.leave();
	}
});

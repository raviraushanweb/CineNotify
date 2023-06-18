import { Scenes, Markup, Context } from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";

export const featureRequestScene = new Scenes.BaseScene<Scenes.SceneContext>(
	"featureRequest"
);

featureRequestScene.enter((ctx: Context) =>
	ctx.reply(
		"🚀 Wow, you've got a feature idea? We're all ears! 🎉 Please send us your brilliant suggestion in a single message. We can't wait to hear what you have in mind. Let's make CineNotify even better together!"
	)
);
featureRequestScene.on("text", async (ctx: Context) => {
	if (ctx.message && "text" in ctx.message) {
		const userMessage = ctx.message.text;
		console.log("User's message:", userMessage);

		// TODO: store this feature request in DB along with user's username and userid

		await mainKeyboard(ctx, "Thank you for sharing the idea!!!");
		return featureRequestScene.leave();
	}
});

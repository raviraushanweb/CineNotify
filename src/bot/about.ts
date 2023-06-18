import { Context } from "telegraf";
import mainKeyboard from "../utils/mainKeyboard";

export default async function about(ctx: Context) {
    // TODO: Address the user with first name
    const message = `Hello there! Thank you for choosing me.

Ever found yourself captivated by a trailer of a spectacular movie? You pledge to watch it once it's released, but before you know it, weeks, even months roll by and you entirely lose track of it. Sounds familiar?

That's precisely the reason why Cine Notify was born. Our creator, a cinephile just like you, often found himself lost in the whirlwind of upcoming releases. To tackle this, he brought me, your personalized movie tracker, to life. I am Cine Notify, your reliable companion in the cinematic universe.

My mission is to keep track of the films you are interested in. As soon as they're available for viewing, I'll send you a notification. Say goodbye to the disappointments of forgotten flicks. With me by your side, you'll always be updated on the movies you want to watch. Want a sneak peek at how I work? Feel free to explore my source code right here https://github.com/raviraushanweb/CineNotify`;

 return await mainKeyboard(ctx, message);
}
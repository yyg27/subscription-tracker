import User from "../models/user.model.js";

export const handleWebhook = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Telegram expects a 200 OK response immediately, otherwise it retries
    if (!message || !message.text) {
      return res.status(200).send("OK");
    }

    const chatId = message.chat.id;
    const text = message.text;

    // Handle deep linking: /start <userId>
    if (text.startsWith("/start ")) {
      const userId = text.split(" ")[1];

      if (userId && userId.length === 24) { // Basic MongoDB ObjectId validation
        const user = await User.findById(userId);
        if (user) {
          user.telegramId = chatId.toString();
          await user.save();

          // Send confirmation message
          if (process.env.TELEGRAM_BOT_TOKEN) {
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                chat_id: chatId, 
                text: "Successfully connected to SubTrack. You will now receive your subscription reminders here." 
              })
            });
          }
        }
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    res.status(200).send("OK"); // Always return 200 to Telegram
  }
};

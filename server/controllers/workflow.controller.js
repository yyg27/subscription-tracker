import dayjs from "dayjs"; // import dayjs package
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import { sendEmail } from "../utilities/send.email.js";

const reminders = [7, 5, 2, 1]; //reminder days

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;
  
  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}`);
    return;
  }

  for (const daysBefore of reminders) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `${daysBefore} days`, reminderDate);
    }

    await triggerReminder(context, `${daysBefore} days`, subscription);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async() => {
    return Subscription.findById(subscriptionId).populate("user", "name email telegramId");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    
    // Email Reminder
    await sendEmail({
      to: subscription.user.email,
      type: `${label} remaining`,
      subs: subscription,
    });

    // Telegram Reminder
    if (subscription.user.telegramId && process.env.TELEGRAM_BOT_TOKEN) {
      const msg = `Reminder: Your subscription to ${subscription.name} (${subscription.price} ${subscription.currency}) renews in ${label}.`;
      try {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: subscription.user.telegramId, text: msg })
        });
        console.log("Telegram reminder sent");
      } catch (err) {
        console.log("Error sending Telegram reminder", err);
      }
    }
  });
};
   
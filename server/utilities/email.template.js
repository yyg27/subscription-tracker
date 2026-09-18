//Making an email template using html
export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  daysLeft
}) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333;">Hello ${userName},</h2>
    <p>This is a reminder that your <strong>${subscriptionName}</strong> subscription (${planName}) is renewing in <strong>${daysLeft} days</strong>.</p>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 5px 0;"><strong>Renewal Date:</strong> ${renewalDate}</p>
      <p style="margin: 5px 0;"><strong>Price:</strong> ${price}</p>
      <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethod || "Default Method"}</p>
    </div>
    <p>If you wish to cancel or modify your subscription, please log into your account before the renewal date.</p>
    <br/>
    <p>Best regards,<br/>Subscription Tracker Team</p>
  </div>
`;
//Making templates for each day of our reminder 
export const emailTemplates = [
  {
    label: "7 days remaining",
    generateSubject: (data) =>
      `${data.subscriptionName} Renews in 7 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days remaining",
    generateSubject: (data) =>
      ` ${data.subscriptionName} Renews in 5 Days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days remaining",
    generateSubject: (data) =>
      `${data.subscriptionName} Renews in 2 days`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days remaining",
    generateSubject: (data) =>
      `${data.subscriptionName} Renews Tomorrow!!!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];

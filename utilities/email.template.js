//Making an email template using html
export const generateEmailTemplate = ({
 
}) => `HELLO THIS IS AN EMAIL TEMPLATE HELLOOO GROUND CONTROL TO MAJOR TOM`;


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

import dayjs from "dayjs";
import {emailTemplates} from "./email.template.js"
import transporter,{ accountEmail } from "../config/nodemailer.js";

export const sendEmail = async ({to,type,subs}) =>{
    if(!to || !type) throw new Error("Missing parameters");

    const template = emailTemplates.find((t) => t.label === type);

    if(!template) throw new Error("Email type is not recognized");

    const mailInfo = {
        userName:subs.user.name,
        subscriptionName:subs.name,
        renewalDate:dayjs(subs.renewalDate).format("DD/MM/YYYY"),
        planName:subs.name,
        price:`${subs.price} ${subs.currency} (${subs.frequency})`,
        paymentMethod:subs.payment,
    }
    
    const msg = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject:subject,
        html:msg,

    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error) return console.log(error,"Error sending email")
            
    })
}
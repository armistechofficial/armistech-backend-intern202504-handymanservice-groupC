import nodemailer from "nodemailer";
import 'dotenv/config';

export const mailSender = async (email, title, body) =>{
    try{
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            to: email,
            subject: title,
            html: body,
        });
        console.long("Email info: ", info);
    }catch(error){
        console.log(error.message);
    }
}
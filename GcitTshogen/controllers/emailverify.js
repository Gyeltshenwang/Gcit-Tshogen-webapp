// import nodemailer from 'nodemailer';
// export const verifyMail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             service: process.env.SERVICE,
//             post: Number(process.env.EMAIL_PORT),
//             secure: Boolean(process.env.SECURE),
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASS,
//                 subject: subject,
//                 text:text
//             }
           
//         });
//         await transport.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject
//         });
//         console.log('email successfuly send')
//     } catch (error) {
//         console.log('Email not sent');
//         console.log(error);
//     }
    
// }
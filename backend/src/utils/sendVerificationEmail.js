import { sendMail } from "./sendMail.js";

export async function sendVerificationEmail(user) {
  console.log("send mail to", user.email);
  return sendMail(
    user.email,
    "please verify your account",
    `Hello ${user.user_name} , please verify your account by entering this 6 digit code: ${user.sixDigitCode}`
  );
}

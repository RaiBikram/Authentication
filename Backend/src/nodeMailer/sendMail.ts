import { nodemailerTransport, sender } from "./config";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: number | null
) => {
  try {
    await nodemailerTransport.sendMail({
      from: sender,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Your verification code is: <strong>${verificationToken}</strong></p>`,
    });
    // console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const response = nodemailerTransport.sendMail({
      from: sender,
      to: email,
      subject: "Successfully verified your Email",
      html: `<p>Welcome to Our Platform: <strong>${name}</strong></p>`,
    });
    // console.log("Email sent successfully :", response);
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: number | null
) => {
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is defined properly
      to: email,
      subject: "Reset your Password",
      html: `<p>Your verification code is: <strong>${resetToken}</strong></p>`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendResetSuccessEmail = async (email: string, name: string) => {
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is defined properly
      to: email,
      subject: "Password Reset Successful",
      html: `<p> <strong>${name}</strong> Your Password Successfully Reset, pleaes login </p>`,
    });
    // console.log("sendresetsuccessemail", response);
  } catch (error) {
    console.error(error);
  }
};
export const userProfileUploadWelcome = async (email: string, name: string) => {
  try {
    const response = await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is defined properly
      to: email,
      subject: "Password Reset Successful",
      html: `<p><strong>${name}</strong> Your Profile picture uploaded successfully </p>`,
    });
    // console.log("sendresetsuccessemail", response);
  } catch (error) {
    console.error(error);
  }
};

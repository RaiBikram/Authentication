import { nodemailerTransport, sender } from "./config";

export const sendVerificationEmail = async (
  name: string,
  email: string,
  verificationToken: string
) => {
  try {
    const verificationLink = `${process.env.CLIENT_URI}/verify-email/${verificationToken}`;

    await nodemailerTransport.sendMail({
      from: sender,
      to: email,
      subject: "Verify Your Email",
      html: `
        <p>Hey <strong>${name}</strong>,</p>
        <p>click the link below to verify your email:</p>
        <a href="${verificationLink}" style="color: blue; text-decoration: underline;">Verify Email</a>
      `,
    });
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
      html: `
      <p>Hey <strong>${name} <strong> </p><p>Welcome to Our Platform</p>`,
    });
    // console.log("Email sent successfully :", response);
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  resetToken: string
) => {
  try {
    const resetLink = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;

    await nodemailerTransport.sendMail({
      from: sender, // Ensure 'sender' is properly defined
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hey <strong>${name}</strong>,</p>
        <p>click the link below to reset your password:</p>
        <a href="${resetLink}" style="color: blue; text-decoration: underline;">Reset Password</a>
        <p>If you didn’t request this, you can safely ignore this email.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
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

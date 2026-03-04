import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed." });
  }

  const { name, email, phone, message } = req.body as ContactPayload;

  // Validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Full name is required." });
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return res
      .status(400)
      .json({ success: false, message: "A valid email address is required." });
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Message must be at least 10 characters.",
    });
  }

  const sanitizedName = name.trim().slice(0, 100);
  const sanitizedEmail = email.trim().slice(0, 200);
  const sanitizedPhone = phone ? String(phone).trim().slice(0, 20) : "Not provided";
  const sanitizedMessage = message.trim().slice(0, 5000);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const companyEmail =
      process.env.COMPANY_EMAIL || "info@spireitco.com";

    await transporter.sendMail({
      from: `"Spire Infotech Website" <${process.env.SMTP_USER}>`,
      to: companyEmail,
      replyTo: sanitizedEmail,
      subject: `New Contact Form Submission from ${sanitizedName}`,
      text: [
        `Name: ${sanitizedName}`,
        `Email: ${sanitizedEmail}`,
        `Phone: ${sanitizedPhone}`,
        ``,
        `Message:`,
        sanitizedMessage,
      ].join("\n"),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1FC7C7, #0e6262); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Spire Infotech Website</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 10px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #1F2A30; font-weight: 600;">${sanitizedName}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${sanitizedEmail}" style="color: #1FC7C7;">${sanitizedEmail}</a></td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #1F2A30;">${sanitizedPhone}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1F2A30; white-space: pre-wrap;">${sanitizedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
              </tr>
            </table>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
            This email was sent via the contact form on spireitco.com
          </p>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Failed to send your message. Please try again later or contact us directly.",
    });
  }
}

// pages/api/send-confirmation-email.ts

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
// ==============================
// OAuth2 Configuration
// ==============================
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});
// ==============================
// Email Template
// ==============================
const createEmailTemplate = (type: 'appointment' | 'career' | 'volunteer' | 'partner', name: string, preferredDate?: string, preferredTime?: string, positionApplied?: string) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  if (type === 'partner') {
    // Partner email content
    return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Partnership Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for your interest in partnering with <strong>Heal Well Hospital</strong>.</p>
        <p>We are excited about the possibility of collaborating and will reach out shortly with further details.</p>
        <p>If you have any questions or would like to provide additional information, please feel free to contact us.</p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="https://heal-well-brown.vercel.app/" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 0.9em; text-align: center; color: #555;">
          Heal Well Hospital | Contact Us: +1 (123) 456-7890 | https://heal-well-brown.vercel.app/
        </p>
      </div>
    `;
  }

  if (type === 'appointment') {
    // Appointment email content
    return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Appointment Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for scheduling your appointment with <strong>Heal Well Hospital</strong>. We are pleased to confirm your appointment details as follows:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(preferredDate!)}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${preferredTime}</td>
          </tr>
        </table>
        <p>Please ensure you arrive at least <strong>15 minutes</strong> prior to your scheduled time. If you have any questions or need to reschedule, feel free to contact our support team.</p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="https://heal-well-brown.vercel.app/" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 0.9em; text-align: center; color: #555;">
          Heal Well Hospital | Contact Us: +1 (123) 456-7890 | https://heal-well-brown.vercel.app/
        </p>
      </div>
    `;
  } else if (type === 'career') {
    // Career email content
    return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Career Application Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for applying for the position of <strong>${positionApplied}</strong> at Heal Well Hospital.</p>
        <p>We have received your application and will review it. You will be contacted shortly with further details.</p>
        <p>If you have any questions, please don't hesitate to reach out to us.</p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="https://heal-well-brown.vercel.app/" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 0.9em; text-align: center; color: #555;">
          Heal Well Hospital | Contact Us: +1 (123) 456-7890 | https://heal-well-brown.vercel.app/
        </p>
      </div>
    `;
  } else if (type === 'volunteer') {
    // Volunteer email content
    return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #007BFF; text-align: center;">Volunteer Confirmation</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for volunteering with <strong>Heal Well Hospital</strong>. We are thrilled to have you join us in making a positive impact.</p>
        <p>Your volunteer registration has been successfully received. We will reach out soon with more details about the upcoming volunteering opportunities and how you can contribute.</p>
        <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="https://heal-well-brown.vercel.app/" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 0.9em; text-align: center; color: #555;">
          Heal Well Hospital | Contact Us: +1 (123) 456-7890 | https://heal-well-brown.vercel.app/
        </p>
      </div>
    `;
  }
};
// ==============================
// API Handler
// ==============================
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  // Extract and validate request body
  const { email, name, type, preferredDate, preferredTime, positionApplied } = req.body;

  if (!email || !name || !type || 
    (type === 'appointment' && (!preferredDate || !preferredTime)) || 
    (type === 'career' && !positionApplied) || 
    (type === 'partner' && !name) || 
    (type === 'volunteer' && !name)) {  
  return res.status(400).json({ message: 'Missing required fields' });
}

  try {
    // Retrieve access token
    const accessToken = await oAuth2Client.getAccessToken();
    if (!accessToken.token) {
      throw new Error('Failed to retrieve access token');
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Prepare email content
    const emailContent = createEmailTemplate(type, name, preferredDate, preferredTime, positionApplied);

// Configure mail options with dynamic "from" field
const mailOptions = {
  from: (() => {
    if (type === 'appointment') {
      return `"Heal Well Hospital" <${process.env.EMAIL_USER}>`;
    } else if (type === 'volunteer') {
      return `"Heal Well Volunteer Team" <${process.env.EMAIL_USER}>`;
    } else if (type === 'career') {
      return `Heal Well Careers <${process.env.EMAIL_USER}>`;
    } else if (type === 'partner') {
      return `"Heal Well Partnerships" <${process.env.EMAIL_USER}>`;
    } else {
      throw new Error('Invalid email type');
    }
  })(),
  to: email,
  subject: (() => {
    if (type === 'appointment') {
      return 'Your Appointment Confirmation - Heal Well Hospital';
    } else if (type === 'volunteer') {
      return 'Volunteer Registration Confirmation - Heal Well Hospital';
    } else if (type === 'career') {
      return 'Career Application Confirmation - Heal Well Hospital';
    } else if (type === 'partner') {
      return 'Partnership Interest Confirmation - Heal Well Hospital';
    } else {
      throw new Error('Invalid email type');
    }
  })(),
  html: emailContent,
};

  // Send email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: 'Confirmation email sent successfully' });
  } catch (error: unknown) {
    // Error handling
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ message: 'Error sending confirmation email', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}
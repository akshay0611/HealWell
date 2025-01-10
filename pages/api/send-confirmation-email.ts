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

const createEmailTemplate = (name: string, preferredDate: string, preferredTime: string) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="color: #007BFF; text-align: center;">Appointment Confirmation</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for scheduling your appointment with <strong>HealWell Hospital</strong>. We are pleased to confirm your appointment details as follows:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formatDate(preferredDate)}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${preferredTime}</td>
        </tr>
      </table>
      <p>Please ensure you arrive at least <strong>15 minutes</strong> prior to your scheduled time. If you have any questions or need to reschedule, feel free to contact our support team.</p>
      <p style="text-align: center; margin-top: 30px;">
        <a href="https://www.healwellhospital.com" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 0.9em; text-align: center; color: #555;">
        HealWell Hospital | Contact Us: +1 (123) 456-7890 | www.healwellhospital.com
      </p>
    </div>
  `;
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
  const { email, name, preferredDate, preferredTime } = req.body;
  if (!email || !name || !preferredDate || !preferredTime) {
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
    const mailOptions = {
      from: `"HealWell Hospital" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Appointment Confirmation - HealWell Hospital',
      html: createEmailTemplate(name, preferredDate, preferredTime),
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
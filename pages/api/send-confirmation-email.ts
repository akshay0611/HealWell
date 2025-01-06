import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,      
  process.env.GOOGLE_CLIENT_SECRET, 
  process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground' 
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN, 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, preferredDate, preferredTime } = req.body;

  // Validate request body
  if (!email || !name || !preferredDate || !preferredTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Get the access token using the refresh token
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken.token) {
      throw new Error('Failed to retrieve access token');
    }

    // Create a transporter using OAuth2 authentication
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

    // Email options
    const mailOptions = {
      from: `"HealWell Team" <${process.env.EMAIL_USER}>`, 
      to: email,                                           
      subject: 'Appointment Confirmation',
      text: `Hello ${name},\n\nYour appointment has been successfully booked.\n\nDetails:\nDate: ${preferredDate}\nTime: ${preferredTime}\n\nThank you for choosing us.\n\nBest regards,\nHealWell Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Confirmation email sent successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ message: 'Error sending confirmation email', error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
}
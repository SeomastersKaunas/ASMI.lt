import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RATE_LIMIT_MS = 60_000;
const attempts = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = attempts.get(ip);
  if (last && now - last < RATE_LIMIT_MS) return true;
  attempts.set(ip, now);
  return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, phone, subject, message, clientEmail, website } = req.body;

  if (website) {
    return res.status(400).json({ message: 'Invalid submission' });
  }

  if (!name || !clientEmail || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!isValidEmail(clientEmail)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (
    String(name).length > 100 ||
    String(clientEmail).length > 254 ||
    String(message).length > 5000 ||
    (phone && String(phone).length > 50) ||
    (subject && String(subject).length > 200)
  ) {
    return res.status(400).json({ message: 'Input too long' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many submissions. Please wait a moment.' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ message: 'Email service configuration error' });
  }

  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailSubject = `New Contact Form Submission - ${escapeHtml(subject) || 'General inquiry'}`;
    const emailHtml = `
      <h2>Contact Form Message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(clientEmail)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p><strong>Subject:</strong> ${escapeHtml(subject) || 'General inquiry'}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: `ASMI Website <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER,
      replyTo: clientEmail,
      subject: emailSubject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

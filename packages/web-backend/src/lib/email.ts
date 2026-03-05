import nodemailer from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const emailPort = parseInt(process.env.EMAIL_PORT || '587');

    if (!emailUser || !emailPassword) {
      console.warn('⚠️  Email credentials not configured. Contact form will not work.');
      console.warn('   Set EMAIL_USER and EMAIL_PASSWORD in your .env file');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465, // true for 465, false for other ports
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

      console.log('✓ Email service initialized');
    } catch (error) {
      console.error('✗ Failed to initialize email service:', error);
    }
  }

  async sendContactForm(data: ContactFormData): Promise<void> {
    if (!this.transporter) {
      throw new Error('Email service not configured');
    }

    const { name, email, topic, message } = data;

    const mailOptions = {
      from: `"${name} via Ducky Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact Form: ${this.getTopicLabel(topic)}`,
      text: this.formatPlainText(data),
      html: this.formatHtml(data),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✓ Contact form email sent:', info.messageId);
    } catch (error) {
      console.error('✗ Failed to send contact form email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
    if (!this.transporter) {
      throw new Error('Email service not configured');
    }

    const mailOptions = {
      from: `"Ducky.wtf" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reset your password',
      text: this.formatPasswordResetPlainText(resetUrl),
      html: this.formatPasswordResetHtml(resetUrl),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✓ Password reset email sent:', info.messageId);
    } catch (error) {
      console.error('✗ Failed to send password reset email:', error);
      throw new Error('Failed to send email');
    }
  }

  private getTopicLabel(topic: string): string {
    const topics: Record<string, string> = {
      general: 'General question',
      support: 'Technical support',
      billing: 'Billing & plans',
      bug: 'Report a bug',
      feature: 'Feature request',
      other: 'Other',
    };
    return topics[topic] || topic;
  }

  private formatPlainText(data: ContactFormData): string {
    return `
New Contact Form Submission
===========================

Name: ${data.name}
Email: ${data.email}
Topic: ${this.getTopicLabel(data.topic)}

Message:
${data.message}

---
Sent from ducky.wtf contact form
Reply to this email to respond to ${data.name}
    `.trim();
  }

  private formatHtml(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #555; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #667eea; }
    .message { white-space: pre-wrap; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From:</div>
        <div class="value">${this.escapeHtml(data.name)} &lt;${this.escapeHtml(data.email)}&gt;</div>
      </div>
      <div class="field">
        <div class="label">Topic:</div>
        <div class="value">${this.escapeHtml(this.getTopicLabel(data.topic))}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value message">${this.escapeHtml(data.message)}</div>
      </div>
      <div class="footer">
        💡 Reply to this email to respond directly to ${this.escapeHtml(data.name)}
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private formatPasswordResetPlainText(resetUrl: string): string {
    return `
Password Reset Request
======================

You requested to reset your password for your Ducky.wtf account.

Click the link below to reset your password (expires in 15 minutes):
${resetUrl}

If you didn't request this, you can safely ignore this email.

---
The Ducky.wtf Team
    `.trim();
  }

  private formatPasswordResetHtml(resetUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .message { background: white; padding: 20px; border-radius: 4px; border-left: 3px solid #667eea; margin: 20px 0; }
    .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: 600; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; text-align: center; }
    .warning { color: #666; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Password Reset Request</h1>
    </div>
    <div class="content">
      <div class="message">
        <p>You requested to reset your password for your Ducky.wtf account.</p>
        <p>Click the button below to create a new password:</p>
        <div style="text-align: center;">
          <a href="${this.escapeHtml(resetUrl)}" class="button">Reset Password</a>
        </div>
        <p class="warning">⏱ This link will expire in 15 minutes.</p>
      </div>
      <div class="footer">
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p>The Ducky.wtf Team</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();
  }
}

export const emailService = new EmailService();

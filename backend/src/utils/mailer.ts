import nodemailer from 'nodemailer';

// Email Payload structure
export interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

let transporter: nodemailer.Transporter | null = null;
let testAccount: any = null;

// Initialize Transporter
async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    console.log('[Mailer] ✅ SMTP credentials found. Initializing Gmail/SMTP transporter...');
    console.log(`[Mailer]    HOST: ${host} | PORT: ${port} | USER: ${user}`);
    transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: parseInt(port) === 465,
      auth: { user, pass }
    });
  } else {
    // Log exactly which variables are missing
    if (!host) console.warn('[Mailer] ⚠️  SMTP_HOST is missing or empty in .env');
    if (!user) console.warn('[Mailer] ⚠️  SMTP_USER is missing or empty in .env');
    if (!pass) console.warn('[Mailer] ⚠️  SMTP_PASS is missing or empty in .env');
    console.log('[Mailer] Falling back to Ethereal test inbox...');
    
    try {
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log(`[Mailer] Test account created: ${testAccount.user}`);
    } catch (err: any) {
      console.error('[Mailer] Failed to create test account.', err.message);
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true
      });
    }
  }

  return transporter;
}

// Send Notification Email
export async function sendRegistrationNotification(data: EmailPayload): Promise<void> {
  try {
    const activeTransporter = await getTransporter();
    
    // Mail options
    const mailOptions = {
      from: '"Kidrove Platform" <no-reply@kidrove.com>',
      to: process.env.NOTIFICATION_EMAIL || (testAccount ? 'test-admin@kidrove.com' : 'admin@example.com'),
      subject: `🚨 New Registration: AI & Robotics Summer Camp - ${data.name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #3b82f6; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; color: #ffffff;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">New Registration Alert!</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">AI & Robotics Summer Camp 2026</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 24px; color: #334155; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 16px;">Hello Kidrove Team,</p>
            <p style="font-size: 14px;">A new parent has registered their child for the upcoming AI & Robotics Summer Workshop. Here are the submission details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0; width: 35%;">Name</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Email</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Phone Number</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e8f0;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; background-color: #f8fafc; border: 1px solid #e2e8f0;">Registered At</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${new Date(data.createdAt).toLocaleString()}</td>
              </tr>
            </table>

            <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; font-size: 13px; color: #1e3a8a;">
              <strong>Action Required:</strong> Please contact this parent within 24 hours to guide them through the payment and onboarding process.
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding: 15px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; margin-top: 20px;">
            <p style="margin: 0;">This is an automated notification from the Kidrove Web Platform.</p>
          </div>
        </div>
      `
    };

    const info = await activeTransporter.sendMail(mailOptions);
    
    // Check if it's an Ethereal/Test account and print link
    if (testAccount) {
      const testUrl = nodemailer.getTestMessageUrl(info);
      console.log('\n==================================================================');
      console.log('📬 [EMAIL SENT] A new registration email was dispatched to Ethereal!');
      console.log(`🔗 [VIEW EMAIL] Click the link below to view the email inbox preview:`);
      console.log(`👉 ${testUrl}`);
      console.log('==================================================================\n');
    } else if (info.envelope) {
      console.log('\n==================================================================');
      console.log(`✅ [EMAIL SENT] Notification sent via Gmail/SMTP!`);
      console.log(`📨 To: ${mailOptions.to}`);
      console.log(`📋 Subject: ${mailOptions.subject}`);
      console.log(`🆔 Message ID: ${info.messageId}`);
      console.log('==================================================================\n');
    }
  } catch (err: any) {
    console.error('[Mailer] Error occurred while sending notification email:', err.message);
  }
}

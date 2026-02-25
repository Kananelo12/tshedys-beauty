/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import { fromUTC } from "./availability";

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Brand colors
const COLORS = {
  black: "#000000",
  pink: "#E0657A",
  pinkDark: "#C94D63",
  pinkLight: "#FFF5F6",
  gold: "#D4A04A",
  goldLight: "#FEF3C7",
  cream: "#FFFDF9",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
  text: "#1F2937",
  textMuted: "#6B7280",
  white: "#FFFFFF",
  green: "#059669",
  greenLight: "#ECFDF5",
  red: "#DC2626",
  redLight: "#FEF2F2",
};

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tshedy Beauty Parlour</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.grayLight};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.grayLight};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:${COLORS.black};padding:28px 32px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                <span style="color:${COLORS.gold};">Tshedy</span><span style="color:${COLORS.white};"> Beauty Parlour</span>
              </h1>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.4);">Hair &bull; Beauty &bull; Confidence</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:${COLORS.white};padding:0;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:${COLORS.black};padding:24px 32px;border-radius:0 0 12px 12px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);">
                Room 4, Olympic Building &bull; Maseru, Lesotho
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);">
                <a href="tel:+26658809665" style="color:${COLORS.gold};text-decoration:none;">+266 58809665</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:mamahlokomahloko818@gmail.com" style="color:${COLORS.gold};text-decoration:none;">mamahlokomahloko818@gmail.com</a>
              </p>
              <div style="margin:12px 0;border-top:1px solid rgba(255,255,255,0.08);"></div>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">
                &copy; ${new Date().getFullYear()} Tshedy&rsquo;s Beauty Parlour. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateWhatsAppLink(phone: string, message: string): string {
  const normalizedPhone = phone.replace(/\D/g, ""); // digits only
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}

export async function sendBookingNotification(
  booking: any,
  service: any,
  provider: any,
) {
  console.log("Sending booking notification for booking:", booking._id);
  const { date, time } = fromUTC(booking.startDateTime);
  const confirmUrl = `${process.env.BASE_URL}/admin/bookings/${booking._id}/confirm?token=${booking.actionToken}`;

  // Generate WhatsApp click-to-chat link
  const whatsappMessage = `New booking request from ${booking.clientName} for ${service.name} on ${date} at ${time}. Tap this link to review and confirm: ${confirmUrl}`;
  const whatsappLink = generateWhatsAppLink(provider.phone, whatsappMessage);

  const htmlContent = `
    <div style="padding:32px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;background-color:${COLORS.goldLight};border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;font-size:24px;">&#128276;</div>
        <h2 style="margin:16px 0 4px;font-size:22px;font-weight:700;color:${COLORS.text};">New Booking Request</h2>
        <p style="margin:0;font-size:14px;color:${COLORS.textMuted};">A client has requested an appointment</p>
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};border-radius:10px;border:1px solid #F3F0EB;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #F3F0EB;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Client</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${booking.clientName}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #F3F0EB;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Service</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${service.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #F3F0EB;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Date &amp; Time</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${date} at ${time}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Location</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${
              booking.isHouseCall
                ? `House Call (+M${booking.houseCallFee} + transport M${booking.transportCost})`
                : "In-salon"
            }</span>
          </td>
        </tr>
      </table>

      <div style="text-align:center;">
        <a href="${confirmUrl}" style="display:inline-block;background-color:${COLORS.pink};color:${COLORS.white};font-size:14px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">Review &amp; Confirm</a>
      </div>
    </div>
  `;

  const htmlMessage = emailWrapper(htmlContent);

  // Email
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: provider.email,
      subject: `New Booking: ${service.name} — ${booking.clientName}`,
      html: htmlMessage,
      text: `New booking request:
Client: ${booking.clientName}
Service: ${service.name}
Date: ${date} at ${time}
${booking.isHouseCall ? `House call: Yes (+M${booking.houseCallFee} + transport M${booking.transportCost})` : "In-salon"}

Review and confirm: ${confirmUrl}

WhatsApp: ${whatsappLink}`,
    });
    console.log("Email sent successfully:", result.messageId);
  } catch (error) {
    console.error("Email send error:", error);
  }
}

export async function sendClientNotification(
  booking: any,
  service: any,
  status: string,
) {
  console.log(
    `Sending ${status} notification to client for booking:`,
    booking._id,
  );
  const { date, time } = fromUTC(booking.startDateTime);

  const isConfirmed = status === "confirmed";

  const statusIcon = isConfirmed ? "&#9989;" : "&#10060;";
  const statusColor = isConfirmed ? COLORS.green : COLORS.red;
  const statusBg = isConfirmed ? COLORS.greenLight : COLORS.redLight;
  const statusHeading = isConfirmed
    ? "Booking Confirmed!"
    : "Booking Not Available";
  const statusMessage = isConfirmed
    ? "Great news! Your appointment has been confirmed. We can't wait to see you!"
    : "Unfortunately, we weren't able to accommodate this booking. Please try a different time or reach out to us directly.";

  const htmlContent = `
    <div style="padding:32px;">
      <!-- Status Badge -->
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;background-color:${statusBg};border-radius:50%;width:60px;height:60px;line-height:60px;text-align:center;font-size:26px;">${statusIcon}</div>
        <h2 style="margin:16px 0 6px;font-size:24px;font-weight:700;color:${COLORS.text};">${statusHeading}</h2>
        <p style="margin:0;font-size:14px;color:${COLORS.textMuted};max-width:360px;display:inline-block;line-height:1.5;">${statusMessage}</p>
      </div>

      <!-- Appointment Card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};border-radius:10px;border:1px solid #F3F0EB;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #F3F0EB;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Service</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${service.name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;border-bottom:1px solid #F3F0EB;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Date &amp; Time</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${date} at ${time}</span>
          </td>
        </tr>
        ${
          isConfirmed
            ? `<tr>
          <td style="padding:20px 24px;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${COLORS.textMuted};">Location</span><br/>
            <span style="font-size:15px;font-weight:600;color:${COLORS.text};">${
              booking.isHouseCall ? "House Call" : "Room 4, Olympic Building, Maseru"
            }</span>
          </td>
        </tr>`
            : ""
        }
      </table>

      ${
        isConfirmed
          ? `<!-- Reminder -->
      <div style="background-color:${COLORS.pinkLight};border-radius:10px;padding:16px 20px;margin-bottom:24px;border-left:3px solid ${COLORS.pink};">
        <p style="margin:0;font-size:13px;color:${COLORS.pinkDark};line-height:1.5;">
          <strong>Reminder:</strong> Please arrive 5 minutes early. If you need to reschedule or cancel, contact us at least 24 hours in advance.
        </p>
      </div>`
          : ""
      }

      <!-- CTA -->
      <div style="text-align:center;">
        ${
          isConfirmed
            ? `<p style="margin:0 0 4px;font-size:13px;color:${COLORS.textMuted};">Need to make changes?</p>`
            : `<p style="margin:0 0 4px;font-size:13px;color:${COLORS.textMuted};">Want to try a different time?</p>`
        }
        <a href="${process.env.BASE_URL}/book" style="display:inline-block;background-color:${isConfirmed ? COLORS.gold : COLORS.pink};color:${COLORS.white};font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:50px;letter-spacing:0.3px;margin-top:8px;">${isConfirmed ? "Contact Us" : "Book Again"}</a>
      </div>
    </div>

    ${
      isConfirmed
        ? `<!-- Thank you strip -->
    <div style="background-color:${COLORS.cream};padding:20px 32px;text-align:center;border-top:1px solid #F3F0EB;">
      <p style="margin:0;font-size:13px;color:${COLORS.textMuted};">Thank you for choosing <strong style="color:${COLORS.gold};">Tshedy Beauty Parlour</strong> &#10024;</p>
    </div>`
        : ""
    }
  `;

  const htmlMessage = emailWrapper(htmlContent);

  const textMessage = isConfirmed
    ? `Your booking for ${service.name} on ${date} at ${time} has been confirmed.\n\nLocation: ${booking.isHouseCall ? "House Call" : "Room 4, Olympic Building, Maseru"}\n\nPlease arrive 5 minutes early. If you need to reschedule, contact us at least 24 hours in advance.\n\nThank you for choosing Tshedy Beauty Parlour!`
    : `Your booking for ${service.name} on ${date} at ${time} could not be accommodated.\n\nPlease try a different time or contact us directly.\n\nBook again: ${process.env.BASE_URL}/book`;

  // Email to client
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.clientEmail,
      subject: isConfirmed
        ? `✨ Booking Confirmed — ${service.name}`
        : `Booking Update — ${service.name}`,
      html: htmlMessage,
      text: textMessage,
    });
    console.log("Client email sent successfully:", result.messageId);
  } catch (error) {
    console.error("Client email send error:", error);
  }
}

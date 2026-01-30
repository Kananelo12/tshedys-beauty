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

  const htmlMessage = `
    <p>New booking request:</p>
    <ul>
      <li><strong>Client:</strong> ${booking.clientName}</li>
      <li><strong>Service:</strong> ${service.name}</li>
      <li><strong>Date:</strong> ${date} at ${time}</li>
      ${booking.isHouseCall ? `<li><strong>House call:</strong> Yes (+M${booking.houseCallFee} + transport M${booking.transportCost})</li>` : "<li><strong>In-salon</strong></li>"}
    </ul>
    <p><a href="${confirmUrl}">Review and confirm</a></p>
    <p>Or confirm via WhatsApp: <a href="${whatsappLink}">Open WhatsApp</a></p>
  `;

  // Email
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: provider.email,
      subject: "New Booking Request",
      html: htmlMessage,
      text: `
New booking request:
Client: ${booking.clientName}
Service: ${service.name}
Date: ${date} at ${time}
${booking.isHouseCall ? `House call: Yes (+M${booking.houseCallFee} + transport M${booking.transportCost})` : "In-salon"}

Review and confirm: ${confirmUrl}

Or confirm via WhatsApp: ${whatsappLink}
      `,
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
  const whatsappMessage =
    status === "confirmed"
      ? `Your appointment for ${service.name} on ${date} at ${time} has been accepted. We look forward to seeing you.`
      : `Your appointment for ${service.name} on ${date} at ${time} could not be accepted. Please try another time.`;
  const whatsappLink = generateWhatsAppLink(
    booking.clientPhone,
    whatsappMessage,
  );

  const htmlMessage =
    status === "confirmed"
      ? `<p>Your booking for ${service.name} on ${date} at ${time} has been confirmed.</p><p>WhatsApp: <a href="${whatsappLink}">Open WhatsApp</a></p>`
      : `<p>Your booking for ${service.name} on ${date} at ${time} has been rejected.</p><p>WhatsApp: <a href="${whatsappLink}">Open WhatsApp</a></p>`;

  const textMessage =
    status === "confirmed"
      ? `Your booking for ${service.name} on ${date} at ${time} has been confirmed. WhatsApp: ${whatsappLink}`
      : `Your booking for ${service.name} on ${date} at ${time} has been rejected. WhatsApp: ${whatsappLink}`;

  // Email to client
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.clientEmail,
      subject: `Booking ${status}`,
      html: htmlMessage,
      text: textMessage,
    });
    console.log("Client email sent successfully:", result.messageId);
  } catch (error) {
    console.error("Client email send error:", error);
  }
}

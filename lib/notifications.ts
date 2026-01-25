/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { fromUTC } from './availability';

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingNotification(booking: any, service: any, provider: any) {
  console.log('Sending booking notification for booking:', booking._id);
  const { date, time } = fromUTC(booking.startDateTime);
  const confirmUrl = `${process.env.BASE_URL}/api/bookings/${booking._id}/confirm?token=${booking.actionToken}`;
  const rejectUrl = `${process.env.BASE_URL}/api/bookings/${booking._id}/reject?token=${booking.actionToken}`;

  // Generate WhatsApp click-to-chat link
  const whatsappMessage = `New booking request for ${date} ${time} - Confirm here: ${confirmUrl}`;
  const whatsappLink = `https://wa.me/${provider.phone.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  const message = `
New booking request:
Client: ${booking.clientName}
Service: ${service.name}
Date: ${date} at ${time}
${booking.isHouseCall ? `House call: Yes (+M${booking.houseCallFee} + transport M${booking.transportCost})` : 'In-salon'}

Confirm: ${confirmUrl}
Reject: ${rejectUrl}

Or confirm via WhatsApp: ${whatsappLink}
  `;

  // Email
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: provider.email,
      subject: 'New Booking Request',
      text: message,
    });
    console.log('Email sent successfully:', result.messageId);
  } catch (error) {
    console.error('Email send error:', error);
  }
}

export async function sendClientNotification(booking: any, service: any, status: string) {
  console.log(`Sending ${status} notification to client for booking:`, booking._id);
  const { date, time } = fromUTC(booking.startDateTime);
  const message = status === 'confirmed'
    ? `Your booking for ${service.name} on ${date} at ${time} has been confirmed.`
    : `Your booking for ${service.name} on ${date} at ${time} has been rejected.`;

  // Email to client
  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.clientEmail,
      subject: `Booking ${status}`,
      text: message,
    });
    console.log('Client email sent successfully:', result.messageId);
  } catch (error) {
    console.error('Client email send error:', error);
  }
}
# Tshedy's Beauty Parlour - High-Fidelity Prototype

A comprehensive, modern web application for a premium beauty parlour featuring both customer-facing pages and a complete admin dashboard.

## 🚀 Project Architecture

This project is a full-stack application built with Next.js, Tailwind CSS, and MongoDB. It provides a seamless booking experience for customers and a powerful management dashboard for administrators.

### 🎨 Design System & Frontend

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS for a utility-first styling approach.
- **Typography**: `next/font` is used to load 'Dancing Script' for headings and 'Inter' for body text, ensuring optimal performance and a consistent look.
- **UI Components**: A rich set of reusable React components is located in `app/components/`, including `Navbar`, `Footer`, `ServiceCard`, and a `BusinessMap`.

### 🏗️ Backend & API

- **API Routes**: The backend is built using Next.js API Routes, located in `app/api/`.
  - **Authentication**: `app/api/auth/` handles login, logout, and session management (`me`).
  - **Bookings**: `app/api/bookings/` manages booking creation, confirmation, and rejection. It includes a token-based system to allow providers to act on a booking.
  - **Other Endpoints**: Separate routes for managing `services`, `providers`, `availability`, and a `contact` form.
- **Database**: MongoDB is used as the primary database, with connection logic in `lib/mongodb.ts`.
- **Models**: TypeScript types and interfaces are defined in `types/index.ts` and Mongoose models like `models/Provider.ts` structure the data.

### 🔐 Authentication & Authorization

- **JWT-based Auth**: The application uses JSON Web Tokens for securing the admin routes. The logic for handling tokens is in `lib/auth.ts`.
- **Middleware**: `middleware.ts` protects the `/admin` routes, redirecting unauthenticated users to the login page.

### ⚙️ Key Libraries

- **`date-fns`**: For date manipulation, especially for calculating booking expiration times.
- **`mongodb`**: The official MongoDB driver for Node.js.
- **`nodemailer`**: For sending email notifications (e.g., booking confirmations).
- **`eslint` & `prettier`**: For maintaining code quality and consistency.

## 🔧 Configuring Booking Timeout

When a customer makes a booking, the service provider has a limited time to accept or reject it. If they take too long, the action links sent to them will expire.

### How It Works

1.  **Booking Creation**: When a new booking is created in `app/api/bookings/route.ts`, an `expiresAt` timestamp is added to the booking document in the database.
2.  **Timeout Duration**: By default, this duration is hardcoded to **30 minutes**.
3.  **Validation**: When the provider clicks the "accept" or "reject" link, the API checks if the current time is past the `expiresAt` time. The validation happens in:
    - `app/api/bookings/[id]/confirm/route.ts`
    - `app/api/bookings/[id]/reject/route.ts`
    - `app/api/bookings/token/[token]/route.ts`

### How to Change the Timeout Duration

To make this configurable, the hardcoded value has been replaced with an environment variable.

1.  **Create a `.env.local` file** in the root of the project if you don't have one.
2.  **Add the environment variable**:

    ```env
    # The time in minutes a provider has to confirm or reject a booking
    BOOKING_EXPIRATION_MINUTES=60
    ```

3.  **Update the Code**: The code in `app/api/bookings/route.ts` now uses this variable. If the variable is not set, it defaults to 30 minutes.

    ```typescript
    // In app/api/bookings/route.ts
    const expirationMinutes = parseInt(process.env.BOOKING_EXPIRATION_MINUTES || '30', 10);
    const newBooking = {
      // ... other fields
      expiresAt: addMinutes(new Date(), expirationMinutes),
      // ... other fields
    };
    ```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

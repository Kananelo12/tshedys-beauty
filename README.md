# Tshedy's Beauty Parlour - High-Fidelity Prototype

A comprehensive, modern web application for a premium beauty parlour featuring both customer-facing pages and a complete admin dashboard.

## 🎨 Design System

### Brand Guidelines

#### Color Palette
- **Primary Gold**: `#d4a853` (gold-500) - Used for accents, CTAs, and premium highlights
- **Deep Charcoal/Black**: `#0a0a0a` (charcoal-950) - Primary background
- **Secondary Charcoal**: `#1a1a1a` (charcoal-900) - Card backgrounds and elevated surfaces
- **Border Colors**: `#454545` (charcoal-800) - Subtle borders and dividers

#### Typography
- **Headings**: Dancing Script (elegant script font) - For brand name, section titles, and premium feel
- **Body Text**: Inter (clean sans-serif) - For readability and modern aesthetic

#### Visual Style
- **Layout**: Mobile-first responsive design with clean spacing
- **Cards**: Rounded corners (rounded-2xl), subtle borders, hover effects with gold glow
- **Visual Effects**: Subtle gold glows, gradient backgrounds, smooth transitions (300ms)

## 📱 Application Structure

### Customer-Facing Pages
1. **Homepage** (`/`) - Hero section, featured services, trust indicators
2. **Services** (`/services`) - Complete service catalog with filtering
3. **Gallery** (`/gallery`) - Portfolio showcase with category filters
4. **Booking** (`/book`) - Multi-step appointment booking form
5. **Contact** (`/contact`) - Contact information and inquiry form

### Admin Dashboard (`/admin`)
1. **Dashboard** - Overview with metrics and recent activity
2. **Bookings Management** - Full appointment management with search/filter
3. **Services Management** - CRUD interface for services
4. **Gallery Management** - Image upload and organization
5. **Settings** - Business info, hours, social links, notifications

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

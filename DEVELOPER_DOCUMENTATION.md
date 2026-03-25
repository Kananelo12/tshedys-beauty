# Tshedy's Beauty Parlour - Developer Documentation

> **Complete Technical & Design Guide for Developers**  
> Version 1.1.0 | Last Updated: February 2026

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Design System](#design-system)
5. [Project Structure](#project-structure)
6. [Core Features](#core-features)
7. [Database Schema](#database-schema)
8. [Authentication & Authorization](#authentication--authorization)
9. [API Routes](#api-routes)
10. [Key Components](#key-components)
11. [State Management](#state-management)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)
14. [Design Evolution](#design-evolution)

---

## 🎯 Project Overview

### What is Tshedy's Beauty Parlour?

Tshedy's Beauty Parlour is a **full-stack web application** for a premium beauty salon based in Maseru, Lesotho. The platform provides a complete digital presence with customer-facing pages and a comprehensive admin dashboard for business management.

### Business Background

Founded in December 2025 by Tshedy, the business evolved from a childhood passion for hair and beauty into a professional beauty parlour. The owner operates from Room 4, Olympic Building, Maseru, offering hair styling, braiding, and makeup services.

### Project Goals

1. **Customer Engagement**: Provide an elegant online presence to showcase services and portfolio
2. **Booking System**: Enable seamless appointment booking with automated notifications
3. **Business Management**: Give the owner tools to manage services, bookings, and gallery
4. **Brand Building**: Reflect the premium, faith-driven brand identity online

---

## 🛠 Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | 12.30.0 | Animations |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 16.1.1 | Serverless API |
| **MongoDB** | 7.0.0 | Database |
| **Jose** | 6.1.3 | JWT authentication |
| **bcryptjs** | 3.0.3 | Password hashing |
| **Nodemailer** | 7.0.12 | Email notifications |

### Additional Libraries

- **date-fns** (4.1.0) - Date manipulation
- **Lucide React** (0.562.0) - Icons
- **React Leaflet** (5.0.0) - Maps
- **Recharts** (3.7.0) - Admin analytics charts
- **React Big Calendar** (1.19.4) - Calendar views
- **React Confetti** (6.4.0) - Success animations

---

## 🏗 Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Public     │  │    Admin     │  │   Booking    │      │
│  │   Pages      │  │  Dashboard   │  │    Flow      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   MIDDLEWARE LAYER                           │
│              (Authentication & Routing)                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (Next.js)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Auth    │  │ Bookings │  │ Services │  │  Email   │   │
│  │   API    │  │   API    │  │   API    │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                             │
│                    MongoDB Atlas                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Providers │  │ Bookings │  │ Services │  │  Images  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Rendering Strategy

- **Server-Side Rendering (SSR)**: Default for pages requiring fresh data
- **Client-Side Interactions**: Framer Motion animations, form handling
- **API Routes**: Serverless functions for backend logic

### Key Architectural Patterns

1. **Next.js App Router**: File-based routing with layouts and nested routes
2. **API Route Handlers**: RESTful API design with `/app/api` directory
3. **MongoDB Connection Pooling**: Singleton pattern for database connections
4. **JWT Authentication**: Stateless authentication with HTTP-only cookies
5. **Middleware Protection**: Route guards for admin pages

---

## 🎨 Design System

### Design Philosophy

The project underwent a **major redesign** from a complex gradient-heavy aesthetic to a **clean, professional, minimal design** based on client feedback.

### Color Palette

#### Current Design (Solid Colors Only)

```css
/* Primary Colors */
Primary Pink:    #EC4899  /* Solid pink for CTAs and accents */
Hover Pink:      #DB2777  /* Hover states */
Light Pink:      #FDF2F8  /* Backgrounds, subtle sections */

/* Brand Accents */
Gold:            #F59E0B  /* Matches logo, admin buttons */
Hover Gold:      #D97706

/* Neutral */
Black:           #000000  /* Navbar & footer background */
White:           #FFFFFF  /* Content backgrounds */
Dark Gray:       #1F2937  /* Primary text */
Medium Gray:     #6B7280  /* Secondary text */
Light Gray:      #E5E7EB  /* Borders */
```

#### Previous Design (Deprecated)

The original design featured gradients (`blush`, `lilac`, `peach`, `rose-gold`) and animations, which were removed per client request.

### Typography

| Element | Font Family | Weight | Size |
|---------|-------------|--------|------|
| **Headings** | Playfair Display (serif) | 600-800 | 2xl-6xl |
| **Body Text** | Inter (sans-serif) | 300-600 | base-lg |
| **Small Text** | Inter | 500 | sm |
| **Brand Name** | Dancing Script (cursive) | 700 | 2xl-3xl |

### Visual Style

- **Layout**: Mobile-first responsive design
- **Cards**: Rounded corners (`rounded-2xl`), subtle shadows
- **Buttons**: Solid colors (no gradients), simple hover scale
- **Animations**: Minimal, subtle transitions (300ms)
- **Spacing**: Generous padding, clean whitespace

### UI Components

```css
/* Button Styles */
Primary CTA:
  background: #EC4899
  hover: scale(1.05) + #DB2777

Secondary CTA:
  background: #F59E0B
  hover: scale(1.05) + #D97706

Outline:
  border: 2px solid #EC4899
  color: #EC4899
  hover: background #FDF2F8

/* Card Styles */
Standard Card:
  background: white
  border: 1px solid #E5E7EB
  rounded: 2xl
  shadow: sm
  hover: shadow-md

/* Layout Containers */
Section:
  padding-y: 12 (48px) - 20 (80px)
  max-width: 7xl (1280px)
```

---

## 📁 Project Structure

```
tshedy/
│
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & Tailwind
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Homepage
│   │
│   ├── about/                   # About page
│   ├── book/                    # Booking flow
│   │   ├── page.tsx            # Simplified single-page form
│   │   └── page-old-backup.tsx # Original complex 4-step wizard
│   ├── contact/                 # Contact page
│   ├── gallery/                 # Gallery page
│   ├── services/                # Services page
│   │
│   ├── admin/                   # Admin dashboard
│   │   ├── layout.tsx          # Admin-specific layout
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── login/              # Admin login
│   │   ├── bookings/           # Booking management
│   │   │   ├── [id]/          # Individual booking
│   │   │   │   └── confirm/   # Confirmation page
│   │   │   └── success/       # Success page
│   │   ├── gallery/            # Gallery management
│   │   ├── services/           # Service management
│   │   └── settings/           # Business settings
│   │
│   ├── api/                     # API Routes
│   │   ├── auth/               # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   ├── bookings/           # Booking CRUD
│   │   │   ├── [id]/          # Individual booking actions
│   │   │   │   ├── confirm/
│   │   │   │   └── reject/
│   │   │   └── token/         # Token-based booking actions
│   │   ├── services/           # Service CRUD
│   │   ├── availability/       # Provider availability
│   │   └── contact/            # Contact form
│   │
│   └── components/              # React components
│       ├── Hero.tsx            # Homepage hero (simplified)
│       ├── Navbar.tsx          # Navigation (black with gold)
│       ├── Footer.tsx          # Footer (black with gold)
│       ├── Gallery.tsx         # Horizontal scroll rows
│       ├── Testimonials.tsx    # Horizontal scroll cards
│       ├── ServiceCard.tsx     # Service display card
│       ├── About.tsx           # About section
│       ├── Features.tsx        # Features section
│       ├── Pricing.tsx         # Pricing display
│       ├── CTA.tsx             # Call-to-action sections
│       ├── BusinessMap.tsx     # Location map
│       ├── Lightbox.tsx        # Image lightbox
│       ├── ScrollProgress.tsx  # Scroll indicator
│       └── ... (decorative effects)
│
├── lib/                         # Utility functions
│   ├── mongodb.ts              # MongoDB connection
│   ├── auth.ts                 # Auth helpers (JWT, bcrypt)
│   ├── availability.ts         # Scheduling logic
│   └── notifications.ts        # Email notifications
│
├── models/                      # TypeScript models
│   └── Provider.ts             # Provider interface
│
├── types/                       # TypeScript types
│   └── index.ts                # Shared types (Service, Booking, etc.)
│
├── public/                      # Static assets
│
├── scripts/                     # Database seeding
│   ├── seed.ts                 # Seed all data
│   └── seed-providers.ts       # Seed providers
│
├── middleware.ts                # Next.js middleware (auth guards)
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## 🚀 Core Features

### 1. **Customer-Facing Features**

#### Homepage (`/`)
- Hero section with primary CTA
- Featured services grid
- Gallery preview (horizontal scroll)
- Testimonials carousel
- Contact section with map

#### Services Page (`/services`)
- Complete service catalog
- Filtering by category
- Price and duration display
- "Book Now" integration

#### Gallery Page (`/gallery`)
- Two horizontal scrolling rows
- Category filtering
- Lightbox view for images
- Before/after showcases

#### Booking System (`/book`)
- **Simplified Flow**: Single-page form (down from 4-step wizard)
- Fields: Name, Email, Phone, Service, Date, Time, Notes
- Real-time availability checking
- Email confirmations to client & provider
- 30-minute hold on pending bookings

#### Contact Page (`/contact`)
- Contact form
- Business information
- Interactive map (Leaflet)
- Social media links

### 2. **Admin Dashboard Features**

#### Authentication
- Secure login with bcrypt + JWT
- HTTP-only cookies
- Middleware route protection
- Auto-redirect if authenticated

#### Dashboard Overview (`/admin`)
- Booking statistics (pending, accepted, rejected)
- Revenue tracking
- Recent bookings list
- Quick actions

#### Booking Management (`/admin/bookings`)
- View all bookings
- Search & filter (status, date range)
- Accept/reject bookings
- Email template actions
- Booking details view

#### Service Management (`/admin/services`)
- CRUD operations for services
- Set pricing & duration
- Service categories
- Visibility toggle

#### Gallery Management (`/admin/gallery`)
- Upload images
- Organize by category
- Delete images
- Before/after pairing

#### Settings (`/admin/settings`)
- Business information
- Operating hours
- Social media links
- Notification preferences

---

## 🗄 Database Schema

### Collections

#### **providers**

```typescript
interface IProvider {
  _id: ObjectId;
  name: string;              // Provider name
  email: string;             // Login email (unique)
  phone: string;             // Contact number
  timezone: string;          // E.g., "Africa/Maseru"
  password: string;          // Bcrypt hashed
  createdAt: Date;
  updatedAt: Date;
}
```

**Indexes**: `email` (unique)

#### **services**

```typescript
interface Service {
  _id: ObjectId | string;
  name: string;              // E.g., "Box Braids"
  duration: number;          // Minutes
  price: number;             // In local currency (LSL)
  description: string;       // Service details
  category?: string;         // E.g., "Braiding", "Makeup"
}
```

#### **bookings**

```typescript
interface Booking {
  _id: ObjectId | string;
  providerId: string;        // References providers._id
  serviceId: string;         // References services._id
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startDateTime: Date;       // UTC
  endDateTime: Date;         // UTC (startDateTime + duration)
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  isHouseCall: boolean;      // Mobile service
  houseCallFee: number;      // Additional fee
  transportCost: number;     // If applicable
  createdAt: Date;
  expiresAt: Date;           // 30 min hold expiration
  actionToken: string;       // UUID for email actions
  providerActionAt?: Date;   // When provider responded
}
```

**Indexes**: 
- `providerId`
- `status`
- `startDateTime`
- `actionToken` (unique)

---

## 🔐 Authentication & Authorization

### Authentication Flow

```
1. Admin visits /admin/login
2. Enters email & password
3. POST /api/auth/login
4. Server validates credentials (bcrypt.compare)
5. Server generates JWT (jose)
6. Server sets HTTP-only cookie (admin_token)
7. Redirect to /admin dashboard
```

### JWT Payload

```typescript
interface JWTPayload {
  providerId: string;
  email: string;
  iat: number;        // Issued at
  exp: number;        // Expires (7 days)
}
```

### Middleware Protection

File: `middleware.ts`

- Intercepts all `/admin/*` routes (except `/admin/login`)
- Verifies JWT from cookie using `jose`
- Redirects to `/admin/login` if invalid/missing
- Auto-redirects from login if already authenticated

### Security Measures

1. **Password Hashing**: bcrypt with 12 rounds
2. **HTTP-Only Cookies**: Not accessible via JavaScript
3. **Secure in Production**: `secure: true` in production
4. **JWT Expiration**: 7-day token lifetime
5. **Password Projection**: Never return password in API responses

---

## 🌐 API Routes

### Authentication APIs

#### `POST /api/auth/login`

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "provider": {
    "_id": "...",
    "name": "Tshedy",
    "email": "...",
    "phone": "..."
  }
}
```

**Sets Cookie**: `admin_token` (HTTP-only, 7 days)

#### `POST /api/auth/logout`

**Response**:
```json
{ "success": true }
```

**Clears Cookie**: `admin_token`

#### `GET /api/auth/me`

**Response**:
```json
{
  "provider": {
    "_id": "...",
    "name": "Tshedy",
    "email": "...",
    "phone": "..."
  }
}
```

### Booking APIs

#### `GET /api/bookings`

Returns all bookings with enriched service & provider data.

**Response**:
```json
[
  {
    "_id": "...",
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "startDateTime": "2026-02-25T14:00:00.000Z",
    "status": "PENDING",
    "service": { "name": "Box Braids", "price": 500 },
    "provider": { "name": "Tshedy" }
  }
]
```

#### `POST /api/bookings`

**Request**:
```json
{
  "serviceId": "...",
  "clientName": "Jane Doe",
  "clientEmail": "jane@example.com",
  "clientPhone": "+266 58809665",
  "date": "2026-02-28",
  "time": "14:00",
  "isHouseCall": false
}
```

**Logic**:
1. Validates required fields
2. Fetches service & provider
3. Converts date/time to UTC
4. Checks for booking conflicts
5. Creates pending booking with 30-min hold
6. Sends email notifications
7. Returns booking ID

**Response**:
```json
{
  "success": true,
  "bookingId": "...",
  "message": "Booking created, awaiting confirmation"
}
```

#### `POST /api/bookings/[id]/confirm`

Admin confirms a booking.

**Response**:
```json
{ "success": true }
```

#### `POST /api/bookings/[id]/reject`

Admin rejects a booking.

**Response**:
```json
{ "success": true }
```

### Service APIs

#### `GET /api/services`

Returns all services.

#### `POST /api/services`

Creates a service (admin only).

#### `PUT /api/services/[id]`

Updates a service (admin only).

#### `DELETE /api/services/[id]`

Deletes a service (admin only).

### Other APIs

#### `GET /api/availability`

Returns provider's available time slots for a given date.

#### `POST /api/contact`

Handles contact form submissions, sends email to provider.

---

## 🎨 Key Components

### Navbar (`app/components/Navbar.tsx`)

**Design**: Black background with gold accents

```tsx
Features:
- Logo in gold (#F59E0B)
- Navigation links: Home, About (white text, gold hover)
- Admin button (gold solid)
- Book Now button (pink solid)
- Responsive hamburger menu
- Sticky positioning
```

### Footer (`app/components/Footer.tsx`)

**Design**: Black background matching navbar

```tsx
Features:
- Brand name in gold
- Quick links
- Social media icons (gold)
- Copyright notice
```

### Hero (`app/components/Hero.tsx`)

**Simplified Design** (v2.0):

```tsx
Layout:
- Two-column responsive grid
- Left: Headline + badge + CTAs
- Right: Hero image (no overlays)
- Light pink background (#FDF2F8)

Removed:
- 3D animated containers
- Floating blobs
- Gradients
- Particle effects
```

### Gallery (`app/components/Gallery.tsx`)

**Horizontal Scroll Layout**:

```tsx
Structure:
- Two horizontal scrolling rows
- 6 images per row
- Snap scrolling
- Simple hover scale effect
- Lightbox integration
```

### Testimonials (`app/components/Testimonials.tsx`)

**Horizontal Carousel**:

```tsx
Structure:
- Single scrolling row
- Card width: 320-384px
- White cards with pink borders
- Star ratings
- Read more/less functionality
```

### ServiceCard (`app/components/ServiceCard.tsx`)

**Clean Card Design**:

```tsx
Structure:
- White background
- Pink icon circle (solid #EC4899)
- Service name, duration, price
- Description
- Book button
- Simple hover scale (1.05)
```

---

## 💾 State Management

### Approach

This project uses **local component state** with React hooks rather than a global state management library.

### Key Patterns

1. **Form State**: `useState` for form inputs
2. **API Calls**: `useEffect` + `fetch` for data fetching
3. **Loading States**: `isLoading` boolean flags
4. **Error Handling**: `error` state strings

### Example: Booking Form

```tsx
const [formData, setFormData] = useState({
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  serviceId: '',
  date: '',
  time: ''
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Booking failed');
    
    // Success handling
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 💻 Development Workflow

### Environment Setup

1. **Clone Repository**:
```bash
git clone <repo-url>
cd tshedy
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Environment Variables**:

Create `.env.local`:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tshedybeautyparlour

# JWT Secret
JWT_SECRET=your-super-secret-key-change-in-production

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Seed Database**:
```bash
npm run seed
```

5. **Start Development Server**:
```bash
npm run dev
```

Access at `http://localhost:3000`

### Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database
```

### Database Seeding

The project includes seed scripts to populate the database with initial data:

**`scripts/seed.ts`**: Seeds services and sample bookings
**`scripts/seed-providers.ts`**: Creates admin provider account

Default admin credentials (after seeding):
- Email: `mamahlokomahloko818@gmail.com`
- Password: `admin123` (change in production!)

---

## 🚢 Deployment

### Recommended Platform: Vercel

1. **Connect Repository** to Vercel
2. **Set Environment Variables** in Vercel dashboard
3. **Deploy** (automatic on push to main)

### Environment Variables (Production)

```env
MONGO_URI=<production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USER=<email>
EMAIL_PASS=<password>
NEXT_PUBLIC_APP_URL=https://tshedybeauty.com
```

### MongoDB Atlas Setup

1. Create cluster on MongoDB Atlas
2. Whitelist Vercel IP ranges (or use 0.0.0.0/0)
3. Create database user
4. Copy connection string to `MONGO_URI`

### Post-Deployment

1. Test admin login
2. Seed production database
3. Test booking flow
4. Verify email notifications
5. Check all admin features

---

## 📐 Design Evolution

### Original Design (v1.0)

**Characteristics**:
- Heavy use of gradients (blush, lilac, peach, rose-gold)
- Complex animations (3D containers, floating blobs)
- 4-step booking wizard
- Gradient text effects
- Multiple navigation items
- Masonry gallery grid

**Client Feedback**:
- ❌ Too much animation/motion
- ❌ Gradients overwhelming
- ❌ Navigation too complex
- ❌ Booking flow too long

### Redesign (v2.0 - Current)

**Changes**:
- ✅ **Solid colors only** (pink #EC4899, gold #F59E0B, black, white)
- ✅ **Minimal animations** (subtle scale on hover)
- ✅ **Simplified navigation** (Home + About only)
- ✅ **Single-page booking form** (down from 4 steps)
- ✅ **Horizontal scroll galleries** (from masonry grid)
- ✅ **Black navbar/footer** (to complement gold logo)

**Code Reduction**:
- Booking page: **1258 lines → 385 lines** (~70% reduction)
- Removed gradient utilities from Tailwind config
- Simplified component logic throughout

**Files Affected**:
- [tailwind.config.ts](tailwind.config.ts)
- [app/components/Navbar.tsx](app/components/Navbar.tsx)
- [app/components/Footer.tsx](app/components/Footer.tsx)
- [app/components/Hero.tsx](app/components/Hero.tsx)
- [app/components/Gallery.tsx](app/components/Gallery.tsx)
- [app/components/Testimonials.tsx](app/components/Testimonials.tsx)
- [app/book/page.tsx](app/book/page.tsx)

See [REDESIGN_STRATEGY.md](REDESIGN_STRATEGY.md) and [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for complete details.

---

## 🎓 Learning Resources

### Next.js Concepts Used

- **App Router** - File-based routing, layouts, nested routes
- **Server Components** - Default server-side rendering
- **API Routes** - Serverless API with route handlers
- **Middleware** - Route guards and request interception
- **Font Optimization** - next/font for web fonts

### MongoDB Integration

- **Connection Pooling** - Singleton pattern for efficiency
- **Aggregation** - Join-like queries for enriched data
- **Indexes** - Optimized queries on common fields

### TypeScript Patterns

- **Interfaces** - Strong typing for models
- **Type Guards** - Runtime type checking
- **Generics** - Reusable type-safe functions

---

## 🤝 Contributing

### Code Style

- **Formatting**: Follow Prettier defaults
- **Naming**: camelCase for variables, PascalCase for components
- **TypeScript**: Always type function parameters and returns
- **Comments**: Explain "why", not "what"

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Test locally (booking flow, admin features)
4. Create PR with clear description
5. Address review feedback

### Testing Checklist

- [ ] Booking flow (start to finish)
- [ ] Admin login/logout
- [ ] Service CRUD operations
- [ ] Mobile responsive design
- [ ] Email notifications
- [ ] Gallery lightbox
- [ ] Contact form

---

## 📞 Support & Contact

**Project Owner**: Tshedy  
**Email**: mamahlokomahloko818@gmail.com  
**Phone**: +266 58809665  
**Location**: Room 4, Olympic Building, Maseru, Lesotho

**Social Media**:
- [TikTok](https://www.tiktok.com/@tshedysbeautyparlour)
- [Instagram](https://www.instagram.com/tshedys_beauty_parlour)
- [Facebook](https://www.facebook.com/profile.php?id=61581650923087)

---

## 📝 License

Private project. All rights reserved.

---

**Document Version**: 1.0  
**Last Updated**: February 22, 2026  
**Maintained By**: Development Team

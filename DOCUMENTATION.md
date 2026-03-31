# UniMart — Campus Marketplace Platform
### Technical Documentation
**Group 37 | Web Application Development | 2026**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Database Design](#4-database-design)
5. [API Reference](#5-api-reference)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Authentication & Security](#7-authentication--security)
8. [Key Features](#8-key-features)

---

## 1. Project Overview

**UniMart** is a full-stack campus marketplace web application that enables university students to buy and sell items safely within their campus community. The platform is exclusively accessible to verified students and facilitates peer-to-peer transactions through a structured campus meet-up system.

### Problem Statement

Students frequently need to buy and sell second-hand items — textbooks, electronics, clothing, and more — but lack a trusted, campus-specific platform to do so safely. General marketplaces such as Jiji or Facebook Marketplace do not verify student identity or enforce campus-safe meet-up practices, exposing users to potential fraud and safety risks.

### Objectives

- Provide a verified student-only marketplace restricted to enrolled students
- Enable safe, campus-based transactions through designated meet-up locations
- Facilitate direct communication between buyers and sellers
- Give sellers tools to manage their listings and track orders
- Deliver a responsive, accessible experience on both mobile and desktop devices

### Live Application

The application is deployed and accessible at:
**`https://unimart-group37.onrender.com`**

---

## 2. System Architecture

UniMart follows a **monorepo, full-stack architecture** where a single Express.js server serves both the REST API and the compiled React frontend from one deployment.

```
┌─────────────────────────────────────────────────────┐
│                    Client Browser                    │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│              Express.js Server (Node.js)             │
│                                                      │
│  ┌─────────────────┐    ┌────────────────────────┐  │
│  │   REST API       │    │  Static File Server    │  │
│  │  /api/*          │    │  React SPA (dist/)     │  │
│  └────────┬────────┘    └────────────────────────┘  │
│           │                                          │
│  ┌────────▼────────┐                                 │
│  │  Prisma ORM     │                                 │
│  └────────┬────────┘                                 │
└───────────┼─────────────────────────────────────────┘
            │ PostgreSQL Protocol
┌───────────▼─────────────────────────────────────────┐
│           Supabase PostgreSQL Database               │
│           (Hosted — EU West Region)                  │
└─────────────────────────────────────────────────────┘
```

### Request Flow

1. All HTTP requests arrive at the Express.js server
2. Requests matching `/api/*` are routed to the appropriate API handler
3. All other requests return `index.html`, allowing React Router to handle client-side navigation
4. Prisma ORM translates JavaScript model queries into SQL and communicates with the Supabase PostgreSQL database

---

## 3. Technology Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.x | JavaScript runtime environment |
| Express.js | 4.19.x | HTTP server and API routing |
| Prisma ORM | 6.x | Type-safe database access layer |
| PostgreSQL | 15.x | Relational database (hosted on Supabase) |
| JSON Web Tokens | 9.x | Stateless user authentication |
| bcrypt | 5.x | Secure password hashing |
| Helmet | 7.x | HTTP security headers |
| express-validator | 7.x | Server-side input validation |
| Morgan | 1.x | HTTP request logging |
| dotenv | 16.x | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | Component-based UI library |
| Vite | 7.x | Build tool and development server |
| React Router DOM | 7.x | Client-side routing |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Framer Motion | 12.x | UI animations and transitions |
| Lucide React | 0.577.x | Consistent icon library |

### Infrastructure

| Service | Purpose |
|---|---|
| Render | Cloud application hosting |
| Supabase | Managed PostgreSQL database |
| GitHub | Version control and deployment trigger |

---

## 4. Database Design

The database is hosted on **Supabase** (PostgreSQL) and managed through **Prisma ORM**. All primary keys use UUID format for security and scalability.

### Entity Relationship Diagram

```
User ──< Product ──< ProductImage
 │           │
 │           └──< OrderItem >── Order >── MeetupLocation
 │
 ├──< Wishlist >── Product
 ├──< Order (as buyer)
 ├──< Conversation (as buyer) >── Message
 ├──< Conversation (as seller)
 └──< Notification
```

#### `conversations` and `messages`
Each conversation links a buyer, a seller, and optionally a specific product. Messages are stored with sender reference, content, read status, and timestamp. The frontend polls for new messages every 3 seconds to simulate real-time communication.

#### `notifications`
Notifications are created automatically when orders are placed (notifying the seller) and when order status changes (notifying the buyer). Each notification has a type, title, body, and optional action URL.

---

## 5. API Reference

All endpoints are prefixed with `/api`. Protected endpoints require an `Authorization: Bearer <token>` header.

### Authentication — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/signup` | No | Register a new student account |
| POST | `/login` | No | Authenticate and receive a JWT |
| GET | `/me` | Yes | Retrieve the full profile of the authenticated user |

**Example — POST /api/auth/login Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "full_name": "Kwame Mensah",
    "email": "kwame@st.knust.edu.gh",
    "is_verified": true
  }
}
```

### Users — `/api/users`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| PATCH | `/me` | Yes | Update profile fields (phone, department, level, location) |
| GET | `/:id/public` | No | Get a seller's public profile and active product listings |

### Products — `/api/products`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | No | List all active products; excludes the authenticated user's own listings |
| POST | `/` | Yes | Create a new product listing |
| GET | `/mine` | Yes | Retrieve all products listed by the authenticated seller |
| GET | `/:id` | No | Get full product details; increments the view counter |
| PATCH | `/:id` | Yes | Update a product (seller only) |
| DELETE | `/:id` | Yes | Delete a product (seller only) |

**Supported Query Parameters for GET `/api/products`:**

| Parameter | Type | Description |
|---|---|---|
| `category` | String | Filter by category name |
| `search` | String | Search products by title |
| `minPrice` | Number | Minimum price filter |
| `maxPrice` | Number | Maximum price filter |
| `sortBy` | String | `newest`, `price_asc`, `price_desc`, or `popular` |
| `inStock` | Boolean | Return only in-stock products |

### Orders — `/api/orders`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/` | Yes | Place a new order; automatically notifies all relevant sellers |
| GET | `/mine` | Yes | Retrieve all orders placed by the authenticated buyer |
| GET | `/seller` | Yes | Retrieve all orders received by the authenticated seller |
| PATCH | `/:id/status` | Yes | Toggle order status between `pending` and `delivered` |

### Conversations — `/api/conversations`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | Yes | Retrieve all conversations for the authenticated user |
| POST | `/` | Yes | Start or retrieve an existing conversation with a seller |
| GET | `/:id/messages` | Yes | Fetch all messages; marks received messages as read |
| POST | `/:id/messages` | Yes | Send a new message |

### Wishlists — `/api/wishlists`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | Yes | Retrieve all wishlisted products |
| POST | `/:productId` | Yes | Add a product to the wishlist |
| DELETE | `/:productId` | Yes | Remove a product from the wishlist |

### Notifications — `/api/notifications`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/` | Yes | Retrieve all notifications for the authenticated user |
| PATCH | `/:id/read` | Yes | Mark a single notification as read |
| PATCH | `/read-all` | Yes | Mark all notifications as read |
| DELETE | `/:id` | Yes | Delete a notification |

---

## 6. Frontend Architecture

### State Management

UniMart uses the React Context API to manage global application state across components without prop drilling.

| Context | Responsibility |
|---|---|
| `AuthContext` | Stores the JWT token and user object; persists to `localStorage` so sessions survive page refreshes |
| `CartContext` | Manages in-memory shopping cart items including quantities and totals |
| `WishlistContext` | Fetches the user's wishlist from the API on login and provides optimistic toggle functionality |

### Routing Strategy

React Router v7 manages all client-side navigation. Routes are divided into two categories:

- **Public routes** — accessible without authentication (e.g. `/shop`, `/login`, `/signup`, `/productdetails`)
- **Protected routes** — wrapped in a `<RequireAuth>` component that redirects unauthenticated users to `/login`, preserving the intended destination for post-login redirect

The home page (`/`) is exclusively for unauthenticated users. Authenticated users visiting `/` are automatically redirected to `/shop`.

### Key Design Decisions

| Decision | Rationale |
|---|---|
| Optimistic UI updates | Wishlist toggles and notification reads update the interface immediately, with automatic rollback if the API call fails, providing a responsive feel |
| Preview-first product loading | Product detail pages display the image, name, and price from the shop card instantly while the full product data loads from the API, reducing perceived load time |
| Skeleton loading screens | Animated placeholder cards are shown during data fetching on the shop and profile pages, improving perceived performance |
| Mobile-first responsive design | All pages are built with Tailwind CSS responsive breakpoints; the chat page uses a tab-based layout on mobile to switch between the conversation list and the active chat |
| Single-server deployment | The Express backend serves the compiled React frontend as static files, simplifying deployment to a single Render service |

---

## 7. Authentication & Security

### JWT-Based Authentication

User sessions are managed using JSON Web Tokens (JWT):
- Tokens are signed using the `HS256` algorithm and expire after 7 days
- On login, the token is stored in `localStorage` and attached to all subsequent API requests as `Authorization: Bearer <token>`
- The `requireAuth` middleware on the backend verifies the token signature and expiry on every protected route

### Password Security

- All passwords are hashed using `bcrypt` with a cost factor of 12 before being stored in the database
- Plain-text passwords are never stored, logged, or transmitted after the initial request

### HTTP Security Headers

The `helmet` middleware automatically sets the following security headers on all responses:
- `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing
- `X-Frame-Options: DENY` — prevents clickjacking via iframes
- `Strict-Transport-Security` — enforces HTTPS connections

### Input Validation

All POST and PATCH endpoints validate incoming request bodies using `express-validator` before any database operation is performed. Invalid requests receive a structured `400 Bad Request` response with field-level error messages.

### CORS Policy

Cross-Origin Resource Sharing is configured to only accept requests from the configured `CLIENT_URL` environment variable, preventing unauthorised cross-origin access to the API.

### Seller Onboarding Controls

- Users must complete their profile (phone number, department, level, and campus location) before they are permitted to switch to seller mode
- First-time sellers must read and agree to the Seller Terms and Conditions before accessing seller features
- The agreement is recorded in `localStorage` keyed to the user's ID, so the terms are only presented once per account

---

## 8. Key Features

### Buyer Features

| Feature | Description |
|---|---|
| Product Discovery | Browse all active listings with category tabs, keyword search, price range filter, and sort options |
| Product Details | View full product information including description, key features, seller profile, and stock status |
| Shopping Cart | Add and remove items, adjust quantities, and view a live subtotal with 8% tax calculation |
| Checkout | Select a campus meet-up location and payment method (cash or mobile money) to place an order |
| Order History | View all past orders with status indicators (pending or delivered) |
| Wishlist | Save products for later; wishlist is synchronised with the database |
| Buyer-Seller Messaging | Initiate a direct chat with any seller from the product details page |
| Notifications | Receive in-app notifications for order confirmations and status updates |
| Seller Profile View | Click on a seller's name to view their public profile, rating, and all active listings |

### Seller Features

| Feature | Description |
|---|---|
| Product Listings | Add products with up to 4 images, a description, price, category, and stock quantity |
| Product Management | Edit or delete existing listings directly from the seller dashboard |
| Order Management | View all incoming orders with buyer details, meet-up location, and payment method |
| Order Status Toggle | Mark orders as delivered or revert to pending with a single click |
| Buyer Communication | Contact buyers directly from the order history via the messaging system |
| Seller Profile | A public profile page displays the seller's details, rating, and all active products |

### Platform Features

| Feature | Description |
|---|---|
| Responsive Design | Fully functional on mobile, tablet, and desktop with adaptive layouts |
| Role Switching | Authenticated users can switch between buyer and seller modes from their profile |
| Seller Onboarding | Profile completion check and terms agreement before seller access is granted |
| Notification Centre | Centralised notification page with read, mark-all-read, and delete functionality |
| Contact & Support | Contact form with campus office details, quick support links, and an FAQ section |

---

*Documentation prepared by Group 37 — Web Application Development Project*
*UniMart Campus Marketplace | 2026*

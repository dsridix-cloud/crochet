# Maison Crochet - Artisanal Studio

Maison Crochet is a modern, responsive, and full-stack e-commerce web application tailored for an artisanal crafting studio. It features a complete shopping experience including product browsing, collections, a shopping cart, a secure checkout flow, user authentication, and a comprehensive customer account dashboard. 

The application is built with React 19, TypeScript, Tailwind CSS v4, and runs on a Node.js/Express backend optimized for production security and performance.

---

## 1. Project Overview

**Project Name:** Maison Crochet  
**Purpose:** To provide a premium, seamless e-commerce platform for handmade crochet products, gifts, and custom orders.  
**Target Users:** Customers looking for artisanal, handcrafted crochet products and custom commissions.  
**Main Features:**
- Dynamic product catalog with filtering, sorting, and categories.
- Shopping cart with real-time subtotal and shipping calculations.
- Secure, simulated checkout process with server-side validation.
- Complete customer authentication and account dashboard.
- Responsive, zero-overlap design with mobile drawers and desktop mega-menus.
- Global Toast notifications for user interactions.

**Architecture:** Single Page Application (SPA) with a custom React Context-based router on the frontend, served and backed by an Express server API that handles validation and configuration securely.

---

## 2. Technology Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 6 (Frontend) & esbuild (Backend bundle)
- **Styling:** Tailwind CSS v4
- **Icons:** `lucide-react`
- **Animations:** `motion` (Framer Motion)
- **Backend Framework:** Node.js with Express
- **State Management:** React Context API (`ShopContext`)
- **Routing:** Custom state-based router (no `react-router-dom`)
- **Database/Storage:** In-memory state and mock data structures (simulated database)
- **Authentication:** Simulated JWT/Context-based auth (accepts any valid format email/password for demo purposes)
- **Third-Party Services:** Google Gemini API (`@google/genai`) - integration ready.

---

## 3. Project Structure

```text
/
├── server.ts               → Express backend server entry point (API & static serving)
├── vite.config.ts          → Vite & Tailwind build configuration
├── package.json            → Project metadata and scripts
├── .env.example            → Environment variables template
└── src/
    ├── App.tsx             → Main application layout and router switch
    ├── main.tsx            → React DOM rendering entry point
    ├── types.ts            → Global TypeScript interfaces and data models
    ├── index.css           → Global stylesheet and Tailwind directives
    ├── components/         → Reusable UI components
    │   ├── account/        → Account dashboard sub-components (Profile, Orders, etc.)
    │   ├── Header.tsx      → Responsive navigation, mobile drawer, logo
    │   ├── Footer.tsx      → Global footer
    │   ├── ProductCard.tsx → Reusable product display card
    │   ├── CartDrawer.tsx  → Slide-out shopping cart
    │   ├── SearchModal.tsx → Global product search overlay
    │   └── Toast.tsx       → Notification system UI
    ├── context/
    │   └── ShopContext.tsx → Global state provider (Auth, Cart, Orders, Router)
    ├── data/
    │   ├── products.ts     → Mock product catalog database
    │   └── accountData.ts  → Mock user account and order history database
    └── pages/              → Application route components
        ├── HomePage.tsx    → Landing page
        ├── ShopPage.tsx    → Product listing and filtering
        ├── CheckoutPage.tsx→ Multi-step checkout process
        ├── AccountPage.tsx → Customer dashboard wrapper
        └── ...
```

---

## 4. Pages and Routes

The application uses a custom Context-based router (`currentPage` state). 

### Public Routes
- **`home`**: Landing page with hero banner, featured categories, and bestsellers.
- **`shop`**: Full product catalog with filters (category, price, sorting).
- **`collection-*`**: Specific category pages (e.g., `tops`, `bags`, `toys`, `home-decor`, `gifts`).
- **`product-detail`**: Individual product page showing images, price, reviews, and "Add to Cart".
- **`search-results`**: Displays items matching the user's search query.
- **`about` / `our-story`**: Information about the brand and artisans.
- **`faq` / `contact`**: Customer support and inquiry forms.
- **`custom-orders`**: Form for requesting bespoke crochet commissions.
- **`shipping-info` / `returns-refunds` / `privacy-policy` / `terms-conditions` / `care-guide`**: Legal and informational pages.

### Shopping Routes
- **`cart`**: Full-page view of the shopping cart (alternatively accessible via drawer).
- **`checkout`**: Address selection/entry and order review. (Redirects to Login if unauthenticated).
- **`payment`**: Final payment step (simulated).
- **`order-confirmation`**: Success page displaying the order number and summary.

### Authentication & Account Routes
- **`login` / `signup` / `forgot-password`**: Public authentication flows.
- **`account`**: Protected customer dashboard. Contains sub-tabs for Overview, Orders, Saved Addresses, Profile, and Settings.

---

## 5. Components

- **`Header.tsx`**: A highly responsive navigation bar. Implements CSS Grid to guarantee zero overlapping elements. On mobile/tablet, it collapses into a slide-over drawer containing all navigation links.
- **`CartDrawer.tsx`**: A slide-out panel accessible from any page to view cart contents, modify quantities, and proceed to checkout.
- **`ProductCard.tsx`**: Displays product image, title, price, and a quick "Add to Cart" or "Quick View" trigger.
- **`Toast.tsx`**: A global floating notification component that listens to the `ShopContext` to display success/error messages.
- **`SearchModal.tsx`**: A full-screen overlay for searching the product catalog.

---

## 6. Authentication & User Management

The application features a fully simulated authentication system managed within `ShopContext.tsx`.

- **Login Flow:** Users can log in using any valid email format and a password of at least 6 characters (simulated for demo purposes). 
- **Protected Routes:** If a user attempts to access `checkout`, `payment`, or `account` without being logged in, they are forcibly redirected to the `login` page.
- **Session:** State is held in React context (memory). 
- **Logout:** Clears the user object from state, clears personal data (addresses, history), and redirects to `home`.

---

## 7. Product / Collection System

- Data is loaded from `src/data/products.ts`.
- Supports categories (Tops, Bags, Toys, Home Decor, Gifts).
- **Filters/Sort:** Users can filter by category, price range, and sort by rating, price, or newest.
- **Product Details:** Includes dynamic color selection, image galleries, sizing charts, and stock indicators.

---

## 8. Cart & Checkout

- **Cart Management:** Users can add items, increment/decrement quantities, and remove items.
- **Server Validation:** Upon proceeding to checkout, the client calls `/api/orders/validate` to ensure prices, taxes, and shipping fees haven't been tampered with on the frontend.
- **Checkout Flow:**
  1. Login Check (forced login).
  2. Address Selection (select from saved or add new).
  3. Review cart totals (taxes, shipping, subtotal).
  4. Payment Page (simulated SSL checkout).
  5. Order Creation (adds order to user's account history and clears the cart).

---

## 9. Address Management

- Authenticated users can manage addresses in the `account-addresses` tab.
- Addresses can be set as `Default`.
- During Checkout, the user can pick from their saved addresses or enter a new one dynamically.

---

## 10. Orders

- After checkout, orders are pushed to the `accountOrders` array in state.
- **Order History:** Users can view a list of past orders in their Account dashboard.
- **Order Tracking:** Users can view a simulated timeline (Processing -> Shipped -> Delivered).

---

## 11. My Account / Profile

The Account Dashboard is a unified page (`AccountPage.tsx`) containing:
- **Overview:** Recent orders and default address snapshot.
- **Orders:** Full history and tracking.
- **Addresses:** CRUD operations for shipping addresses.
- **Settings/Profile:** Update personal details, change passwords, and manage notification preferences.

---

## 12. Navigation & Responsive UI

- **Desktop (`xl` and above):** Features a horizontal navigation bar with dropdowns (Mega Menu) for Collections.
- **Tablet & Mobile (`< xl`):** Header collapses into a clean 3-column layout (Menu Button, Logo, Action Icons). The Menu button opens a fluid, column-wise Slide-Over Drawer containing all navigational elements, account login, and nested collection accordions.
- **Rules Enforced:** Strict CSS Grid is utilized in the header to ensure zero overlapping, no horizontal scrollbars, and no hidden content on any screen size.

---

## 13. Notifications & Validation

- **Toast System:** Managed via `showToast` in Context. Displays contextual alerts (e.g., "Item added to cart", "Please enter a valid password").
- **Form Validation:** Client-side checks ensure required fields (email format, address lines, password length) are filled before advancing forms.

---

## 14. State Management

**React Context API (`ShopContext.tsx`)** is the sole state manager for the application. It handles:
- `currentPage`: Controls routing.
- `cartItems`: Array of cart objects.
- `wishlist`: Array of favorited products.
- `user`: Currently authenticated user profile.
- `accountOrders`: User's order history.
- `toast`: Notification queue.

State is shared globally, allowing components like the Header to instantly reflect cart count changes made from a Product page.

---

## 15. API / Backend

The application uses an **Express.js Server (`server.ts`)** to serve the API and the static Vite frontend.

### Endpoints
- `GET /api/health`: Returns server status and environment.
- `GET /api/config/public`: Returns safe public configuration variables.
- `POST /api/orders/validate`: 
  - **Purpose:** Secures the checkout process by validating cart totals on the server.
  - **Body:** `{ items: CartItem[], shippingMethod: string }`
  - **Response:** `{ valid: boolean, subtotal: number, shippingFee: number, estimatedTax: number, total: number }`

---

## 16. Database / Storage

Currently, the application operates completely in-memory using simulated datasets:
- **Products Table:** `src/data/products.ts`
- **Accounts Table:** `src/data/accountData.ts` (Seeds the initial order history and addresses).

*Note: As state is kept in React Context, data resets upon a hard browser refresh.*

---

## 17. Environment Variables

To run the application, configure a `.env` file in the project root:

```env
# Server Port
PORT=3000

# Application Environment (development or production)
NODE_ENV=development

# Gemini API Integration (Optional)
GEMINI_API_KEY=your_api_key_here

# App URL for absolute references
APP_URL=your_app_url_here
```

---

## 18. Installation Requirements

- **Node.js:** v18.x or higher (v22.x recommended based on package.json)
- **Package Manager:** `npm`, `yarn`, or `pnpm`

---

## 19. Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd maison-crochet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and adjust if necessary.
   ```bash
   cp .env.example .env
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start concurrently (Express API + Vite Middleware) at `http://localhost:3000`.

---

## 20. Available Scripts

- `npm run dev`: Starts the application in development mode using `tsx`.
- `npm run build`: Compiles the React frontend using Vite and bundles the Express backend using `esbuild`.
- `npm run start`: Starts the production server from the `dist` folder.
- `npm run preview`: Locally previews the production build.
- `npm run clean`: Removes the `dist` directory.
- `npm run lint`: Runs TypeScript compiler for type-checking without emitting files.

---

## 21. Production Build & Deployment

1. **Build the Application:**
   ```bash
   npm run build
   ```
   *This outputs a compiled frontend to `dist/` and a bundled server file to `dist/server.cjs`.*

2. **Run in Production:**
   Set `NODE_ENV=production` and start the server:
   ```bash
   NODE_ENV=production npm run start
   ```

3. **Deployment Considerations:**
   The app is configured to easily deploy to containerized environments like Google Cloud Run or Docker. The backend natively serves the static frontend assets when in production mode, meaning you only need to host the Node server on a single port.

---

## 22. Security

- **Server-Side Validation:** The cart subtotal and tax logic is validated on the backend to prevent malicious users from altering prices via client-side DevTools.
- **Security Headers:** The Express backend implements strict headers including `Content-Security-Policy`, `X-Content-Type-Options`, and `X-XSS-Protection`.
- **Environment Isolation:** Sensitive variables like API keys remain on the server and are not bundled into the Vite frontend unless prefixed with `VITE_`.
- **Production Stripping:** Debugging tools like `console.log` and `debugger` are automatically removed from the production build by `esbuild`.

---

## 23. Troubleshooting

- **Error: Port 3000 is already in use:** Change the `PORT` variable in your `.env` file or kill the existing process using port 3000.
- **HMR (Hot Module Replacement) Not Working:** Check if `DISABLE_HMR=true` is set in your environment variables.
- **Cart resets on refresh:** This is expected behavior as the application currently utilizes Context memory without `localStorage` persistence.

---

## 24. Development Guidelines

- **Routing:** Do not use `react-router-dom`. Add new pages to `src/pages/`, create a new type literal in `src/types.ts` (`PageType`), and add the switch case to `src/App.tsx`.
- **Styling:** Use standard Tailwind CSS utility classes. Avoid writing custom CSS in `index.css` unless defining base layer abstractions.
- **Icons:** Only use icons from the `lucide-react` library.
- **State:** Any cross-component data should be added to `ShopContext.tsx`. 

---

## 25. Complete Project Flow

```text
User Opens Website (http://localhost:3000)
        ↓
Home Page (`HomePage.tsx`)
        ↓
Navigates via Header to "Shop All" (`ShopPage.tsx`)
        ↓
Filters for "Bags", Clicks a Product
        ↓
Product Detail Page (`ProductDetailPage.tsx`)
        ↓
Selects Color/Size, clicks "Add to Bag"
        ↓
Global State Updates -> Cart Drawer Slides Open (`CartDrawer.tsx`)
        ↓
Clicks "Checkout"
        ↓
Router checks Context: User is NULL
        ↓
Redirected to Login (`LoginPage.tsx`)
        ↓
User enters credentials -> Context updates User State
        ↓
Redirected back to Checkout (`CheckoutPage.tsx`)
        ↓
Selects Saved Delivery Address
        ↓
Proceeds to Payment (`PaymentPage.tsx`)
        ↓
Server-Side API Call validates Cart Totals (`POST /api/orders/validate`)
        ↓
Clicks "Pay Now"
        ↓
Order added to Account History, Cart Emptied
        ↓
Order Confirmation Page (`OrderConfirmationPage.tsx`)
        ↓
Navigates to My Account -> Orders (`AccountOrdersList.tsx`) to track shipment.
```

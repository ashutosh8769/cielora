# Admin Panel Implementation Plan

## Overview
This plan outlines the development of the Cielora Admin Panel, designed to give administrators full control over the website's content, products, and store locations. The goal is to build an intuitive dashboard where changes can be made without writing or modifying any code.

## 1. Product Management
**Goal:** Allow admins to manage the entire product catalog (charms, bracelets, rings, etc.).

**Features:**
*   **Add/Edit/Delete Products:** A central table to view all existing products.
*   **Product Information & Descriptions:** Forms to edit the product title, rich-text description, price, category, and inventory status.
*   **Product Sizes & Custom Options:** An input field to set custom sizes for each product (e.g. text options like `11, 6, 5, M, L` or `One Size`). The sizes dropdown on the inner product page will dynamically populate from this input.
*   **Technical Specifications & Product Details:** Customizable attributes for the product "Details" accordion (such as *Item Code*, *Gender*, *Plating*, *Material*, *Color*, *Minimum Length*, etc.) so they are not hardcoded.
*   **Image Management:** Ability to upload, remove, and reorder product images.

## 2. Store Locator Management
**Goal:** Manage physical store locations displayed on the `/stores` page.

**Features:**
*   **Add/Edit/Delete Stores:** A dedicated section to manage retail locations.
*   **Store Details:** Input fields for the store name, full address, opening hours, and contact information.
*   **Google Maps Integration:** A field to paste a Google Maps link (or embed code) so that users can easily get directions to the store.

## 3. Homepage Content & Layout Management
**Goal:** Control the dynamic elements on the main homepage to keep it fresh and relevant.

**Features:**
*   **Banner Management:** Upload new banner images, set their promotional text, and add the redirect links (e.g., linking a banner to a new "Summer Collection").
*   **Featured Products Groups:** Select specific products to be featured in groups (like "Trending Now" or "Gift Ideas") on the homepage.
*   **Visibility Toggles:** Turn specific homepage sections or banners on/off based on active promotions.

## 4. Product Card Labels Management
**Goal:** Highlight specific items with customizable badges/labels across the store.

**Features:**
*   **Add/Edit/Delete Labels:** Create tags like "Best Seller", "New In", "Limited Edition", or "Sale".
*   **Assign Labels:** During product creation or editing, select which labels should appear over the product's image on the product cards.

---
## 5. Order & Customer Management [Suggested]
**Goal:** Track customer purchases and support order lookups (e.g., verifying the Order Status lookup on the `/profile` page).

**Features:**
*   **Order Dashboard:** A central view to monitor all transactions, customer names, contact info, total pricing, and dates.
*   **Order Status Controls:** Update statuses (e.g., *Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*) so that customers can query them live.
*   **Tracking Details:** Input field for courier service and tracking code (e.g., Royal Mail tracking).

## 6. Collections & Category Navigation Management [Suggested]
**Goal:** Manage active collections and dynamically control navigation bar tabs.

**Features:**
*   **Navbar Menu Customizer:** Reorder, rename, add, or remove tabs on the navigation bar (e.g., adding a new category "Charms" or "Outlet") without changing the code.
*   **Collection Landing Pages:** Edit collection cover pictures, metadata, and link products to specific collections (e.g., "Arcadia Collection", "Luminis Edition").

## 7. Security, Authentication & User Roles [Suggested]
**Goal:** Restrict admin dashboard access to authorized administrators.

**Features:**
*   **Secure Route Shielding:** Require credentials (email/password) to enter `/admin` page paths using Next.js Middleware.
*   **Role-Based Access Control (RBAC):**
    *   *Owner:* Full control (manage products, view sales, manage admin users).
    *   *Editor:* Can modify products, homepage layouts, labels, and stores.
    *   *Support/Viewer:* Can look up order statuses and view basic analytics.

## 8. Dashboard Analytics & Reporting [Suggested]
**Goal:** Display real-time business insights on the dashboard homepage.

**Features:**
*   **Sales Tracking:** Visual charts showing daily, weekly, or monthly revenue.
*   **Low Stock Alerts:** Automatically flag products whose inventory drops below a specific threshold (e.g., < 5 items).
*   **Search Insights:** Display what keywords users are typing into the search bar.

## 9. Proposed Tech Stack & Data Flow Strategy [Suggested]
**Goal:** Move from static JSON mock arrays (`src/data/products.ts`) to a production-ready database.

**Recommendations:**
*   **Database:** 
    *   *Option A (Recommended):* PostgreSQL with **Prisma ORM** (scalable, structured schemas).
    *   *Option B:* **Supabase** (includes database, auth, and asset storage in one platform).
    *   *Option C (Simple):* MongoDB with Mongoose (flexible schema for products with multiple color options).
*   **Authentication:** **NextAuth.js (Auth.js)** for secure session handling.
*   **Media Storage:** **Cloudinary** or **AWS S3 / Supabase Storage** to upload, crop, and deliver fast, optimized product/banner images.

## 10. Global Store, Policy & Payment Badge Settings [Suggested]
**Goal:** Control the visibility, text, dynamic calculations, and global policies (like shipping & returns) on the product detail pages.

**Features:**
*   **Payment Option Toggles:** Master toggles to show/hide the Klarna and PayPal promotional boxes on the product page.
*   **Dynamic Price Installment Division:** Choose how many installments (e.g., 3 payments) to display, so the system automatically computes and displays the correct value (e.g., `Product Price / 3`) instead of showing static hardcoded text.
*   **Custom Legal Disclaimer Editor:** Editable input fields for financing legal copy (such as *"18+, T&C apply, Credit subject to status"*), allowing admins to update guidelines or interest rates.
*   **Global Shipping & Returns Policy Manager:** Form inputs to customize the shipping terms, return timelines, contact information link, and handcrafted origins (e.g., *"Our jewelry is made in Spain and 100% handcrafted"*) shown in the "Shipping & Returns" accordion.

---
## Next Steps
To implement this, we will need to:
1.  **Configure Database & ORM:** Install and initialize the database connection (e.g., Prisma + PostgreSQL).
2.  **Define Schema Models:** Create schemas for `Product`, `Store`, `Order`, `HomepageBanner`, `Label`, and `AdminUser`.
3.  **Build API Routes:** Implement Server Actions or API routes under `src/app/api/` for CRUD operations.
4.  **Create /admin Route & Sidebar Layout:** Design a dark-mode premium navigation dashboard with sections for Products, Orders, Stores, Layout, and Settings.
5.  **Secure Admin Views:** Integrate authentication middleware to restrict non-admins.
6.  **Refactor Client Views:** Update client-facing pages (e.g., homepage, products list, stores page) to fetch their data from the database APIs instead of `products.ts`.


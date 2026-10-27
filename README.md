# Smart Chemist – Online Ordering and Product Returns System
**Community Service Learning (CSL) Project Prototype**  
*School of Science and Technology*

A modern, responsive web application prototype designed for a community pharmacy/chemist. The platform streamlines two primary operational workflows:
1. **Customer Online Ordering:** Allows customers to browse products, filter by category and stock, build a cart, and place counter pickup or delivery orders without collecting unnecessary personal or medical data.
2. **Staff Inventory Returns & Supplier RMA Tracking:** Enables authorised pharmacy staff to log expired, damaged, or erroneous medication batches, quarantine stock, and dispatch formal replacement or credit requests to wholesale distributors.

---

## 🛠️ Technology Stack
- **Frontend Framework:** React 18 (JavaScript, JSX)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS (Custom palette: Chemist Blue, White, Pharma Green, Alert Orange)
- **Icons:** Lucide React
- **Architecture:** Zero backend, zero database, zero authentication, mock data in React State with safe local storage persistence.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will launch at: **`http://localhost:3000/`**

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Architecture

```
smart-chemist/
├── index.html                   # HTML entry point with Google Fonts (Inter & Outfit)
├── package.json                 # Project configuration and dependencies
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS configuration with custom theme tokens
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main application state and page router
│   ├── index.css                # Tailwind directives and custom utility classes
│   ├── data/
│   │   └── mockData.js          # Realistic mock inventory, orders, returns, and suppliers
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx       # Header bar with brand, notification dropdown, and admin user
│   │   │   ├── Sidebar.jsx      # Responsive collapsible navigation
│   │   │   ├── StatCard.jsx     # Metric cards with subtle gradients
│   │   │   ├── Badge.jsx        # Status tags with distinct semantic colors
│   │   │   ├── Modal.jsx        # Accessible dialog wrapper
│   │   │   ├── EmptyState.jsx   # Filter and search empty states
│   │   │   └── Toast.jsx        # Real-time state change notifications
│   │   ├── products/
│   │   │   └── ProductCard.jsx  # Pharmaceutical product card with stock badges
│   │   ├── orders/
│   │   │   └── OrderDetailsModal.jsx # Modal to inspect and change order statuses
│   │   ├── returns/
│   │   │   ├── NewReturnModal.jsx    # Defect intake form for staff
│   │   │   └── ReturnDetailsModal.jsx # Return details & supplier escalation
│   │   └── suppliers/
│   │       ├── NewSupplierRequestModal.jsx      # Wholesale claim form
│   │       └── SupplierRequestDetailsModal.jsx  # Status update & RMA details
│   └── pages/
│       ├── DashboardPage.jsx        # High-level KPIs, welcome banner, and recent tables
│       ├── CatalogPage.jsx          # Dual Grid/Table catalog with search & filters
│       ├── OrdersPage.jsx           # Customer ordering interface & orders directory
│       ├── ReturnsPage.jsx          # Quarantine defect log & staff intake form
│       ├── SupplierRequestsPage.jsx # Wholesale claim tracking with disclaimer
│       ├── ReportsPage.jsx          # Visual analytics & CSL Project Targets scorecard
│       └── SettingsPage.jsx         # Pharmacy configuration & project credits
```

---

## 🎯 Project Evaluation Targets (CSL Verification)
The **Reports & Targets** page tracks compliance against the following school requirements:
- **At least 10 test orders:** Initialised with 10 simulated customer orders.
- **At least 10 product-issue records:** Initialised with 10 quarantine defect cases.
- **At least 5 supplier request records:** Initialised with 6 wholesale claims.
- **At least 80% positive user feedback:** Met (92% satisfaction index).
- **At least 90% functional test cases:** Met (96% passing rate).

---

## ⚠️ Important Prototype Disclaimer
- This project is an **academic prototype demonstration** developed for the Community Service Learning curriculum.
- No live database or backend is connected; all data persists in temporary React state.
- **Supplier Policy Notice:** Filing a supplier request or replacement claim does not guarantee approval, as outcomes depend strictly on individual supplier policies, warranties, and defect verification.
# smart-chemist

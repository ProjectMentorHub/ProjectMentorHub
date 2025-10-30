# Projects - Premium BTech Project Kits Marketplace

A minimal, premium black-and-white website to sell CSE, EEE & MATLAB BTech project kits with complete documentation, source code, and resources. Built with React, Tailwind CSS, and Framer Motion.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- 🛒 **Shopping Cart**: Add/remove items, update quantities, persistent cart with localStorage
- 📱 **Responsive Design**: Fully responsive, mobile-first approach
- 🎨 **Premium UI**: Monochrome palette (#000, #111, #fff), elegant typography, smooth animations
- 🏷️ **Smart Filtering**: Filter by category (CSE/EEE/MATLAB), tags, and price range
- 👨‍💼 **Admin Panel**: Add/delete projects via localStorage
- 💾 **Local Storage**: All data stored locally in browser
- ♿ **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- 🔍 **SEO**: Meta tags, semantic markup

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **State Management**: React Context API, localStorage
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.js
│   ├── CartDrawer.js
│   ├── ProjectCard.js
│   ├── FilterBar.js
│   └── LoadingSkeleton.js
├── pages/            # Page components
│   ├── Home.js
│   ├── Catalog.js
│   ├── ProjectDetails.js
│   ├── Checkout.js
│   ├── Dashboard.js
│   ├── Admin.js
│   ├── Success.js
│   └── Cancel.js
├── context/          # React Context providers
│   └── CartContext.js
├── data/             # Data and utilities
│   └── data.js
└── App.js            # Main app component
```

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### As a Customer

1. Browse projects on the **Catalog** page
2. Filter by category (CSE/EEE), tags, or price range
3. Click on a project to view details
4. Add items to cart
5. Go to checkout and enter your details
6. Complete the order
7. View orders in **Dashboard**

### As an Admin

1. Navigate to **Admin** panel from the navbar
2. Add new projects with:
   - Title, description, category, price
   - Tags and features
   - Cover image upload
3. Delete existing projects
4. Manage project inventory

All data is stored in localStorage and persists across sessions.

## Project Features

### Pages

- **Home**: Hero section, features, call-to-action
- **Catalog**: Product listing with filters
- **Project Details**: Individual product information
- **Checkout**: Order form
- **Dashboard**: All orders
- **Admin**: Project management
- **Success/Cancel**: Order completion pages

### Components

- **Navbar**: Responsive navigation with cart icon
- **CartDrawer**: Slide-out shopping cart
- **ProjectCard**: Product display card
- **FilterBar**: Search and filter products

## Styling

The project uses Tailwind CSS with a custom monochrome palette:

- Primary: `#000000` (Black)
- Secondary: `#111111` (Dark Gray)
- Background: `#FFFFFF` (White)
- Accents: `#F3F4F6` (Light Gray)

Typography:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## Data Storage

All data is stored in browser localStorage:

- `projects`: Product catalog
- `cart`: Current shopping cart
- `orders`: All orders

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment

The project can be deployed to:

- **Vercel**: Connect GitHub repo for automatic deployment
- **Netlify**: Connect GitHub repo for automatic deployment
- **GitHub Pages**: Use `gh-pages` package
- **Any static host**: Upload the `build/` folder

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## License

MIT

## Contributing

Contributions, issues, and feature requests are welcome!

## Support

For support, email support@projects.com or open an issue.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion.

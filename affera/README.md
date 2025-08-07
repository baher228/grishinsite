# Affera - Professional Tools E-commerce Website

A modern, responsive e-commerce website for construction and plumbing tools built with React, TypeScript, and styled-components.

## 🚀 Features

### Core Functionality

- **Product Catalog**: Browse tools by categories (Tools, Plumbing, Construction)
- **Shopping Cart**: Add/remove items, update quantities, real-time price calculations
- **Search**: Full-text search across products, brands, and descriptions
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark Theme**: Professional dark color scheme with high contrast

### User Experience

- **Hero Section**: Engaging landing page with call-to-action
- **Product Cards**: Rich product information with ratings and reviews
- **Cart Management**: Persistent cart state with item counter
- **Search Results**: Dedicated search page with filtering
- **Loading States**: Smooth loading indicators for better UX

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Global state management for cart functionality
- **Styled Components**: CSS-in-JS with theme support
- **Component Architecture**: Modular, reusable components

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Styled Components, CSS-in-JS
- **Routing**: React Router v6
- **Icons**: React Icons (Feather Icons)
- **State Management**: React Context API
- **Build Tool**: Create React App

## 📁 Project Structure

```
feronova/
├── public/
│   ├── index.html
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Container/
│   │   │   ├── Icon/
│   │   │   └── Loading/
│   │   ├── home/
│   │   │   └── Hero/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   └── product/
│   │       ├── ProductCard/
│   │       └── ProductGrid/
│   ├── context/
│   │   └── CartContext.tsx
│   ├── data/
│   │   └── products.ts
│   ├── pages/
│   │   ├── Home/
│   │   ├── Cart/
│   │   └── Search/
│   ├── styles/
│   │   └── GlobalStyles.ts
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## 🎨 Design System

### Colors

- **Primary**: `#1a1a1a` (Dark charcoal)
- **Accent**: `#dc3545` (Red)
- **Background**: `#ffffff` (White)
- **Text**: `#333333` (Dark gray)
- **Border**: `#e0e0e0` (Light gray)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Components

- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Rounded (8px), hover effects
- **Forms**: Rounded inputs (25px for search)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Launch

1. **Clone the repository** (if you haven't already):

   ```sh
   git clone <repository-url>
   cd feronova
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn
   ```

3. **Start the development server**:

   ```sh
   npm start
   ```

   or

   ```sh
   yarn start
   ```

4. **Open your browser** and go to [http://localhost:3000](http://localhost:3000)

The app will automatically reload if you make changes to the source files.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Pages & Routes

- `/` - Home page with hero section and featured products
- `/tools` - Tools category page
- `/plumbing` - Plumbing category page
- `/construction` - Construction category page
- `/brands` - Brands page
- `/sale` - Sale items page
- `/cart` - Shopping cart page
- `/search?q=<query>` - Search results page

## 🛒 Cart Functionality

The shopping cart includes:

- Add items to cart from product cards
- Update item quantities with +/- buttons
- Remove items from cart
- Real-time price calculations (subtotal, shipping, total)
- Persistent cart state across page navigation
- Cart counter in header

## 🔍 Search Functionality

- Full-text search across product names, brands, descriptions, and categories
- Search form in header with Enter key support
- Dedicated search results page
- "No results" state with helpful messaging

## 🎯 Product Data

Products include:

- Basic info (name, price, brand, category)
- Images from Unsplash
- Ratings and review counts
- Detailed descriptions
- Stock status
- Original prices for sale items

## 🌟 Key Components

### ProductCard

- Displays product information
- Add to cart functionality
- Wishlist button (UI only)
- Hover effects and animations

### Header

- Navigation menu
- Search functionality
- Cart icon with item counter
- User account icon (UI only)

### Hero

- Engaging headline and description
- Call-to-action button
- Dark gradient background with subtle pattern

### Footer

- Company information
- Quick links
- Customer service links
- Social media icons
- Newsletter signup (UI only)

## 🔧 Customization

### Adding New Products

Edit `src/data/products.ts` to add new products to the catalog.

### Styling

Global styles are defined in `src/styles/GlobalStyles.ts`. Component-specific styles use styled-components.

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in Header component

## 📈 Future Enhancements

- User authentication and accounts
- Product reviews and ratings system
- Wishlist functionality
- Order history
- Payment integration
- Product filtering and sorting
- Inventory management
- Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

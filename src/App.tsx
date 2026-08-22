import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { LightboxModal } from './components/LightboxModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ShippingInfoPage } from './pages/ShippingInfoPage';
import { ReturnsRefundsPage } from './pages/ReturnsRefundsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { CareGuidePage } from './pages/CareGuidePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { AccountPage } from './pages/AccountPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      // 1. Home
      case 'home':
        return <HomePage />;
      
      // 2. Shop / All Products
      case 'shop':
        return <ShopPage />;
      
      // 3. Crochet Tops Collection
      case 'collection-tops':
        return <CollectionPage categoryKey="tops" />;
      
      // 4. Crochet Bags Collection
      case 'collection-bags':
        return <CollectionPage categoryKey="bags" />;
      
      // 5. Crochet Toys Collection
      case 'collection-toys':
        return <CollectionPage categoryKey="toys" />;
      
      // 6. Home & Decor Collection
      case 'collection-home-decor':
        return <CollectionPage categoryKey="home-decor" />;
      
      // 7. Handmade Gifts Collection
      case 'collection-gifts':
        return <CollectionPage categoryKey="gifts" />;
      
      // Generic collection fallback
      case 'collection':
        return <CollectionPage />;
      
      // 8. Product Details page
      case 'product-detail':
        return <ProductDetailPage />;
      
      // 9. Search Results page
      case 'search-results':
        return <SearchResultsPage />;
      
      // 10. Wishlist page
      case 'wishlist':
        return <WishlistPage />;
      
      // 11. Cart page
      case 'cart':
        return <CartPage />;
      
      // 12. Checkout page
      case 'checkout':
        return <CheckoutPage />;
      
      // 13. Payment page
      case 'payment':
        return <PaymentPage />;
      
      // 14. Order Confirmation / Success page
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      
      // 15. About Us page
      case 'about':
        return <AboutPage />;
      
      // 16. Our Story page
      case 'our-story':
        return <OurStoryPage />;
      
      // 17. Custom Orders page
      case 'custom-orders':
        return <CustomOrderPage />;
      
      // 18. FAQ page
      case 'faq':
        return <FaqPage />;
      
      // 19. Contact Us page
      case 'contact':
        return <ContactPage />;
      
      // 20. Shipping Information page
      case 'shipping-info':
        return <ShippingInfoPage />;
      
      // 21. Returns & Refunds page
      case 'returns-refunds':
        return <ReturnsRefundsPage />;
      
      // 22. Privacy Policy page
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      
      // 23. Terms & Conditions page
      case 'terms-conditions':
        return <TermsConditionsPage />;
      
      // 24. Care Guide page
      case 'care-guide':
        return <CareGuidePage />;

      // 25. Customer Auth: Login
      case 'login':
        return <LoginPage />;

      // 26. Customer Auth: Sign Up
      case 'signup':
        return <SignUpPage />;

      // 27. Customer Auth: Forgot Password
      case 'forgot-password':
        return <ForgotPasswordPage />;

      // 28. Customer Account Dashboard
      case 'account':
        return <AccountPage />;
      
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EE] text-[#332C28] font-sans antialiased selection:bg-[#D9A7A0] selection:text-[#332C28]">
      {/* Top Header */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <LightboxModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

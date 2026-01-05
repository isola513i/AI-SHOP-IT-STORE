import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { BrandsStrip } from './components/BrandsStrip';
import { DailyDeal } from './components/DailyDeal';
import { ProductCard } from './components/ProductCard';
import { BottomNavigation } from './components/BottomNavigation';
import { Store } from './components/Store';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Compare } from './components/Compare';
import { Wishlist } from './components/Wishlist';
import { Profile } from './components/Profile';
import { LoginModal } from './components/LoginModal';
import { SideMenu } from './components/SideMenu'; // New Component
import { ALL_PRODUCTS } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');
  const [isMenuVisible, setMenuVisible] = useState(false);
  
  // Search State (Lifted)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [compareItem, setCompareItem] = useState<Product | null>(null);

  // Auth Helper
  const handleAuthGuard = (targetScreen: string) => {
    if (isLoggedIn) {
        handleNavigation(targetScreen);
    } else {
        setPendingNavigation(targetScreen);
        setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    if (pendingNavigation) {
        handleNavigation(pendingNavigation);
        setPendingNavigation(null);
    }
  };

  // Cart Helper Functions
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Wishlist Helper Functions
  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isProductWishlisted = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  // Derived State
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Navigation Logic
  const handleProductSelect = (product: Product) => {
    setPreviousScreen(currentScreen);
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  const handleCartItemPress = (item: CartItem) => {
    setPreviousScreen('cart');
    setSelectedProduct(item);
    setCurrentScreen('detail');
  };

  const handleBack = () => {
    setCurrentScreen(previousScreen); 
    if (previousScreen !== 'compare' && currentScreen !== 'compare') {
      setSelectedProduct(null);
    }
  };

  const handlePlaceOrder = () => {
    alert('Order Confirmed\n\nThank you for your purchase! Your order is being processed.');
    setCartItems([]);
    setCurrentScreen('home');
  };

  const handleComparePress = () => {
    if (selectedProduct) {
        const competitor = ALL_PRODUCTS.find(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);
        
        if (competitor) {
            setCompareItem(competitor);
            setCurrentScreen('compare');
        } else {
            alert('No similar products found to compare');
        }
    }
  };

  const handleNavigation = (screen: string) => {
    // Intercept profile navigation for auth check
    if (screen === 'profile' && !isLoggedIn) {
        handleAuthGuard('profile');
        return;
    }

    if (screen === 'compare') {
        setCompareItem(null);
    }
    // Update previous screen logic to allow going back from tabs naturally
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  // Search Logic (Header triggered)
  const handleSearchSubmit = (query: string) => {
    setGlobalSearchQuery(query);
    if (query.trim().length > 0) {
        setCurrentScreen('store');
    }
  };

  // Filter Data for Home Screen Sections
  const bestSellers = ALL_PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 6);
  const notebooks = ALL_PRODUCTS.filter(p => p.category === 'Notebook').slice(0, 6);
  const gpus = ALL_PRODUCTS.filter(p => p.category === 'GPU').slice(0, 6);

  return (
    <div className="max-w-md mx-auto w-full h-[100dvh] bg-background-light dark:bg-background-dark relative shadow-2xl overflow-hidden flex flex-col">
      {/* Show Header on Home and Store screens */}
      {(currentScreen === 'home' || currentScreen === 'store') && (
        <Header 
          cartCount={totalCartItems} 
          onCartClick={() => setCurrentScreen('cart')}
          onMenuClick={() => setMenuVisible(true)}
          initialQuery={globalSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />
      )}
      
      {currentScreen === 'detail' ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={handleBack} 
          onAddToCart={addToCart}
          cartItemCount={totalCartItems}
          onCartPress={() => setCurrentScreen('cart')}
          onComparePress={handleComparePress}
          isWishlisted={selectedProduct ? isProductWishlisted(selectedProduct.id) : false}
          onToggleWishlist={() => selectedProduct && toggleWishlist(selectedProduct)}
        />
      ) : currentScreen === 'compare' ? (
        <Compare 
            productA={compareItem ? selectedProduct : null}
            productB={compareItem ? compareItem : null}
            onBack={() => {
                if (compareItem && selectedProduct) {
                    setCurrentScreen('detail');
                } else {
                    setCurrentScreen('home');
                }
            }}
            onAddToCart={(product) => {
                addToCart(product);
                alert(`Added ${product.title} to cart`);
            }}
            cartItemCount={totalCartItems}
            onCartClick={() => setCurrentScreen('cart')}
            allProducts={ALL_PRODUCTS}
        />
      ) : currentScreen === 'cart' ? (
        <Cart 
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onBack={() => setCurrentScreen('home')}
          onCheckoutPress={() => handleAuthGuard('checkout')}
          onItemPress={handleCartItemPress}
          isLoggedIn={isLoggedIn}
        />
      ) : currentScreen === 'checkout' ? (
        <Checkout 
          totalAmount={cartTotalAmount}
          onBack={() => setCurrentScreen('cart')}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : currentScreen === 'wishlist' ? (
        <Wishlist 
          wishlistItems={wishlistItems}
          onRemove={(id) => {
             const product = wishlistItems.find(i => i.id === id);
             if (product) toggleWishlist(product);
          }}
          onAddToCart={(product) => {
             addToCart(product);
             alert(`Added ${product.title} to cart`);
          }}
          onNavigate={handleNavigation}
          onBack={() => setCurrentScreen('home')}
          cartItemCount={totalCartItems}
          onCartPress={() => setCurrentScreen('cart')}
          onProductPress={handleProductSelect}
          onSearchPress={() => setCurrentScreen('store')}
        />
      ) : currentScreen === 'profile' ? (
        <Profile 
          onNavigate={handleNavigation}
          onLogout={() => {
            setIsLoggedIn(false);
            setCurrentScreen('home');
            alert('You have been logged out.');
          }}
        />
      ) : currentScreen === 'home' ? (
        <main className="flex-1 w-full overflow-y-auto no-scrollbar pt-16 pb-32">
          <HeroBanner onShopNow={() => setCurrentScreen('store')} />
          
          <DailyDeal onPress={handleProductSelect} />
          
          <BrandsStrip onBrandSelect={handleSearchSubmit} />
          
          {/* 1. Best Sellers Section */}
          <section className="mt-4 pt-4">
            <div className="flex items-center justify-between px-4 pb-4">
              <h2 className="text-[#111318] dark:text-white text-[20px] font-bold leading-tight">
                Best Sellers
              </h2>
              <button 
                onClick={() => setCurrentScreen('store')}
                className="text-primary text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory">
              {bestSellers.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={handleProductSelect}
                  onAddToCart={addToCart}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* 2. Notebooks Section */}
          <section className="mt-2 pt-4">
            <div className="flex items-center justify-between px-4 pb-4">
              <h2 className="text-[#111318] dark:text-white text-[20px] font-bold leading-tight">
                Notebooks
              </h2>
              <button 
                onClick={() => setCurrentScreen('store')}
                className="text-primary text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory">
              {notebooks.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={handleProductSelect}
                  onAddToCart={addToCart}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* 3. GPU Series Section */}
          <section className="mt-2 pt-4">
            <div className="flex items-center justify-between px-4 pb-4">
              <h2 className="text-[#111318] dark:text-white text-[20px] font-bold leading-tight">
                GPU Series
              </h2>
              <button 
                onClick={() => setCurrentScreen('store')}
                className="text-primary text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory">
              {gpus.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={handleProductSelect}
                  onAddToCart={addToCart}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          </section>
        </main>
      ) : currentScreen === 'store' ? (
        <Store 
          onProductSelect={handleProductSelect} 
          onAddToCart={addToCart}
          wishlistItems={wishlistItems}
          onToggleWishlist={toggleWishlist}
          searchQuery={globalSearchQuery}
          setSearchQuery={setGlobalSearchQuery}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Work in progress
        </div>
      )}
      
      {(currentScreen !== 'detail' && currentScreen !== 'cart' && currentScreen !== 'checkout') && (
        <BottomNavigation activeTab={currentScreen} onNavigate={handleNavigation} />
      )}

      {/* Side Menu Overlay */}
      <SideMenu 
        visible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
        onNavigate={handleNavigation}
      />

      {/* Auth Modal Overlay */}
      <LoginModal 
        visible={showLoginModal} 
        onClose={() => {
            setShowLoginModal(false);
            setPendingNavigation(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
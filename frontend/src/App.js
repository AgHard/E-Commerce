import React, { useState, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CategoryProvider } from './context/CategoryContext';
import { CartProvider } from './context/CartContext';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from './Components/Header';
// Use React.lazy for lazy loading components
const ProductList = React.lazy(() => import('./Components/ProductList'));
const ProductDetails = React.lazy(() => import('./Components/ProductDetails'));
const CartOverlay = React.lazy(() => import('./Components/CartOverlay'));

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://scandiwebtask-c44363ca7aa2.herokuapp.com/backend/graphql.php',  // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

function App() {
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  // Memoize functions to prevent unnecessary re-renders
  const openCartOverlay = useCallback(() => {
    setIsCartOverlayOpen(true);
  }, []);

  const closeCartOverlay = useCallback(() => {
    setIsCartOverlayOpen(false);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <CategoryProvider>
          <CartProvider>
            <div>
              <Header />
              {/* Suspense to show a fallback while components load */}
              <Suspense fallback={<div>Loading...</div>}>
                {/* Lazy load CartOverlay */}
                <CartOverlay isOpen={isCartOverlayOpen} onClose={closeCartOverlay} />
                <Routes>
                  {/* Lazy load ProductList and ProductDetails */}
                  <Route path="/" element={<ProductList />} />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetails openCartOverlay={openCartOverlay} />
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </CartProvider>
        </CategoryProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

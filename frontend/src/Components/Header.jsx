import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';
import CartOverlay from './CartOverlay';
import { request, gql } from 'graphql-request';
import './Header.css';
import Logo from '../assets/logo.svg';
import Cart from '../assets/cart.svg';

const Header = () => {
  const { activeCategory, setActiveCategory } = useCategory();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch categories asynchronously
  const fetchCategories = async () => {
    const query = gql`
      {
        categories {
          id
          name
        }
      }
    `;

    try {
      const data = await request('http://localhost:8000/graphql.php', query);
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // Category name is already a string, so no change needed
    setActiveCategory(category);
    navigate('/');
  };

  const toggleCartOverlay = () => {
    setCartOpen(true);
  };

  const closeCartOverlay = () => {
    setCartOpen(false);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header-container">
      <nav className="nav" data-testid="category-container">
        {loading ? (
          <span>Loading categories...</span>
        ) : (
          categories.map((category) => (
            <span
              key={category.id}
              className={`nav-link ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.name)}
              data-testid={`category-link-${category.name}`}
            >
              {category.name}
            </span>
          ))
        )}
      </nav>

      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="cart-icon-container" data-testid="cart-btn" onClick={toggleCartOverlay}>
        <img src={Cart} alt="Cart" className="cart-icon" />
        {totalItems > 0 && (
          <div className="cart-item-count">
            {totalItems}
          </div>
        )}
      </div>

      {isCartOpen && <CartOverlay isOpen={isCartOpen} onClose={closeCartOverlay} data-testid="cart-overlay" />}
    </header>
  );
};

export default Header;

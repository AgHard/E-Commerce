import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { request, gql } from 'graphql-request';
import CartIcon from '../assets/carticon.svg';
import { Link } from 'react-router-dom';
import { useCategory } from '../context/CategoryContext';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const { activeCategory } = useCategory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      const endpoint = 'https://scandiwebtask-c44363ca7aa2.herokuapp.com/backend/graphql.php';
      const query = gql`
        query($category: String) {
          products(category: $category) {
            id
            name
            inStock
            category
            imageUrl
            prices {
              amount
              currencySymbol
            }
            attributes {
              id
              name
              items {
                id
                display_value
                value
              }
            }
          }
        }
      `;

      const categoryValue = activeCategory === 'all' ? null : activeCategory === 'clothes' ? '2' : '3';

      try {
        const data = await request(endpoint, query, { category: categoryValue });
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleQuickShop = (event, product) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedColor = product.attributes.find(attr => attr.name === "Color")?.items[0]?.value || "";
    const selectedCapacity = product.attributes.find(attr => attr.name === "Capacity")?.items[0]?.value || "";
    const selectedSize = product.attributes.find(attr => attr.name === "Size")?.items[0]?.value || "";
    const selectedTouchID = product.attributes.find(attr => attr.name === "Touch ID in keyboard")?.items[0]?.value || "";
    const selectedUSBPorts = product.attributes.find(attr => attr.name === "With USB 3 ports")?.items[0]?.value || "";

    const productWithDefaults = {
      ...product,
      selectedColor,
      selectedCapacity,
      selectedSize,
      selectedTouchID,
      selectedUSBPorts,
      price: product.prices?.[0]?.amount || 0,
      quantity: 1,
    };

    addToCart(productWithDefaults);
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => activeCategory === 'clothes' ? product.category === '2' : product.category === '3');

  return (
    <div className="product-list-container">
      <h2>{activeCategory === 'all' ? 'all' : activeCategory}</h2>
      {loading ? (
        <p>Loading products...</p> // Display loading message while fetching
      ) : (
        <div className="product-grid">
          {filteredProducts.length === 0 && <p>No products available.</p>}
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${product.inStock ? '' : 'out-of-stock'}`}
              data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img
                  src={product.imageUrl || 'default-image-url'}
                  alt={product.name}
                  className="product-image"
                  style={{ filter: product.inStock ? 'none' : 'grayscale(100%)' }}
                />
                {!product.inStock && (
                  <div className="out-of-stock-label">OUT OF STOCK</div>
                )}
              </Link>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>
                  {product.prices?.[0]?.currencySymbol || "$"}
                  {(product.prices?.[0]?.amount || 0).toFixed(2)}
                </p>
              </div>
              {product.inStock && (
                <div className="quick-shop" onClick={(e) => handleQuickShop(e, product)}>
                  <img src={CartIcon} alt="Cart" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

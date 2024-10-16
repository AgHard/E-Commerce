import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategory } from '../context/CategoryContext';
import './ProductDetails.css';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ openCartOverlay }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedUSBPorts, setSelectedUSBPorts] = useState(null);
  const [selectedTouchID, setSelectedTouchID] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { activeCategory, setActiveCategory } = useCategory(); // Get activeCategory and setActiveCategory
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const endpoint = 'http://localhost:8000/graphql.php';

      const query = gql`
        query($id: String!) {
          products(id: $id) {
            id
            name
            description
            inStock
            galleries {
              imageUrl
            }
            prices {
              amount
              currencyLabel
              currencySymbol
            }
            attributes {
              name
              type
              items {
                id
                display_value
                value
              }
            }
          }
        }
      `;

      try {
        const data = await request(endpoint, query, { id });
        const productData = data.products.find((product) => product.id === id);
        if (productData) {
          setProduct(productData);
          setMainImage(productData?.galleries[0]?.imageUrl);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.prices[0].amount,
      currencySymbol: product.prices[0].currencySymbol,
      selectedSize,
      selectedColor,
      selectedCapacity,
      selectedUSBPorts,
      selectedTouchID,
      imageUrl: product.galleries[0].imageUrl,
  
      // Fetch available attributes dynamically
      availableSizes: product.attributes
        .filter(attr => attr.name === 'Size')
        .flatMap(attr => attr.items.map(item => item.value)),
        
      availableColors: product.attributes
        .filter(attr => attr.name === 'Color')
        .flatMap(attr => attr.items.map(item => item.value)),
  
      availableCapacities: product.attributes
        .filter(attr => attr.name === 'Capacity')
        .flatMap(attr => attr.items.map(item => item.display_value)),
  
      availableUSBPorts: product.attributes
        .filter(attr => attr.name === 'With USB 3 ports')
        .flatMap(attr => attr.items.map(item => item.display_value)),
  
      availableTouchIDOptions: product.attributes
        .filter(attr => attr.name === 'Touch ID in keyboard')
        .flatMap(attr => attr.items.map(item => item.display_value)),
    };
  
    addToCart(productToAdd);
    openCartOverlay();
  };

  const handleCapacitySelect = (capacity) => {
    setSelectedCapacity(capacity);
  };

  const handleUSBPortsSelect = (usbPorts) => {
    setSelectedUSBPorts(usbPorts);
  };

  const handleTouchIDSelect = (touchID) => {
    setSelectedTouchID(touchID);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleImageSelect = (imageUrl, index) => {
    setMainImage(imageUrl);
    setCurrentImageIndex(index);  // Keep index in sync for arrows
  };

  // Handle next image with arrow
  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % product.galleries.length;
    setCurrentImageIndex(newIndex);
    setMainImage(product.galleries[newIndex].imageUrl);  // Update mainImage when arrow is clicked
  };

  // Handle previous image with arrow
  const handlePrevImage = () => {
    const newIndex = (currentImageIndex - 1 + product.galleries.length) % product.galleries.length;
    setCurrentImageIndex(newIndex);
    setMainImage(product.galleries[newIndex].imageUrl);  // Update mainImage when arrow is clicked
  };

  if (!product) return <div>Loading...</div>;

  // Dynamically determine if Add to Cart button should be disabled
  const isAddToCartDisabled = !product.inStock || 
                              (!selectedCapacity && product.attributes.some(attr => attr.name === 'Capacity')) ||
                              (!selectedUSBPorts && product.attributes.some(attr => attr.name === 'With USB 3 ports')) ||
                              (!selectedTouchID && product.attributes.some(attr => attr.name === 'Touch ID in keyboard')) ||
                              (!selectedSize && product.attributes.some(attr => attr.name === 'Size')) ||
                              (!selectedColor && product.attributes.some(attr => attr.name === 'Color'));

  return (
    <div className="product-details-container">
      <div className="product-gallery-section" data-testid="product-gallery">
        <div className="image-thumbnails">
          {product.galleries.map((gallery, index) => (
            <img
              key={index}
              src={gallery.imageUrl}
              alt={`Thumbnail ${index}`}
              onClick={() => handleImageSelect(gallery.imageUrl, index)}
              className={`thumbnail ${mainImage === gallery.imageUrl ? 'selected' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="product-slider-section">
        <div className="main-image-box">
          <button className="prev-button" onClick={handlePrevImage}>
            &#8249;
          </button>
          <img src={mainImage} alt="Main Product" />
          <button className="next-button" onClick={handleNextImage}>
            &#8250;
          </button>
        </div>
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{`${product.prices[0].currencySymbol}${product.prices[0].amount.toFixed(2)}`}</p>

        {/* Render only the available attributes */}
        {product.attributes?.length > 0 ? (
          <>
            {/* Capacity Options */}
            {product.attributes.some(attr => attr.name === 'Capacity') && (
              <div className="product-attribute" data-testid="product-attribute-capacity">
                <label>Capacity:</label>
                <div className="capacity-options">
                  {product.attributes
                    ?.filter(attr => attr.name === 'Capacity')
                    .flatMap(attr => attr.items)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={selectedCapacity === item.value ? 'selected' : ''}
                        onClick={() => handleCapacitySelect(item.value)}
                      >
                        {item.display_value}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* USB 3 Ports Options */}
            {product.attributes.some(attr => attr.name === 'With USB 3 ports') && (
              <div className="product-attribute" data-testid="product-attribute-with-usb-3-ports">
                <label>With USB 3 Ports:</label>
                <div className="usb-ports-options">
                  {product.attributes
                    ?.filter(attr => attr.name === 'With USB 3 ports')
                    .flatMap(attr => attr.items)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={selectedUSBPorts === item.value ? 'selected' : ''}
                        onClick={() => handleUSBPortsSelect(item.value)}
                      >
                        {item.display_value}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Touch ID Options */}
            {product.attributes.some(attr => attr.name === 'Touch ID in keyboard') && (
              <div className="product-attribute" data-testid="product-attribute-touch-id-in-keyboard">
                <label>Touch ID in keyboard:</label>
                <div className="touch-id-options">
                  {product.attributes
                    ?.filter(attr => attr.name === 'Touch ID in keyboard')
                    .flatMap(attr => attr.items)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={selectedTouchID === item.value ? 'selected' : ''}
                        onClick={() => handleTouchIDSelect(item.value)}
                      >
                        {item.display_value}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.attributes.some(attr => attr.name === 'Size') && (
              <div className="product-attribute" data-testid="product-attribute-size">
                <label>Size:</label>
                <div className="size-options">
                  {product.attributes
                    ?.filter(attr => attr.name === 'Size')
                    .flatMap(attr => attr.items)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={selectedSize === item.value ? 'selected' : ''}
                        onClick={() => handleSizeSelect(item.value)}
                      >
                        {item.value}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Color Options */}
            {product.attributes.some(attr => attr.name === 'Color') && (
              <div className="product-attribute" data-testid="product-attribute-color">
                <label>Color:</label>
                <div className="color-option">
                  {product.attributes
                    ?.filter(attr => attr.name === 'Color')
                    .flatMap(attr => attr.items)
                    .map((item) => (
                      <button
                        key={item.id}
                        className={`color-switch ${selectedColor === item.value ? 'selected' : ''}`}
                        style={{ backgroundColor: item.value }}
                        onClick={() => handleColorSelect(item.value)}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <p></p>
        )}

        <button
          className={`add-to-cart-button ${isAddToCartDisabled ? 'disabled' : ''}`}
          data-testid="add-to-cart"
          disabled={isAddToCartDisabled}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <div className="product-description" data-testid="product-description">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

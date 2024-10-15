import React from 'react';
import { useCart } from '../context/CartContext';  // Use Cart Context
import './CartOverlay.css';  // Import the new CSS file for styling
import { useMutation, gql } from '@apollo/client';

const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($cartItems: [OrderItemInput!]!) {
    placeOrder(cartItems: $cartItems) {
      success
      message
      orderId
    }
  }
`;

const CartOverlay = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotalItems } = useCart();
  const [placeOrder, { error }] = useMutation(PLACE_ORDER_MUTATION);  // Use the mutation hook
  const totalAmount = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);

  // Function to decrease the quantity of an item
  const handleDecreaseQuantity = (item) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor, item.selectedCapacity, item.selectedTouchID, item.selectedUSBPorts);
  };

  // Function to increase the quantity of an item
  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  const handlePlaceOrder = async () => {
    try {
      console.log('Placing order with cart items:', cartItems);
      
      const { data } = await placeOrder({
        variables: {
          cartItems: cartItems.map(item => {
            if (!item.id) {
              console.error('Product ID is null for item:', item);
              return null; // Optionally handle the null case with a fallback
            }
            return {
              productId: item.id,  // Ensure productId is a valid string and not null
              quantity: item.quantity,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
              selectedCapacity: item.selectedCapacity,
              selectedTouchID: item.selectedTouchID,
              selectedUSBPorts: item.selectedUSBPorts,
            };
          }).filter(item => item !== null), // Remove any null items if present
        },
      });
      if (data.placeOrder.success) {
        clearCart(); // Clear the cart on successful order placement
        alert('Order placed successfully!');
      } else {
        alert('Failed to place the order: ' + data.placeOrder.message);
      }
    } catch (e) {
      console.error('Error placing order:', e);
    }
  };

  return (
    <>
      {/* Background Overlay */}
      {isOpen && <div className="overlay-background" onClick={onClose}></div>}

      {/* Cart Overlay */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
        <div className="cart-content">
          <h3>My Bag, {getTotalItems()} {getTotalItems() > 1 ? 'Items' : 'Item'}</h3>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">
                    {item.currencySymbol}
                    {(item.price || 0).toFixed(2)} {/* Check if price exists before calling toFixed */}
                  </p>

                  <div className="cart-item-options">
                    {/* Size Selection */}
                    {item.availableSizes && item.availableSizes.length > 0 && (
                      <div className="size-options" data-testid="cart-item-attribute-size">
                        <p>Size:</p>
                        <div className="size-swatch-container">
                          {item.availableSizes.map((sizeOption) => (
                            <div
                              key={sizeOption}
                              className={`size-swatch ${item.selectedSize === sizeOption ? 'selected' : ''}`}
                              data-testid={`cart-item-attribute-size-${sizeOption.toLowerCase()}${item.selectedSize === sizeOption ? '-selected' : ''}`}
                            >
                              {sizeOption}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selection */}
                    {item.availableColors && item.availableColors.length > 0 && (
                      <div className="color-options" data-testid="cart-item-attribute-color">
                        <p>Color:</p>
                        <div className="color-swatch-container">
                          {item.availableColors.map((colorOption) => (
                            <div
                              key={colorOption}
                              className={`color-swatch ${item.selectedColor === colorOption ? 'selected' : ''}`}
                              style={{ backgroundColor: colorOption }}
                              data-testid={`cart-item-attribute-color-${colorOption.toLowerCase()}${item.selectedColor === colorOption ? '-selected' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Capacity Selection */}
                    {item.availableCapacities && item.availableCapacities.length > 0 && (
                      <div className="capacity-options" data-testid="cart-item-attribute-capacity">
                        <p>Capacity:</p>
                        <div className="capacity-swatch-container">
                          {item.availableCapacities.map((capacityOption) => (
                            <div
                              key={capacityOption}
                              className={`capacity-swatch ${item.selectedCapacity === capacityOption ? 'selected' : ''}`}
                              data-testid={`cart-item-attribute-capacity-${capacityOption.toLowerCase()}${item.selectedCapacity === capacityOption ? '-selected' : ''}`}
                            >
                              {capacityOption}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* USB Ports Selection */}
                    {item.availableUSBPorts && item.availableUSBPorts.length > 0 && (
                      <div className="usb-options" data-testid="cart-item-attribute-usb-ports">
                        <p>USB Ports:</p>
                        <div className="usb-swatch-container">
                          {item.availableUSBPorts.map((usbOption) => (
                            <div
                              key={usbOption}
                              className={`usb-swatch ${item.selectedUSBPorts === usbOption ? 'selected' : ''}`}
                              data-testid={`cart-item-attribute-usb-ports-${usbOption.toLowerCase()}${item.selectedUSBPorts === usbOption ? '-selected' : ''}`}
                            >
                              {usbOption}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Touch ID Selection */}
                    {item.availableTouchIDOptions && item.availableTouchIDOptions.length > 0 && (
                      <div className="touch-id-options" data-testid="cart-item-attribute-touch-id">
                        <p>Touch ID:</p>
                        <div className="touch-id-swatch-container">
                          {item.availableTouchIDOptions.map((touchIDOption) => (
                            <div
                              key={touchIDOption}
                              className={`touch-id-swatch ${item.selectedTouchID === touchIDOption ? 'selected' : ''}`}
                              data-testid={`cart-item-attribute-touch-id-${touchIDOption.toLowerCase()}${item.selectedTouchID === touchIDOption ? '-selected' : ''}`}
                            >
                              {touchIDOption}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecreaseQuantity(item)}
                      data-testid="cart-item-amount-decrease"
                    >
                      -
                    </button>
                    <span data-testid="cart-item-amount">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncreaseQuantity(item)}
                      data-testid="cart-item-amount-increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total" data-testid="cart-total">
            <p>Total: {totalAmount.toFixed(2)}</p>
          </div>
          <button
            className={`place-order-button ${cartItems.length === 0 ? 'disabled' : ''}`}
            disabled={cartItems.length === 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;

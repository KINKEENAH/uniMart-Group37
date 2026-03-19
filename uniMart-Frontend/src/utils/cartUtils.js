/**
 * Calculate subtotal from cart items
 * @param {Array} items - Cart items array
 * @returns {number} - Subtotal amount
 */
export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Calculate tax (5% of subtotal)
 * @param {number} subtotal - Subtotal amount
 * @returns {number} - Tax amount
 */
export const calculateTax = (subtotal) => {
  return subtotal * 0.05; // 5% tax rate
};

/**
 * Calculate total (subtotal + tax)
 * @param {number} subtotal - Subtotal amount
 * @returns {number} - Total amount
 */
export const calculateTotal = (subtotal) => {
  return subtotal + calculateTax(subtotal);
};

/**
 * Format price to Ghana Cedi
 * @param {number} price - Price to format
 * @returns {string} - Formatted price
 */
export const formatPrice = (price) => {
  return `₵${price.toFixed(2)}`;
};

/**
 * Update item quantity in cart
 * @param {Array} items - Current cart items
 * @param {number} itemId - ID of item to update
 * @param {string} action - 'increase' or 'decrease'
 * @returns {Array} - Updated cart items
 */
export const updateQuantity = (items, itemId, action) => {
  return items.map(item => {
    if (item.id === itemId) {
      const newQuantity = action === 'increase' 
        ? item.quantity + 1 
        : Math.max(1, item.quantity - 1);
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
};

/**
 * Remove item from cart
 * @param {Array} items - Current cart items
 * @param {number} itemId - ID of item to remove
 * @returns {Array} - Updated cart items
 */
export const removeItem = (items, itemId) => {
  return items.filter(item => item.id !== itemId);
};

/**
 * Get total number of items in cart
 * @param {Array} items - Cart items
 * @returns {number} - Total item count
 */
export const getItemCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};
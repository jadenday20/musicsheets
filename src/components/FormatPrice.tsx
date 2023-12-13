export default function formatPrice(Price?: number) {
    // Check if Price is defined and a number
    if (typeof Price !== 'undefined' && !isNaN(Price)) {
      return `$${Price.toFixed(2)}`;
    }
    return '$0.00'; // Return default value or handle the case where Price is not valid
  }
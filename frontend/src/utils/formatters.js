export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export const truncate = (text, maxLength = 120) =>
  text && text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;

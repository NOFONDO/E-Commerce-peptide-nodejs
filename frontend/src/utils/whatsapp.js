const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '447346257943';
export const whatsappNumber = rawNumber.replace(/[^0-9]/g, '');

export const buildWhatsAppUrl = (message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
};

export const buildProductInquiryMessage = ({ productName, quantity, customerMessage }) => {
  const lines = [
    'Hello,',
    '',
    'I would like to purchase:',
    '',
    `Product: ${productName}`,
    `Quantity: ${quantity || 1}`,
  ];
  if (customerMessage) {
    lines.push('', `Message: ${customerMessage}`);
  }
  lines.push('', 'Please provide more information.');
  return lines.join('\n');
};

export const buildGeneralInquiryMessage = () =>
  'Hello, I would like to know more about your peptide products. Please provide more information.';

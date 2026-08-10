import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from '../../utils/whatsapp';

const WhatsAppButton = () => (
  <a
    href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
  >
    <FaWhatsapp size={28} />
  </a>
);

export default WhatsAppButton;

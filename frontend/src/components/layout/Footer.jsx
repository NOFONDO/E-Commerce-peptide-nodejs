import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaFlask } from 'react-icons/fa';
import { buildGeneralInquiryMessage, buildWhatsAppUrl, whatsappNumber } from '../../utils/whatsapp';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'zepeptidebiotechnology@gmail.com';

const Footer = () => (
  <footer className="border-t border-gray-100 bg-brand-dark text-gray-300">
    <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white">
            <FaFlask size={18} />
          </span>
          <span className="text-lg font-extrabold text-white">ZE Peptide Biotech</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          Premium research peptides for laboratory use. Rigorously specified, professionally supplied.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
          <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
          <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Legal</h4>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Get in Touch</h4>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <a
              href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <FaWhatsapp className="text-brand-green" /> +{whatsappNumber}
            </a>
          </li>
          <li>
            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-white">
              <FaEnvelope className="text-brand-blue" /> {contactEmail}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
      <p>&copy; {new Date().getFullYear()} ZE Peptide Biotechnology. All rights reserved.</p>
      <p className="mt-1">For laboratory research use only. Not for human consumption.</p>
    </div>
  </footer>
);

export default Footer;

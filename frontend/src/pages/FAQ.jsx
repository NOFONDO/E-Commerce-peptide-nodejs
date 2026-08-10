import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const faqs = [
  {
    question: 'What are these peptides used for?',
    answer:
      'All peptides listed on our platform are supplied strictly for laboratory research purposes. They are not intended for human or veterinary use, consumption, or clinical application.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Browse our shop, select a product, choose your quantity, and click "Buy Now via WhatsApp." This opens a pre-filled WhatsApp message to our team, who will guide you through the rest of the process.',
  },
  {
    question: 'Do you accept online payments?',
    answer: 'We do not process payments on the website. All orders are finalized directly with our team via WhatsApp or email.',
  },
  {
    question: 'How can I check if a product is in stock?',
    answer: 'Every product page displays real-time stock availability. Out-of-stock items are clearly marked.',
  },
  {
    question: 'Can I request a custom quantity?',
    answer: 'Yes. Set your desired quantity on the product page before sending your WhatsApp inquiry, or mention it directly in your message.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach us via WhatsApp, email, or the contact form on our Contact page. We aim to respond within a few hours.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="card overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-brand-dark"
    >
      {faq.question}
      <FaChevronDown className={`shrink-0 text-brand-gray transition ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && <p className="px-6 pb-5 text-sm leading-relaxed text-brand-gray">{faq.answer}</p>}
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about ordering, stock, and shipping of research peptides."
        url="/faq"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />
      <section className="border-b border-gray-100 bg-blue-50/60 py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-brand-dark">Frequently Asked Questions</h1>
          <p className="mt-2 text-brand-gray">Everything you need to know before reaching out.</p>
        </div>
      </section>

      <section className="container-page max-w-3xl space-y-4 py-16">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={faq.question}
            faq={faq}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </section>
    </>
  );
};

export default FAQ;

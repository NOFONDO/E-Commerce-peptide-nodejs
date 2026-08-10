import React from 'react';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => (
  <>
    <SEO title="Privacy Policy" description="Read our privacy policy to understand how we handle your information." url="/privacy-policy" />
    <section className="border-b border-gray-100 bg-blue-50/60 py-12">
      <div className="container-page">
        <h1 className="text-3xl font-extrabold text-brand-dark">Privacy Policy</h1>
        <p className="mt-2 text-brand-gray">Last updated: {new Date().getFullYear()}</p>
      </div>
    </section>

    <section className="container-page max-w-3xl space-y-8 py-16 leading-relaxed text-brand-gray">
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Information We Collect</h2>
        <p className="mt-3">
          When you submit a message through our contact form, we collect your name, email address, phone number
          (if provided), subject, and message content. We do not require an account to browse our catalog.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">How We Use Your Information</h2>
        <p className="mt-3">
          Information submitted through our contact form is used solely to respond to your inquiry. We do not sell,
          rent, or share your personal information with third parties for marketing purposes.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">WhatsApp Communication</h2>
        <p className="mt-3">
          When you contact us via WhatsApp, that conversation is subject to WhatsApp's own privacy policy in
          addition to this one. We use WhatsApp messages solely to process your inquiries and orders.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Data Security</h2>
        <p className="mt-3">
          We take reasonable technical measures to protect the information you submit to us, including secure data
          storage and restricted access to our administrative systems.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Contact</h2>
        <p className="mt-3">
          If you have questions about this privacy policy, please reach out through our Contact page.
        </p>
      </div>
    </section>
  </>
);

export default PrivacyPolicy;

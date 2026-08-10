import React from 'react';
import SEO from '../components/common/SEO';

const Terms = () => (
  <>
    <SEO title="Terms of Service" description="Terms and conditions for using our website and purchasing our products." url="/terms" />
    <section className="border-b border-gray-100 bg-blue-50/60 py-12">
      <div className="container-page">
        <h1 className="text-3xl font-extrabold text-brand-dark">Terms of Service</h1>
        <p className="mt-2 text-brand-gray">Last updated: {new Date().getFullYear()}</p>
      </div>
    </section>

    <section className="container-page max-w-3xl space-y-8 py-16 leading-relaxed text-brand-gray">
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Research Use Only</h2>
        <p className="mt-3">
          All products listed on this website are intended strictly for laboratory research purposes. They are not
          approved for human or veterinary use, consumption, diagnostic, or therapeutic application of any kind.
          By using this website, you confirm you are acquiring products solely for legitimate research purposes.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Ordering Process</h2>
        <p className="mt-3">
          This website does not process payments directly. All orders are finalized through direct communication
          with our team via WhatsApp or email after an inquiry is submitted through the website.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Product Information</h2>
        <p className="mt-3">
          We strive to keep product descriptions, specifications, and stock availability accurate and up to date.
          However, we do not guarantee that all information is free of error at all times.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Limitation of Liability</h2>
        <p className="mt-3">
          We are not liable for any misuse of products purchased through this platform. Users are solely responsible
          for ensuring compliance with all applicable laws and regulations in their jurisdiction.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-brand-dark">Changes to These Terms</h2>
        <p className="mt-3">
          We may update these terms from time to time. Continued use of the website after changes are posted
          constitutes acceptance of the updated terms.
        </p>
      </div>
    </section>
  </>
);

export default Terms;

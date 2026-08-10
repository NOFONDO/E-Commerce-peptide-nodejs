import React from 'react';
import { FaFlask, FaShieldAlt, FaMicroscope } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const About = () => (
  <>
    <SEO title="About Us" description="Learn about ZE Peptide Biotechnology and our commitment to research quality." url="/about" />
    <section className="border-b border-gray-100 bg-blue-50/60 py-12">
      <div className="container-page">
        <h1 className="text-3xl font-extrabold text-brand-dark">About ZE Peptide Biotechnology</h1>
        <p className="mt-2 max-w-2xl text-brand-gray">
          A dedicated supplier of research-grade peptides, built for scientists and laboratories that demand
          clarity, consistency, and transparency.
        </p>
      </div>
    </section>

    <section className="container-page py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Our Mission</h2>
          <p className="mt-4 leading-relaxed text-brand-gray">
            We exist to give laboratories reliable access to well-documented research peptides. Every product listed
            on our platform includes clear specifications, dosage information, and honest stock availability, so
            researchers can make informed decisions quickly.
          </p>
          <p className="mt-4 leading-relaxed text-brand-gray">
            All products distributed through ZE Peptide Biotechnology are strictly for laboratory research use and
            are not intended for human or veterinary consumption.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <FaFlask className="text-brand-blue" size={26} />
            <h3 className="mt-4 font-semibold text-brand-dark">Documented Quality</h3>
            <p className="mt-2 text-sm text-brand-gray">Specifications and composition data for every listed product.</p>
          </div>
          <div className="card p-6">
            <FaShieldAlt className="text-brand-blue" size={26} />
            <h3 className="mt-4 font-semibold text-brand-dark">Research Focused</h3>
            <p className="mt-2 text-sm text-brand-gray">Built exclusively to support laboratory research workflows.</p>
          </div>
          <div className="card p-6 sm:col-span-2">
            <FaMicroscope className="text-brand-blue" size={26} />
            <h3 className="mt-4 font-semibold text-brand-dark">Direct Communication</h3>
            <p className="mt-2 text-sm text-brand-gray">
              Reach our team directly via WhatsApp or email for questions about any product in our catalog.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;

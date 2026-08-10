import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { sendMessage } from '../api/messages';
import { buildGeneralInquiryMessage, buildWhatsAppUrl, whatsappNumber } from '../utils/whatsapp';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'zepeptidebiotechnology@gmail.com';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');
    try {
      await sendMessage(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with ZE Peptide Biotechnology via WhatsApp, email, or our contact form." url="/contact" />
      <section className="border-b border-gray-100 bg-blue-50/60 py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-brand-dark">Contact Us</h1>
          <p className="mt-2 text-brand-gray">We usually respond within a few hours.</p>
        </div>
      </section>

      <section className="container-page grid grid-cols-1 gap-10 py-16 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <a
            href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 p-5 transition hover:border-brand-green"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <FaWhatsapp size={22} />
            </span>
            <div>
              <p className="font-semibold text-brand-dark">WhatsApp</p>
              <p className="text-sm text-brand-gray">+{whatsappNumber}</p>
            </div>
          </a>
          <a href={`mailto:${contactEmail}`} className="card flex items-center gap-4 p-5 transition hover:border-brand-blue">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
              <FaEnvelope size={22} />
            </span>
            <div>
              <p className="font-semibold text-brand-dark">Email</p>
              <p className="text-sm text-brand-gray">{contactEmail}</p>
            </div>
          </a>
        </div>

        <div className="card p-8 lg:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <FaCheckCircle className="text-brand-green" size={40} />
              <h3 className="mt-4 text-lg font-semibold text-brand-dark">Message sent successfully</h3>
              <p className="mt-2 text-sm text-brand-gray">Thank you for reaching out. We will get back to you shortly.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Name</label>
                  <input {...register('name', { required: 'Name is required' })} className="input-field" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="label-field">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="input-field"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label-field">Phone (optional)</label>
                  <input {...register('phone')} className="input-field" />
                </div>
                <div>
                  <label className="label-field">Subject</label>
                  <input {...register('subject', { required: 'Subject is required' })} className="input-field" />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                </div>
              </div>
              <div>
                <label className="label-field">Message</label>
                <textarea
                  rows={5}
                  {...register('message', { required: 'Message is required' })}
                  className="input-field"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;

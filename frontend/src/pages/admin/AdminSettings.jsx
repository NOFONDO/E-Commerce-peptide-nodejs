import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../components/common/Loader';
import { fetchSettings, updateSettings } from '../../api/settings';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchSettings().then((res) => {
      const settings = res.data;
      reset({
        whatsappNumber: settings.whatsappNumber,
        contactEmail: settings.contactEmail,
        storeDescription: settings.storeDescription,
        socialLinks: {
          instagram: settings.socialLinks?.instagram,
          facebook: settings.socialLinks?.facebook,
          twitter: settings.socialLinks?.twitter,
          linkedin: settings.socialLinks?.linkedin,
        },
      });
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = async (data) => {
    setError('');
    setSaved(false);
    try {
      const payload = {
        whatsappNumber: data.whatsappNumber,
        contactEmail: data.contactEmail,
        storeDescription: data.storeDescription,
        socialLinks: {
          instagram: data.socialLinks?.instagram,
          facebook: data.socialLinks?.facebook,
          twitter: data.socialLinks?.twitter,
          linkedin: data.socialLinks?.linkedin,
        },
      };
      await updateSettings(payload);
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">Store Settings</h1>
      <p className="mt-1 text-sm text-brand-gray">Update your public contact details and social links.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 max-w-2xl space-y-5 p-6">
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
        {saved && <p className="rounded-lg bg-green-50 p-3 text-sm text-brand-green">Settings updated successfully.</p>}

        <div>
          <label className="label-field">WhatsApp Number</label>
          <input {...register('whatsappNumber')} placeholder="+447346257943" className="input-field" />
        </div>
        <div>
          <label className="label-field">Contact Email</label>
          <input type="email" {...register('contactEmail')} className="input-field" />
        </div>
        <div>
          <label className="label-field">Store Description</label>
          <textarea rows={3} {...register('storeDescription')} className="input-field" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">Instagram URL</label>
            <input {...register('socialLinks.instagram')} className="input-field" />
          </div>
          <div>
            <label className="label-field">Facebook URL</label>
            <input {...register('socialLinks.facebook')} className="input-field" />
          </div>
          <div>
            <label className="label-field">Twitter / X URL</label>
            <input {...register('socialLinks.twitter')} className="input-field" />
          </div>
          <div>
            <label className="label-field">LinkedIn URL</label>
            <input {...register('socialLinks.linkedin')} className="input-field" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;

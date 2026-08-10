import React from 'react';

const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

/*
 * React 19 natively hoists <title>, <meta>, and <link> tags rendered
 * anywhere in the component tree into the document <head>, so no
 * external head-management library is required.
 */
const SEO = ({ title, description, image, url, type = 'website', structuredData }) => {
  const fullTitle = title ? `${title} | ZE Peptide Biotechnology` : 'ZE Peptide Biotechnology | Research Peptides';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fallbackImage = `${siteUrl}/og-image.jpg`;
  const desc = description || 'Premium research peptides for laboratory use.';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image || fallbackImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image || fallbackImage} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </>
  );
};

export default SEO;

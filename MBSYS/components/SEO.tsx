import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object; // Support for dynamic page-specific schema
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "MBSYS, IT infrastructure, CCTV Bengaluru, Office renovation, Networking solutions, Security systems",
  ogImage = "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200",
  ogType = "website",
  schema
}) => {
  const siteName = "MBSYS";
  const displayTitle = title ? `${title} | ${siteName}` : `${siteName} | Enterprise IT Infrastructure & Security`;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MBSYS",
    "image": ogImage,
    "@id": "https://mbsys.co.in",
    "url": "https://mbsys.co.in",
    "telephone": "+919886374122",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "JP Nagar",
      "addressLocality": "Bengaluru",
      "addressRegion": "KA",
      "postalCode": "560078",
      "addressCountry": "IN"
    }
  };

  return (
    <Helmet>
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href="https://mbsys.co.in" />
      
      {/* Social / OG */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || baseSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;

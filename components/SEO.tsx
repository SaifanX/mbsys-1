import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = "MBSYS, IT infrastructure, CCTV Bengaluru, Office renovation, Networking solutions, Security systems",
  ogImage = "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200",
  ogType = "website"
}) => {
  const siteName = "MBSYS";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default SEO;

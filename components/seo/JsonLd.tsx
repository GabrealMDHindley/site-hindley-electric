import { siteConfig } from "@/lib/site-config";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: siteConfig.businessName,
    founder: siteConfig.ownerName,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/brand/logo.png`,
    logo: `${siteConfig.siteUrl}/brand/logo.png`,
    telephone: siteConfig.phone ?? undefined,
    email: siteConfig.email ?? undefined,
    areaServed: siteConfig.serviceArea,
    address: siteConfig.address
      ? {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: siteConfig.city ?? undefined,
          addressRegion: siteConfig.state ?? undefined,
          postalCode: siteConfig.zip ?? undefined,
        }
      : undefined,
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

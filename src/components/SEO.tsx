import { Helmet } from "react-helmet-async";

export const SEO = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Adricar Centro Automotivo",
    image: "https://adricarautocenter.com.br/og-image.jpg",
    "@id": "https://adricarautocenter.com.br",
    url: "https://adricarautocenter.com.br",
    telephone: "+5511985370952",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Dona Belmira Marin, 1670/1674",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "04815-000",
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: -23.78, longitude: -46.65 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
    ],
    sameAs: ["https://instagram.com/adricarautocenter"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.4", reviewCount: "120" },
  };

  return (
    <Helmet>
      <link rel="manifest" href="/manifest.webmanifest" />
      <meta name="theme-color" content="#0a0a0a" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

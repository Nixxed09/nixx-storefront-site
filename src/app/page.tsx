import { Storefront } from "@/components/Storefront";
import {
  catalogStructuredData,
  faqStructuredData,
  jsonLd,
} from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(catalogStructuredData()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqStructuredData()) }}
      />
      <Storefront />
    </>
  );
}

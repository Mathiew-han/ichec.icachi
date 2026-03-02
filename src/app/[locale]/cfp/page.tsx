import { readSiteMarkdown } from "@/lib/site-content";
import { CFPClient } from "./CFPClient";

export default async function CFPPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await readSiteMarkdown("cfp", locale);
  return <CFPClient content={content} />;
}

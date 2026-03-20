import { readSiteMarkdown } from "@/lib/site-content";
import { RegistrationClient } from "./RegistrationClient";

export default async function RegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await readSiteMarkdown("registration", locale);
  return <RegistrationClient content={content} />;
}

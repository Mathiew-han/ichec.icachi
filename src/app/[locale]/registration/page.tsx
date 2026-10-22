import { RegistrationClient } from "./RegistrationClient";
import { AttendClient } from "./AttendClient";
import { getAttendContent } from "@/lib/attend-content";
import { WorkshopShowcase } from "../cfp/WorkshopShowcase";

export default async function RegistrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <AttendClient content={getAttendContent(locale)} workshops={<WorkshopShowcase locale={locale} />}>
      <RegistrationClient />
    </AttendClient>
  );
}

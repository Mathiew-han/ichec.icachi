import english from "../../content/attending/en.json";
import simplifiedChinese from "../../content/attending/zh-CN.json";
import traditionalChinese from "../../content/attending/zh-TW.json";

export type AttendContent = typeof english;
export type AttendPlace = AttendContent["places"][number];
export type AttendTourStop = AttendContent["tour"][number];

export function getAttendContent(locale: string): AttendContent {
  if (locale === "zh-CN") return simplifiedChinese;
  if (locale === "zh-TW") return traditionalChinese;
  return english;
}

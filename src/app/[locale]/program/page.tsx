"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./program.module.css";

export default function ProgramPage() {
  const t = useTranslations("Common");
  const [activeDay, setActiveDay] = useState("day1");

  return (
    <div className={`${styles.page} space-y-12`}>
      <section className="px-2 pb-2 pt-16 sm:px-4 sm:pb-6 sm:pt-16">
        <div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          {t("toBeUpdated")}
        </div>
        <div className="day-tabs mt-6 flex flex-nowrap items-center gap-6 text-xs font-semibold text-black/70 dark:text-white/70">
          {[
            { id: "day1", label: t("day1") },
            { id: "day2", label: t("day2") },
            { id: "day3", label: t("day3") },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveDay(item.id)}
              className={
                activeDay === item.id
                  ? "day-tab is-active"
                  : "day-tab"
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-12">
          {activeDay === "day1" ? (
            <div id="day1" className="space-y-4">
            <h3 className="text-lg font-semibold text-black/70 dark:text-white/70">
              Day 1, November 23 (Mon)
            </h3>
            <div className="overflow-x-auto border border-black/5 dark:border-white/5">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="schedule-head">
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Time / Room</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 1</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 2</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 3</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 4</th>
                    <th className="border-b p-3 font-semibold">VIP Room</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">08:30-17:00</td>
                    <td colSpan={4} className="schedule-cell-primary p-3 text-center">Registration</td>
                    <td rowSpan={7} className="border-l border-black/5 p-3 dark:border-white/5"></td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">09:30-11:00</td>
                    <td className="p-3">Art / Demo (setup)</td>
                    <td className="p-3 text-center">W1</td>
                    <td className="p-3 text-center">W5</td>
                    <td className="p-3 text-center">W3</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">11:00-11:30</td>
                    <td colSpan={4} className="schedule-cell-break p-3 text-center italic">Morning Break</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">11:30-13:00</td>
                    <td className="p-3">Art / Demo (setup)</td>
                    <td className="p-3 text-center">W1</td>
                    <td className="p-3 text-center">W5</td>
                    <td className="p-3 text-center">W3</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">13:00-14:00</td>
                    <td colSpan={4} className="schedule-cell-break p-3 text-center italic">Lunch</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">14:00-15:30</td>
                    <td colSpan={4} className="schedule-cell-session p-3 text-center">Art / Demo Show</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">15:30-16:00</td>
                    <td colSpan={4} className="schedule-cell-break p-3 text-center italic">Afternoon Break</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">16:00-17:00</td>
                    <td colSpan={4} className="schedule-cell-session p-3 text-center">Art / Demo Show</td>
                    <td className="schedule-cell-special p-3 text-center text-xs">Steering Committee Meeting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          ) : null}

          {activeDay === "day2" ? (
            <div id="day2" className="space-y-4">
            <h3 className="text-lg font-semibold text-black/70 dark:text-white/70">
              Day 2, November 24 (Tue)
            </h3>
            <div className="overflow-x-auto border border-black/5 dark:border-white/5">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="schedule-head">
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Time / Room</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Plenary</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 1</th>
                    <th className="border-b p-3 font-semibold">Room 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">08:30-18:00</td>
                    <td colSpan={3} className="schedule-cell-primary p-3 text-center">Registration</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">09:30-11:00</td>
                    <td className="schedule-cell-keynote p-3 text-center">Opening + Keynote</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">11:00-11:30</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Morning Coffee Break + Poster Session</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">11:30-13:00</td>
                    <td className="p-3"></td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 1</td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 2</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">13:00-14:30</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Lunch</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">14:30-15:45</td>
                    <td className="schedule-cell-keynote p-3 text-center">Panel</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">15:45-16:15</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Afternoon Coffee Break + Poster Session</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">16:15-17:45</td>
                    <td className="p-3"></td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 3</td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 4</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">18:30-21:30</td>
                    <td colSpan={3} className="schedule-cell-special p-3 text-center font-medium">Banquet</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          ) : null}

          {activeDay === "day3" ? (
            <div id="day3" className="space-y-4">
            <h3 className="text-lg font-semibold text-black/70 dark:text-white/70">
              Day 3, November 25 (Wed)
            </h3>
            <div className="overflow-x-auto border border-black/5 dark:border-white/5">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="schedule-head">
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Time / Room</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Plenary</th>
                    <th className="border-b border-r border-black/5 p-3 font-semibold dark:border-white/5">Room 1</th>
                    <th className="border-b p-3 font-semibold">Room 2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">08:30-16:00</td>
                    <td colSpan={3} className="schedule-cell-primary p-3 text-center">Registration</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">09:00-10:30</td>
                    <td className="p-3"></td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 5</td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 6</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">10:30-11:00</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Morning Coffee Break</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">11:00-12:00</td>
                    <td className="schedule-cell-keynote p-3 text-center">Keynote</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">12:00-13:15</td>
                    <td className="schedule-cell-keynote p-3 text-center">Panel</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">13:15-14:30</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Lunch Break</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">14:30-15:45</td>
                    <td className="p-3"></td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 7</td>
                    <td className="schedule-cell-session p-3 text-center">Paper Session 8</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">15:45-16:00</td>
                    <td colSpan={3} className="schedule-cell-break p-3 text-center italic">Afternoon Coffee Break</td>
                  </tr>
                  <tr>
                    <td className="border-r border-black/5 p-3 font-medium dark:border-white/5">16:00-16:30</td>
                    <td className="schedule-cell-special p-3 text-center">Closing</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className={`${styles.section} space-y-6`}>
        <div className={styles.sectionTitle}>{t("detailedProgram")}</div>
        <p className={styles.lead}>
          {t("toBeUpdated")}
        </p>
        <div className={styles.listGrid}>
          {[t("day1"), t("day2"), t("day3")].map((day, index) => (
            <div key={day} className={styles.dayBlock}>
              <div className={styles.dayKicker}>{`Day ${index + 1}`}</div>
              <div className={styles.dayTitle}>{day}</div>
              <div className={styles.dayText}>
                Workshops / Arts / Sessions / Banquet etc. to be updated for 2026.
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionNoDivider} space-y-6`}>
        <div className={styles.sectionTitle}>{t("venue")}</div>
        <p className={styles.lead}>
          Breakout rooms and activity spaces will be confirmed and published for 2026.
        </p>
        <div className={styles.venueList}>
          {[
            { name: "Main Hall", meta: "Plenary · Keynotes · Panels" },
            { name: "Room 1", meta: "Paper Sessions · Workshops" },
            { name: "Room 2", meta: "Paper Sessions · Workshops" },
            { name: "Room 3", meta: "Workshops · Community Events" },
            { name: "Room 4", meta: "Workshops · Community Events" },
            { name: "VIP Room", meta: "Meetings · Invited Sessions" },
          ].map((item) => (
            <div key={item.name} className={styles.venueItem}>
              <div className={styles.venueName}>{item.name}</div>
              <div className={styles.venueMeta}>{item.meta}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

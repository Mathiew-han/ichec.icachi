"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AttendContent, AttendPlace, AttendTourStop } from "@/lib/attend-content";
import styles from "./attend.module.css";

const sections = ["attend-venue", "attend-routes", "attend-stay", "attend-tour", "attend-explore", "attend-dining"];
const categories = ["all", "heritage", "resorts", "outdoors"];

function Icon({ type }: { type: "pin" | "plane" | "car" | "clock" | "arrow" }) {
  const paths = {
    pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    plane: "m22 14-9-5V3a1 1 0 0 0-2 0v6l-9 5v2l9-3v6l-3 2v1l4-1 4 1v-1l-3-2v-6l9 3Z",
    car: "M5 17H3V9l2-5h14l2 5v8h-2M5 17v3H3v-3m16 0v3h2v-3M3 9h18M6 13h2m8 0h2M5 17h14",
    clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
  };
  return <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={paths[type]} /></svg>;
}

function ExternalLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return <a className={primary ? styles.primaryLink : styles.textLink} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}

function Heading({ content, index }: { content: AttendContent; index: number }) {
  return <div className={styles.heading}><p className={styles.eyebrow}><span>{String(index + 1).padStart(2, "0")}</span>{content.labels.eyebrows[index]}</p><h2>{content.labels.headings[index]}</h2></div>;
}

type Gallery = { title: string; images: string[]; index: number };

function Photo({ images, title, labels, onOpen, className = "", start = 0, priority = false }: { images: string[]; title: string; labels: AttendContent["labels"]; onOpen: (gallery: Gallery) => void; className?: string; start?: number; priority?: boolean }) {
    return (
      <button type="button" className={`${styles.photo} ${className}`} aria-label={`${labels.photo}: ${title}`} onClick={() => onOpen({ title, images, index: start })}>
        <Image src={images[start]} alt={title} fill sizes="(max-width: 600px) 92vw, (max-width: 900px) 45vw, 560px" priority={priority} />
        <span className={styles.photoHint} aria-hidden="true">{images.length > 1 ? `${images.length} ${labels.gallery}` : "+"}</span>
      </button>
    );
  }

function PlaceCard({ place, labels, onOpen }: { place: AttendPlace | AttendTourStop; labels: AttendContent["labels"]; onOpen: (gallery: Gallery) => void }) {
    return (
      <article className={styles.placeCard}>
        <Photo labels={labels} onOpen={onOpen} images={place.images} title={place.name} />
        <div className={styles.cardBody}>
          <h3>{place.name}</h3>
          {place.facts.length > 0 && <p className={styles.placeFact}>{place.facts[0]}</p>}
          {place.facts[1] && <p className={styles.placeHours}><Icon type="clock" />{place.facts[1]}</p>}
          <p className={styles.excerpt}>{place.paragraphs[0]}</p>
          <details className={styles.details}>
            <summary><span className={styles.whenClosed}>{labels.details}</span><span className={styles.whenOpen}>{labels.hideDetails}</span><span className={styles.plus} aria-hidden="true">+</span></summary>
            <div className={styles.fullText}>
              {place.facts.slice(1).map((fact) => <p key={fact} className={styles.fact}>{fact}</p>)}
              {place.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </details>
        </div>
      </article>
    );
  }


export function AttendClient({ content, children }: { content: AttendContent; children: ReactNode }) {
  const { labels, venue } = content;
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [origin, setOrigin] = useState(1);
  const [category, setCategory] = useState("all");
  const [allPlaces, setAllPlaces] = useState(false);
  const [allStops, setAllStops] = useState(false);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const route = content.routes[origin];
  const filteredPlaces = content.places.filter((place) => category === "all" || place.category === category);
  const shownPlaces = allPlaces ? filteredPlaces : filteredPlaces.slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-180px 0px -55% 0px", threshold: 0 });
    for (const id of sections) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (gallery && dialog.current && !dialog.current.open) dialog.current.showModal();
    if (!gallery && dialog.current?.open) dialog.current.close();
  }, [gallery]);


  return (
    <div className={styles.page}>
      <nav className={styles.sectionNav} aria-label={labels.navLabel}>
        <div className={styles.navInner}>
          {sections.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setActiveSection(id)} aria-current={activeSection === id ? "location" : undefined}><span>{String(i + 1).padStart(2, "0")}</span>{labels.nav[i]}</a>)}
        </div>
      </nav>

      <section id={sections[0]} className={`${styles.section} ${styles.venue}`} aria-label={labels.nav[0]}>
        <div className={`${styles.container} ${styles.venueGrid}`}>
          <div className={styles.venueCopy}>
            <Heading content={content} index={0} />
            <h3>{venue.name}</h3>
            <p className={styles.address}><Icon type="pin" />{venue.address}</p>
            {venue.paragraphs.map((paragraph, i) => <p className={styles.prose} key={i}>{paragraph}</p>)}
            <div className={styles.linkRow}><ExternalLink href={venue.website} primary>{labels.hotelWebsite}</ExternalLink><ExternalLink href={venue.map}>{labels.map}</ExternalLink></div>
          </div>
          <div className={styles.venueGallery}>
            <Photo labels={labels} onOpen={setGallery} images={venue.images} title={labels.venueCaptions[0]} className={styles.venueMain} priority />
            <div className={styles.venueThumbnails}>
              {[1, 2].map((i) => <figure key={i}><Photo labels={labels} onOpen={setGallery} images={venue.images} title={labels.venueCaptions[i]} start={i} /><figcaption>{labels.venueCaptions[i]}</figcaption></figure>)}
            </div>
          </div>
        </div>
      </section>

      <section id={sections[1]} className={`${styles.section} ${styles.routeSection}`} aria-label={labels.nav[1]}>
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <Heading content={content} index={1} />
            <div className={styles.tabs} role="group" aria-label={labels.routeLabel}>
              {labels.origins.map((label, i) => <button type="button" key={label} aria-pressed={origin === i} aria-controls="attend-route-panel" onClick={() => setOrigin(i)}>{label}</button>)}
            </div>
          </div>
          <div className={styles.routesGrid} id="attend-route-panel" aria-live="polite" aria-atomic="true">
            <div className={styles.routeIntro}><Icon type="plane" /><h3>{route.name}</h3><p>{labels.routeHint}</p></div>
            <div className={styles.routeTableWrap}>
              <table className={styles.routeTable}>
                <caption className={styles.srOnly}>{route.name}</caption>
                <thead><tr>{labels.transportHeaders.map((h) => <th scope="col" key={h}>{h}</th>)}</tr></thead>
                <tbody>{route.rows.map((row) => <tr key={row.mode}><th scope="row"><span className={styles.transportMode}><Icon type="car" />{row.mode}</span></th><td>{row.time}</td><td>{row.fare}</td><td>{row.remarks}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <div className={styles.routeFoot}><p>{labels.referenceNote}</p><div className={styles.linkRow}><ExternalLink href={content.shuttleUrl}>{labels.shuttle}</ExternalLink><ExternalLink href="https://www.hzmb.gov.hk/en/cross-boundary.html">{labels.transportSource}</ExternalLink></div></div>
        </div>
      </section>

      <section id={sections[2]} className={styles.section} aria-label={labels.nav[2]}>
        <div className={styles.container}>
          <div className={styles.sectionTop}><Heading content={content} index={2} /><ExternalLink href={content.tourismUrl}>{labels.moreHotels}</ExternalLink></div>
          <div className={styles.cardGrid}>
            {content.hotels.map((hotel, i) => (
              <article key={hotel.id} className={styles.hotelCard}>
                <div className={styles.hotelPhoto}><Photo labels={labels} onOpen={setGallery} images={hotel.images} title={hotel.name} /><span className={styles.distance}>{labels.distance[i]}</span></div>
                <div className={styles.cardBody}>
                  <h3>{hotel.displayName}</h3><p className={styles.address}><Icon type="pin" />{hotel.address}</p>
                  <p className={styles.excerpt}>{hotel.paragraphs[0]}</p>
                  <details className={styles.details}><summary><span className={styles.whenClosed}>{labels.hotelDetails}</span><span className={styles.whenOpen}>{labels.hideDetails}</span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.fullText}>{hotel.paragraphs.map((p, index) => <p key={index}>{p}</p>)}</div></details>
                  <div className={styles.cardLinks}><ExternalLink href={hotel.website}>{labels.website}</ExternalLink>{hotel.booking && <ExternalLink href={hotel.booking}>{i === 0 ? "Trip.com" : "Booking.com"}</ExternalLink>}</div>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.otherHotels}>{content.otherHotels}</p>
        </div>
      </section>

      <section id={sections[3]} className={`${styles.section} ${styles.tourSection}`} aria-label={labels.nav[3]}>
        <div className={styles.container}>
          <Heading content={content} index={3} /><p className={styles.sectionIntro}>{labels.tourNote}</p>
          <ol className={styles.itinerary}>{labels.tourRoute.map((stop, i) => <li key={`${stop}-${i}`}><span className={styles.stopNumber}>{i + 1}</span><span>{stop}</span></li>)}</ol>
          <div className={styles.cardGrid} id="attend-tour-cards">{content.tour.slice(0, allStops ? undefined : 3).map((place) => <PlaceCard labels={labels} onOpen={setGallery} key={place.id} place={place} />)}</div>
          <div className={styles.moreRow}><button type="button" className={styles.moreButton} aria-expanded={allStops} aria-controls="attend-tour-cards" onClick={() => setAllStops(!allStops)}>{allStops ? labels.fewerStops : labels.allStops}<Icon type="arrow" /></button></div>
        </div>
      </section>

      <section id={sections[4]} className={styles.section} aria-label={labels.nav[4]}>
        <div className={styles.container}>
          <div className={styles.sectionTop}><Heading content={content} index={4} /><div className={styles.tabs} role="group" aria-label={labels.filterLabel}>{categories.map((key, i) => <button type="button" key={key} aria-pressed={category === key} aria-controls="attend-place-cards" onClick={() => { setCategory(key); setAllPlaces(false); }}>{labels.filters[i]}</button>)}</div></div>
          <div className={styles.cardGrid} id="attend-place-cards">{shownPlaces.map((place) => <PlaceCard labels={labels} onOpen={setGallery} key={place.id} place={place} />)}</div>
          {filteredPlaces.length > 6 && <div className={styles.moreRow}><button type="button" className={styles.moreButton} aria-expanded={allPlaces} aria-controls="attend-place-cards" onClick={() => setAllPlaces(!allPlaces)}>{allPlaces ? labels.fewerPlaces : labels.allPlaces}<Icon type="arrow" /></button></div>}
          <p className={styles.referenceNote}>{labels.referenceNote}</p>
        </div>
      </section>

      <section id={sections[5]} className={`${styles.section} ${styles.diningSection}`} aria-label={labels.nav[5]}>
        <div className={styles.container}>
          <Heading content={content} index={5} /><p className={styles.sectionIntro}>{content.diningIntro}</p>
          <div className={styles.diningGrid}>
            {content.restaurants.map((restaurant) => <article className={styles.diningCard} key={restaurant.id}>
              <Photo labels={labels} onOpen={setGallery} images={restaurant.images} title={restaurant.name} />
              <div className={styles.cardBody}><h3>{restaurant.name}</h3><p className={styles.budget}>{restaurant.price}</p><p className={styles.restaurantInfo}><Icon type="clock" />{restaurant.hours}</p><p className={styles.restaurantInfo}><Icon type="pin" />{restaurant.address}</p><a className={styles.textLink} href={`tel:${restaurant.phone.replace(/[^+\d]/g, "")}`} aria-label={`${labels.call}: ${restaurant.name}, ${restaurant.phone}`}>{restaurant.phone}</a></div>
            </article>)}
          </div>
        </div>
      </section>

      <div className={`${styles.container} ${styles.feesWrap}`}><details className={styles.fees}><summary><span>{labels.fees}<small>{labels.feesNote}</small></span><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.legacyContent}>{children}</div></details></div>

      <dialog ref={dialog} className={styles.lightbox} aria-label={gallery?.title ?? labels.photo} onClose={() => setGallery(null)} onClick={(event) => { if (event.target === event.currentTarget) setGallery(null); }}>
        {gallery && <div className={styles.lightboxInner}>
          <button type="button" className={styles.closeButton} aria-label={labels.close} onClick={() => setGallery(null)}>×</button>
          <div className={styles.lightboxImage}><Image src={gallery.images[gallery.index]} alt={`${gallery.title} (${gallery.index + 1}/${gallery.images.length})`} fill sizes="90vw" /></div>
          <div className={styles.lightboxCaption}><span>{gallery.title} · {gallery.index + 1}/{gallery.images.length}</span>{gallery.images.length > 1 && <div><button type="button" aria-label={labels.previous} onClick={() => setGallery({ ...gallery, index: (gallery.index + gallery.images.length - 1) % gallery.images.length })}>←</button><button type="button" aria-label={labels.next} onClick={() => setGallery({ ...gallery, index: (gallery.index + 1) % gallery.images.length })}>→</button></div>}</div>
        </div>}
      </dialog>
    </div>
  );
}

# Attend redesign

## Design reference

- Prompt: `attend-style-prompt.md`.
- Prototype: `attend-prototype.png`, generated with the built-in imagegen tool on 2026-09-11.
- Route: `/en/registration/`, `/zh-CN/registration/`, `/zh-TW/registration/`.
- The existing `SiteShell` poster, navigation, background asset, hero copy and global styles are preserved. The new body follows the prototype's section navigation, venue gallery, transport selector, hotel cards, sage tour panel, attraction filters and dining cards.
- Photographs and text in the implementation come from the source documents. Inaccurate photo assignments and small text generated inside the prototype are not source content.

## Content sources

- `ICHEC2026_Attending(1).docx` — English.
- `ICHEC2026_Attending_Simplified_Chinese.docx` — simplified Chinese, found alongside the two attached documents.
- `ICHEC2026_Attending_Traditional_Chinese.docx` — traditional Chinese.
- All 38 embedded photographs are used, with secondary images accessible in the photo viewer. WebP copies in `public/images/attend/` retain original composition; display cropping uses CSS. Original extracted images are retained in the local working output.
- Three hotels, four arrival points, six described tour stops, thirteen exploration destinations and four restaurants are included in each locale. Full descriptions remain available in native expandable details. Existing registration information remains accessible in the final collapsed section.

## Editorial corrections

Checked on 2026-09-11:

- The English document quotes HK$70–80 for the Hong Kong bus/taxi route, while the Chinese documents quote HK$40–60. The [official HZMB page](https://www.hzmb.gov.hk/en/cross-boundary.html) lists the Golden Bus leg as HK$65 daytime / HK$70 nighttime. The displayed fare clearly states that connecting bus/taxi costs are additional.
- The [official Wynn shuttle page](https://www.wynnresortsmacau.com/en/wynn-macau/shuttle-bus) describes travel from Hengqin via Wynn Palace. The route therefore includes the transfer rather than implying a direct shuttle. Border Gate shuttle travel time is updated to approximately 30 minutes according to the same source.
- St. Dominic's Church is named 玫瑰圣母堂 / 玫瑰聖母堂, removing the different church name inadvertently included in the Chinese documents. [MGTO reference](https://www.macaotourism.gov.mo/en/sightseeing/macao-world-heritage/st-dominics-church).
- Typographical corrections: museum “停止入学” → “停止入场”, restaurant “StardWord” → “StarWorld”, and the duplicated parenthesis in a bus route.
- The old English registration appendix's venue is corrected from City University of Macau to Wynn Macau. Its prices and registration policies are retained.
- Other travel prices and schedules are presented as reference information from the documents, with a visible reminder to confirm current arrangements with the operator or venue.

## Verification

- ESLint, TypeScript and the production static build pass.
- English, simplified Chinese and traditional Chinese verified at desktop (1440px) and mobile (390px) widths.
- Four arrival selectors, six tour stops, thirteen places and their filters, expandable full text, hotel photo navigation, Escape dismissal and preservation of open details after closing a photo tested in Edge.
- All 38 asset paths are present and images load; no page JavaScript errors or horizontal page overflow in the checked layouts.
- Desktop and mobile poster screenshots compared with the previous live page: identical dimensions and zero changed pixel channels.
- The Attend-only overflow rule uses `clip` so section navigation sticks below the site header. Other routes retain their existing layout.

# Om mf filene

Her er en kort, praktisk “hva er denne fila til”-guide for hver MD-fil du har nå (så du vet hvor du skal justere senere).

Kort hensikt per MD-fil

## README.md

Prosjektets inngangsdør. Forklarer hva repoet er, kvalitetmål (WCAG/ytelse/i18n), og peker til riktige docs.

## DEV.md

Teknisk “deep dive”: arkitektur, i18n-implementasjon, routing, mønstre, scripts og feilsøking. Ikke policy—mer “hvordan det faktisk funker”.

## CONTRIBUTING.md

Spilleregler for endringer/PR: hvordan bidra, hva som forventes, og hvilke kvalitetsdokumenter som må følges.

## ACCESSIBILITY.md

Overordnet WCAG-policy: krav til semantikk, tastatur, fokus, kontrast, bilder, media + sjekklister før merge/deploy.

## A11Y-COMPONENTS.md (a11y-components.md)

Komponent-spesifikke a11y-krav (Header, Lightbox, knapper, video). Brukes når du faktisk endrer disse komponentene.

## TYPOGRAPHY.md

Lesbarhet og tekstpresentasjon: når og hvordan bruke prose, tekststruktur, lenker i brødtekst, farge/kontrast-regler knyttet til tekst.

## CONTENT-GUIDE.md

Innhold og klarspråk: standard sideoppsett, tekstregler, lenketekster, dato/tid-format, hvordan skrive for skanning.

## DESIGN-SYSTEM.md

Visuelle rammer: farger (gul/svart + aksenter), typografihierarki, lenker/CTA, interaksjonsregler (touch targets, fokus).

## IMAGES.md

Bildepolicy: hva ligger i public/ vs src/assets, alt-tekst-praksis, LCP/ytelse og pragmatisk migreringsplan til astro:assets.

## I18N.md (i18n.md)

Kort regelbok for språk: URL-struktur, speiling av sider, oversettelsesfiler, nøkkelkonvensjoner og fallback-regler.

## SEO.md (seo.md)

SEO-policy: title/description via seo.*, NO/EN-indeksering, Open Graph, og sjekkliste ved nye sider.

## CHECKLIST.md

“Før deploy”-sjekkliste: tastatur/fokus, lightbox, kontrast, bilder, video, NO/EN, SEO og Lighthouse.

## COMPONENTS.md (components.md)

Komponent-kontrakt: hva er Page/Section/UI-komponenter, hvem gjør hva, i18n-regler, hva komponenter ikke skal gjøre.

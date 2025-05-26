export type DropdownItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem =
  | {
      label: string;
      href: string;
      toggle?: string;
    }
  | {
      label: string;
      dropdown: DropdownItem[];
      toggle?: string;
    };

// Navigasjonsstruktur
export const navLinks: NavItem[] = [
  {
    label: "Distanser",
    dropdown: [
      { href: "/helmaraton", label: "Helmaraton" },
      { href: "/halvmaraton", label: "Halvmaraton" },
      { href: "/oygaloppen", label: "Øygaloppen (10 km)" },
      { href: "/minimaraton", label: "Minimaraton (3,6 km)" },
      { href: "/barnelop", label: "Barneløp" },
      { href: "/paralop", label: "Paraløp" },
      { href: "/trim", label: "Trim" },
    ],
  },
  // isFeatureActive("infoSection") && { href: "/informasjon", label: "Informasjon" },
  {
    label: "Resultater",
    toggle: "Resultater",
    dropdown: [
      { href: "https://live.eqtiming.com/74867#result", label: "2025", external: true },
      { href: "https://live.eqtiming.com/69716#result", label: "2024", external: true },
      { href: "https://live.eqtiming.com/63885#result", label: "2023", external: true },
      { href: "https://live.eqtiming.com/58375#result", label: "2022", external: true },
      { href: "https://live.eqtiming.com/44345#result", label: "2019", external: true },
      { href: "https://live.eqtiming.com/38389#result", label: "2018", external: true },
      { href: "https://live.eqtiming.com/32266#result", label: "2017", external: true },
      { href: "https://live.eqtiming.com/23192#result", label: "2016", external: true },
      { href: "https://torghattenmaraton.no/wordpress/wp-content/uploads/2016/TM16/Annonser/TorghattenMaraton2015_res.pdf", label: "2015", external: true },
    ],
  },
  {
    label: "Bilder",
    toggle: "Bilder",
    dropdown: [
      { href: "https://photos.app.goo.gl/link2025", label: "2025", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2024", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2023", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2022", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2019", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2018", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2017", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2016", external: true },
      { href: "https://photos.app.goo.gl/link2023", label: "2015", external: true },
    ],
  },
  { href: "/overnatting", label: "Overnatting", toggle: "Overnatting" },
  { href: "/omoss", label: "Om oss", toggle: "OmOss" },
  { href: "/helgelandslopene", label: "Helgelandsløpene", toggle: "Helgelandslopene" },
  // isFeatureActive("signupHint") && { href: "/pamelding", label: "Påmelding" },
];
// .filter(Boolean); // Fjerner tomme elementer

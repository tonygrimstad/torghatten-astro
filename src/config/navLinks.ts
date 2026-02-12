// navLinks.ts

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
    label: "distances",
    toggle: "Distanser",
    dropdown: [
      { href: "distanser", label: "allDistances" },
      { href: "helmaraton", label: "fullMarathon" },
      { href: "halvmaraton", label: "halfMarathon" },
      { href: "oygaloppen", label: "islandRace10km" },
      { href: "minimaraton", label: "miniMarathon36km" },
      { href: "barnelop", label: "kidsRace" },
      { href: "paralop", label: "paraRace" },
      { href: "trim", label: "trim" },
    ],
  },
  // isFeatureActive("infoSection") && { href: "/informasjon", label: "Informasjon" },
  { href: "results", label: "results", toggle: "Resultater" },
  { href: "gallery", label: "gallery", toggle: "Øyeblikk" },

  { href: "overnatting", label: "accommodation", toggle: "Overnatting" },
  { href: "omoss", label: "about", toggle: "OmOss" },
  { href: "kontakt", label: "contact" },
  { href: "sponsors", label: "sponsors", toggle: "SponsorerMeny" },
  { href: "helgelandslopene", label: "helgelandRaces", toggle: "Helgelandslopene" },
];
// .filter(Boolean); // Fjerner tomme elementer

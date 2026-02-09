// Sponsor konfiguration

export interface Sponsor {
  name: string;
  logo: string; // filnavn i /public/images/sponsors/
  url: string;
  tier: 'premium' | 'gold' | 'silver' | 'partner';
  alt: string;
}

export const sponsors: Sponsor[] = [
  // Premium sponsorer (større visning)
  {
    name: 'Torghatten Aqua',
    logo: 'Torghatten-Aqua-hoyde-bla.png',
    url: 'https://www.torghatten-aqua.no/',
    tier: 'premium',
    alt: 'Torghatten Aqua logo'
  },
  {
    name: 'Sparebank 1 Helgeland',
    logo: 'sbh-web-blaa-png.png',
    url: 'https://www.sparebank1.no/nb/helgeland/',
    tier: 'premium',
    alt: 'Sparebank 1 Helgeland logo'
  },

  // Gull sponsorer
  {
    name: 'BR El',
    logo: 'logo-br-el-test2-1024x262-1.jpg',
    url: 'https://br-el.no/',
    tier: 'gold',
    alt: 'BR El logo'
  },
  {
    name: 'Sport 1',
    logo: 'Sport1logo.png',
    url: 'https://www.sport1.no/',
    tier: 'gold',
    alt: 'Sport 1 logo'
  },
  {
    name: 'REMA 1000',
    logo: 'REMA100-e1569352008712.png',
    url: 'https://rema.no/',
    tier: 'gold',
    alt: 'REMA 1000 logo'
  },

  // Silver sponsorer
  {
    name: 'Sinus Elproffen',
    logo: 'SINUS_ELPROFFEN-300x110-1.jpg',
    url: 'https://www.sinus247.no/sinus-bronnoysund',
    tier: 'silver',
    alt: 'Sinus Elproffen logo'
  },
  {
    name: 'Campus',
    logo: 'Logo-Campus-BLÅ14.7.21.png',
    url: 'https://campusbla.no/no/',
    tier: 'silver',
    alt: 'Campus logo'
  },
  {
    name: 'BRBB',
    logo: 'brbb.png',
    url: 'https://www.norgeshus.no/forhandlere/norgeshus-broennoey-bygg-bolig/om-oss',
    tier: 'silver',
    alt: 'BRBB logo'
  },
  {
    name: 'Bademiljo',
    logo: 'bademiljo_1-767x203.png',
    url: 'https://www.bademiljo.no/',
    tier: 'silver',
    alt: 'Bademiljo logo'
  },
  {
    name: 'Ferdigbetong',
    logo: 'ferdigbetong-300x109-1.jpg',
    url: 'https://www.ok-ferdigbetong.no/',
    tier: 'silver',
    alt: 'Ferdigbetong logo'
  },
  {
    name: 'Trucktek',
    logo: 'trucktek_logo-1-3-300x60-1.png',
    url: 'https://www.trucktek.no/',
    tier: 'silver',
    alt: 'Trucktek logo'
  },
  {
    name: 'Okovent',
    logo: 'Okovent-logo-300x81-1.png',
    url: 'https://okovent.com/',
    tier: 'silver',
    alt: 'Okovent logo'
  }
];

export const getSponsorsByTier = (tier: Sponsor['tier']) =>
  sponsors.filter(sponsor => sponsor.tier === tier);

export const getAllSponsors = () => sponsors;

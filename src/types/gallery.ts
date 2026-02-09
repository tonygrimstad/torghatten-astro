export interface Photographer {
  name: string;
  url?: string; // Valgfri link til fotograf (website/Instagram etc.)
}

export interface GalleryYear {
  year: number;
  photos: string[];
  photographers: Photographer[];
}

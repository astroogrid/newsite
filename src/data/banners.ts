
export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
}

import heroBannersData from './json/heroBanners.json';

export const heroBanners: Banner[] = heroBannersData as Banner[];

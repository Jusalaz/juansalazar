import { siTiktok, siInstagram } from "simple-icons";

export type SocialLink = {
  name: string;
  handle: string;
  url: string;
  path: string;
  hex: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: "TikTok",
    handle: "@juan.camilo.salazar",
    url: "https://www.tiktok.com/@juan.camilo.salazar",
    path: siTiktok.path,
    hex: `#${siTiktok.hex}`,
  },
  {
    name: "Instagram",
    handle: "@juansalazarcor",
    url: "https://www.instagram.com/juansalazarcor/",
    path: siInstagram.path,
    hex: `#${siInstagram.hex}`,
  },
];

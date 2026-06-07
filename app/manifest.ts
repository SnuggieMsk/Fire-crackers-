import type { MetadataRoute } from "next";
import { business, seo } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "Harsha FC",
    description: seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#06060f",
    theme_color: "#0a0a1f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

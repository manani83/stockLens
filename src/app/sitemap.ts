import type { MetadataRoute } from "next";
import { getAllEtfs } from "@/domain/etf/etfRepository";
import { getSiteUrl } from "@/lib/siteUrl";

const staticPaths = [
  { path: "/", priority: 1.0 },
  { path: "/compare", priority: 0.8 },
  { path: "/rankings", priority: 0.8 },
  { path: "/rankings/monthly-dividend-etfs", priority: 0.8 },
  { path: "/rankings/high-dividend-etfs", priority: 0.8 },
  { path: "/simulation", priority: 0.9 },
];

const comparePaths = [
  "/compare/schd-vs-jepi",
  "/compare/jepi-vs-jepq",
  "/compare/qqqi-vs-qyld",
  "/compare/schd-vs-qyld",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...getAllEtfs().map((etf) => ({
      url: `${siteUrl}/etf/${etf.ticker.toLowerCase()}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...comparePaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

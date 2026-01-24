import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile/", "/settings/"],
    },
    sitemap: "https://utilso.spdic.com/sitemap.xml",
  };
}

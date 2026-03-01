// next-sitemap.config.js
module.exports = {
  siteUrl: "https://primecapital.ng",
  generateRobotsTxt: true,
  changefreq: "weekly",
  sitemapSize: 7000,
  exclude: ["/admin", "/admin/*", "/auth/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/auth"] },
    ],
  },
};

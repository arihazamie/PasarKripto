import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/explorer", "/cryptocurrencies", "/trending", "/exchanges", "/bitcoin-halvings"],
            disallow: "/",
        },
        sitemap: "https://pasarkripto.vercel.app/sitemap.xml",
    }
}

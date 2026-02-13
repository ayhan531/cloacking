import { prisma } from "./lib/prisma";

async function main() {
    const site = await prisma.site.findUnique({
        where: { domain: "flovazcomercial.com" },
    });

    if (!site) {
        console.log("Site not found");
        return;
    }

    console.log("Site Name:", site.name);
    console.log("Domain:", site.domain);
    console.log("SEO Settings (parsed):", JSON.parse(site.seoSettings));

    const maskContent = JSON.parse(site.maskContent);
    console.log("Has Bot Article in Mask Content:", !!maskContent.botArticle);
    if (maskContent.botArticle) {
        console.log("Bot Article Length:", maskContent.botArticle.length);
        console.log("Bot Article Preview:", maskContent.botArticle.substring(0, 100) + "...");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

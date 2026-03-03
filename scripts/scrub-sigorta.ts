import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🧹 SCRUBBING 'SIGORTA' BRANDING FROM DATABASE...");

    const sites = await prisma.site.findMany();

    for (const site of sites) {
        let name = site.name;
        let siteName = name;
        let seoSettings = JSON.parse(site.seoSettings as string || "{}");
        let maskContent = JSON.parse(site.maskContent as string || "{}");

        const scrub = (str: string) => {
            if (!str) return str;
            return str
                .replace(/Flovaz Bonus Otoritesi/g, 'Flovaz Bonus Otoritesi')
                .replace(/Bonus/g, 'Bonus')
                .replace(/Flovaz Bonus/g, 'Flovaz Bonus Rehberi')
                .replace(/Mart 2026/g, 'Mart 2026');
        };

        const scrubbedName = scrub(name);
        if (name !== scrubbedName) {
            console.log(`✨ Scrubbed title for: ${site.domain}`);
        }

        // Deep scrub of JSON objects
        const deepScrub = (obj: any): any => {
            if (typeof obj === 'string') return scrub(obj);
            if (Array.isArray(obj)) return obj.map(deepScrub);
            if (typeof obj === 'object' && obj !== null) {
                const newObj: any = {};
                for (const key in obj) {
                    newObj[key] = deepScrub(obj[key]);
                }
                return newObj;
            }
            return obj;
        };

        await prisma.site.update({
            where: { id: site.id },
            data: {
                name: scrubbedName,
                seoSettings: JSON.stringify(deepScrub(seoSettings)),
                maskContent: JSON.stringify(deepScrub(maskContent)),
                updatedAt: new Date()
            }
        });
    }

    console.log("✅ Scrubbing complete. All sites are now Mart 2026 and Bonus-dedicated.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

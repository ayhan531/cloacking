import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import archiver from 'archiver';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const { id } = await params;
        const site = await prisma.site.findUnique({
            where: { id }
        });

        if (!site) {
            return NextResponse.json({ error: 'Site bulunamadı' }, { status: 404 });
        }

        // Parse configuration to JSON
        const siteConfig = {
            ...site,
            maskContent: JSON.parse(site.maskContent),
            bettingContent: JSON.parse(site.bettingContent),
            cloakingRules: JSON.parse(site.cloakingRules),
            seoSettings: JSON.parse(site.seoSettings),
        };

        // Create Zip using archiver
        const archive = archiver('zip', { zlib: { level: 9 } });

        // Use a PassThrough stream to pipe to NextResponse
        const stream = new Readable().wrap(archive as any);

        // Files to EXCLUDE from the ZIP
        const exclude = [
            'node_modules', '.next', '.git', 'out', 'prisma/dev.db',
            '.env', 'cloaking-platform-v1.zip', 'cloaking-platform-sql-v1.zip',
            'package-lock.json'
        ];

        // Add site-config.json to public folder in ZIP
        archive.append(JSON.stringify(siteConfig, null, 2), { name: 'public/site-config.json' });

        // Function to recursively add files
        const addDirectoryToArchive = (dirPath: string, archivePath: string = '') => {
            const files = fs.readdirSync(dirPath);
            for (const file of files) {
                const fullPath = path.join(dirPath, file);
                const relPath = path.join(archivePath, file);

                if (exclude.some(ex => relPath.startsWith(ex) || file === ex)) continue;

                if (fs.statSync(fullPath).isDirectory()) {
                    addDirectoryToArchive(fullPath, relPath);
                } else {
                    archive.file(fullPath, { name: relPath });
                }
            }
        };

        // Current working directory is the project root
        addDirectoryToArchive(process.cwd());

        archive.finalize();

        return new NextResponse(stream as any, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${site.domain}-export.zip"`,
            },
        });

    } catch (error) {
        console.error('Export Error:', error);
        return NextResponse.json({ error: 'Exporter hatası' }, { status: 500 });
    }
}

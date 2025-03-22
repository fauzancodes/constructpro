import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path: filePathArray } = await context.params;
    const filePath = path.join(process.cwd(), 'uploads', ...filePathArray);

    if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const mimeType = getMimeType(filePath);

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': mimeType || 'application/octet-stream',
            },
        });
    } else {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}

function getMimeType(filePath: string): string | undefined {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        default:
            return undefined;
    }
}

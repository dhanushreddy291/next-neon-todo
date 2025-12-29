import { neonAuth } from '@neondatabase/neon-js/auth/next/server';
import { NextResponse } from 'next/server';

export async function GET() {
    // Validate session on the server
    const { session, user } = await neonAuth();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return secure data
    return NextResponse.json({
        message: 'Secure data retrieved',
        user: user,
    });
}
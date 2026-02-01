import { auth } from '@/lib/auth/server';
import { NextResponse } from 'next/server';

export async function GET() {
    // Validate session on the server
    const { data } = await auth.getSession();
    if (!data?.session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return secure data
    return NextResponse.json({
        message: 'Secure data retrieved',
        user: data.user,
    });
}
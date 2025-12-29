import { neonAuth } from '@neondatabase/neon-js/auth/next/server';

export default async function ServerProfilePage() {
    const { session, user } = await neonAuth();

    return (
        <div className="mx-auto max-w-xl space-y-4 p-6">
            <h1 className="text-2xl font-bold">Server-Side Profile</h1>

            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
                <p>
                    <strong>Status:</strong> {session ? '✅ Authenticated' : '❌ Guest'}
                </p>
                {user && (
                    <p>
                        <strong>User ID:</strong> {user.id}
                    </p>
                )}
                {user && (
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                )}
            </div>

            <pre className="overflow-auto rounded bg-black p-4 text-xs text-white">
                {JSON.stringify({ session, user }, null, 2)}
            </pre>
        </div>
    );
}
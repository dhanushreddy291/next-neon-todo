'use client';

import { authClient } from '@/lib/auth/client';

export default function ClientProfilePage() {
    // The hook automatically updates if the session changes
    const { data, isPending, error } = authClient.useSession();

    if (isPending) return <div className="p-6">Loading session...</div>;

    return (
        <div className="mx-auto max-w-xl space-y-4 p-6">
            <h1 className="text-2xl font-bold">Client-Side Profile</h1>

            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
                <p>
                    <strong>Status:</strong> {data?.session ? '✅ Authenticated' : '❌ Guest'}
                </p>
                {data?.user && (
                    <p>
                        <strong>User ID:</strong> {data.user.id}
                    </p>
                )}
            </div>

            <pre className="overflow-auto rounded bg-black p-4 text-xs text-white">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
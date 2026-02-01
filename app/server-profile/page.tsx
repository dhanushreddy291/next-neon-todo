import { auth } from "@/lib/auth/server";

export default async function ServerProfilePage() {
    const { data } = await auth.getSession();

    return (
        <div className="mx-auto max-w-xl space-y-4 p-6">
            <h1 className="text-2xl font-bold">Server-Side Profile</h1>

            <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
                <p>
                    <strong>Status:</strong> {data?.session ? '✅ Authenticated' : '❌ Guest'}
                </p>
                {data?.user && (
                    <p>
                        <strong>User ID:</strong> {data.user.id}
                    </p>
                )}
                {data?.user && (
                    <p>
                        <strong>Email:</strong> {data.user.email}
                    </p>
                )}
            </div>

            <pre className="overflow-auto rounded bg-black p-4 text-xs text-white">
                {JSON.stringify({ session: data?.session, user: data?.user }, null, 2)}
            </pre>
        </div>
    );
}
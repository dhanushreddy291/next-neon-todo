import { authClient } from '@/lib/auth/client';
import { NeonAuthUIProvider, UserButton } from '@neondatabase/auth/react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NeonAuthUIProvider authClient={authClient} emailOTP social={{ providers:['google'] }}>
          <header className="flex h-16 items-center justify-between border-b p-4">
            <h1 className="text-xl font-bold">Next.js Neon Todo</h1>
            <UserButton size={'icon'} />
          </header>
          {children}
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
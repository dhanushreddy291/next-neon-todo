import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
    schema: './app/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    schemaFilter: ['public', 'neon_auth'],
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;
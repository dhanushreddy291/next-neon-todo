<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://neon.com/brand/neon-logo-dark-color.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://neon.com/brand/neon-logo-light-color.svg">
  <img width="250px" alt="Neon Logo fallback" src="https://neon.com/brand/neon-logo-dark-color.svg">
</picture>

### Next.js Todo App with Neon Auth & Drizzle ORM

A fully functional Next.js Todo application that demonstrates how to integrate **Neon Auth** for authentication and **Drizzle ORM** for database management.

---

This repository demonstrates how to build a modern web application using [**Next.js**](https://nextjs.org/), [**Neon Auth**](https://neon.com/docs/auth/overview), and [**Drizzle ORM**](https://orm.drizzle.team/).

By leveraging **Server Actions** in Next.js, we can securely handle authentication and database operations on the server side, providing a seamless and secure user experience.

Follow the full guide on [Neon: Getting started with Neon Auth and Next.js](https://neon.com/guides/neon-auth-nextjs) for a step-by-step walkthrough.

## ✨ Key features

-   **Next.js App Router**: Built with the latest Next.js features, including Server Components and Server Actions.
-   **Neon Auth**: Integrated authentication and session management powered by Neon.
-   **Drizzle ORM**: Type-safe database operations and schema management.
-   **Server Actions**: Secure server-side logic for database interactions, eliminating the need for separate API routes.
-   **Neon Auth UI**: Pre-built, customizable UI components for sign-in, sign-up, and account management.

## 🚀 Get started

### Prerequisites

Before you start, you'll need:

1.  A **[Neon account](https://console.neon.tech)**.
2.  **[Node.js](https://nodejs.org/)** (v18+) installed locally.

### Initial setup

Clone this repository and install the dependencies.

```bash
# Clone the repository
git clone https://github.com/dhanushreddy291/next-neon-todo.git
cd next-neon-todo

# Install dependencies
npm install
```

### Configure Neon

1.  Create a new project in the [Neon Console](https://console.neon.tech).
2.  Navigate to the **Neon Auth** tab and click **Enable**.
3.  Copy your **Auth Base URL** and **Database Connection String**.

### Configure environment variables

Create a `.env` file in the root directory.

```bash
cp .env.example .env
```

Update the `.env` file with your Neon project details. Update the following variables:

-  `DATABASE_URL`: Found in the Neon Console under **Dashboard -> Connect**.
    <p align="left">
      <img src="./images/connection_details.png" alt="Neon Connection Details" width="500"/>
    </p>
-  `NEON_AUTH_BASE_URL`: Found in the Neon Console under **Auth** tab.
    <p align="left">
      <img src="./images/neon-auth-base-url.png" alt="Neon Auth URL" width="500"/> 
    </p>

```env
DATABASE_URL="postgresql://[user]:[password]@[neon_hostname]/[dbname]?sslmode=require"
NEON_AUTH_BASE_URL="https://ep-xxx.neon.tech/neondb/auth"
NEON_AUTH_COOKIE_SECRET="your_random_cookie_secret" # Generate using `openssl rand -base64 32`
```

### Database setup

We use Drizzle ORM to manage the database schema.

```bash
# Generate the database migrations
npx drizzle-kit generate

# Apply the database migrations
npx drizzle-kit migrate
```

> This creates the `todos` table in your Neon database, linked to the `neon_auth` user table.

### Run the application

Start the development server.

```bash
npm run dev
```

Open `http://localhost:8080` to see the app. You will be redirected to the sign-in page. You can create a new account or sign in with an existing one.

<p align="center">
    <img src="./images/neon-auth-nextjs-todo-demo.png" alt="Next.js Todo App with Neon Auth & Drizzle ORM" width="600"/>
</p>

## ⚙️ How it works

This architecture relies on three core concepts working together:

1.  **Authentication**:
    The app uses `@neondatabase/auth` to handle authentication. The `NeonAuthUIProvider` in `app/layout.tsx` wraps the application, providing authentication context and UI components.

2.  **Server Actions**:
    Database operations are handled via Server Actions in `app/actions.ts`. These actions use `getSession()` to verify the user's session before performing any database queries.

    ```typescript
    // app/actions.ts
    export async function getTodos() {
      const { data } = await auth.getSession();
      if (!data?.user) throw new Error('Unauthorized');
      
      return db.select().from(todos).where(eq(todos.userId, data.user.id)).orderBy(desc(todos.createdAt));
    }
    ```

3.  **Database (Drizzle ORM)**:
    Drizzle ORM provides a type-safe way to interact with the Postgres database. The schema is defined in `app/db/schema.ts`, including relationships between the `todos` table and the `neon_auth` user table.

## 📚 Learn more

-   [Neon Guide: Getting started with Neon Auth and Next.js](https://neon.com/guides/neon-auth-nextjs)
-   [Neon Auth Overview](https://neon.com/docs/auth/overview)
-   [Drizzle ORM Documentation](https://orm.drizzle.team/)

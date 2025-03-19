This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Connecting to Prisma database using .env
To connect Prisma to your database, you need to configure environment variables in a .env file.

**1** Create or Update the .env File
In the root directory of your project, create a .env file if it does not already exist and add the following:

DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"

**2** Replace the Placeholder Values
USERNAME → Your PostgreSQL username
PASSWORD → Your PostgreSQL password
HOST → The database host (e.g., ep-weathered-resonance-ab4t4dbv-pooler.eu-west-2.aws.neon.tech)
PORT → The database port (default is 5432)
DATABASE_NAME → The name of your database

**3** Run Prisma Commands to Connect
After setting up the .env file, run the following commands to apply the changes:

npx prisma generate
npx prisma studio
This will open Prisma Studio, where you can view and manage database records.


## Adding a User to Prisma ##

**1** Adding a User via API Request
You can also create a new user by sending a request to your authentication API.

Example: Making a POST request to /api/auth/register

fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "newUser",
    name: "User Display Name",
    password: "securepassword"
  }),
})
  .then(res => res.json())
  .then(data => console.log("User added:", data))
  .catch(error => console.error("Error:", error));

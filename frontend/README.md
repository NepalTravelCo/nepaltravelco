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

This app is the `frontend/` workspace package inside a monorepo, so deploy that folder as the Vercel project root.

1. Create a new Vercel project from this repository.
2. Set the `Root Directory` to `frontend`.
3. Keep the build command as `npm run build`.
4. Add these environment variables in Vercel:
	- `DATABASE_URL`
	- `AUTH_SECRET`
	- `BACKEND_URL`
	- `NEXT_PUBLIC_BACKEND_URL`
5. Point `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` at your deployed Vercel backend service. The frontend will not function without that API.
6. Deploy and verify the admin and content pages that fetch from the backend.

The build now generates Prisma from `../backend/prisma/schema.prisma`, so Vercel can build the frontend without copying the schema into `frontend/`.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



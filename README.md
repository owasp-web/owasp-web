# OWASP Website

This is the official website for the Open Web Application Security Project (OWASP) Foundation, built with Next.js, React, and Tailwind CSS.

## Getting Started

### Admin subdomain (management-console.yourdomain.com)

To serve the admin portal on a dedicated subdomain and keep it hidden from the main site navigation, this app uses host-based routing via `middleware.ts`.

1) Set environment variable

Create `.env.local` with the admin host:

```bash
NEXT_PUBLIC_ADMIN_HOST=management-console.yourdomain.com
```

2) Configure DNS and Vercel

- Add the domain in Vercel Project Settings → Domains (e.g., `yourdomain.com`).
- Add a subdomain `management-console.yourdomain.com` in the same Domains page.
- Point DNS:
  - If Vercel DNS: add the subdomain directly in Vercel.
  - If external DNS: create a CNAME record for `management-console` → `cname.vercel-dns.com` as instructed in Vercel.

3) Behavior

- Visiting `https://management-console.yourdomain.com/` rewrites to `/admin`.
- Visiting `/admin` on the main host redirects to the admin subdomain.
- Static assets and API routes are untouched.

4) Optional: block indexing

Ensure your `robots.txt` disallows the admin host. If you generate host-specific robots, add a rule for `management-console.yourdomain.com`. Alternatively, configure a meta `robots` tag on admin layouts.

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## Project Structure

```
OWASP/
├── public/          # Static files
├── src/
│   ├── app/         # App router pages
│   ├── components/  # React components
│   └── lib/         # Utility functions
├── next.config.ts   # Next.js configuration
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Supabase migration helpers

Scripts to migrate from one Supabase project to another are provided:

- Database: `scripts/migrate-supabase-db.sh`
- Storage: `scripts/migrate-supabase-storage.ts`

Fill environment variables as indicated in the scripts before running them.

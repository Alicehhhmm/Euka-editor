# Environment

## 1.Cloud Dev Frameworks

| Framework | Description | Website                       |
| --------- | ----------- | ----------------------------- |
| Clerk     | Auth JWT    | [Clerk](https://clerk.com/)   |
| Convex    | back end    | [Convex](https://convex.dev/) |
| Vercel    | CI/CD       | [Vercel](https://vercel.com/) |

## 2. local env configuration

-   **`.env.local`** : Configure the keys required for the above cloud development locally

```sh
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# JWT: clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=
```

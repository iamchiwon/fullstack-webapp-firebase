# Fullstack WebApp Example

Next.js App on Firebase

- Next.js
  - [ ] frontend
  - [ ] backend API
- With Firebase:
  - [ ] Use database
  - [ ] Use storage
  - [ ] Use function
  - [ ] Use authentication
  - [ ] Resources belong to user

## Steps

1. create next.js app

```bash
$ npx create-next-app@latest
```

### 2. Use backend API in Next.js

`/src/app/api/hello/route.ts`

```ts
export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js!" });
}
```

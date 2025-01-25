# Fullstack WebApp Example

Next.js App on Firebase

- Next.js
  - [x] frontend
  - [x] backend API
- With Firebase:
  - [x] Use database
  - [x] Use storage
  - ~~[ ] Use function~~
  - [x] Use authentication
  - [x] Resources belong to user

## Next Architecture

#### Frontend

- web client
- use hook or handlers
- call Controllers

#### Controller

- `client component`
- access global state
- call Services
- handle response from Service

#### Services

- `server component`
- call server actions
- handle exceptions (from actions)
- convert result as response JSON

```ts
type Response<T> =
  | {
      result: "success";
      data: T;
    }
  | {
      result: "error";
      message: string;
    };
```

#### Actions

- access environments
- backend logic
- throw exceptions

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

### 3. Add firebase admin config environment

- set FIREBASEADMIN_CONFIG in `.env`
- set firebaseadmin_config in `apphosting.yaml`

```shell
firebase apphosting:secrets:set firebaseadmin_config --project [project_id]
```

### 4. Add database

- Frontend (Next.js)
  1. handle function
  2. Contoller function
- Backend (Action)
  1. TodoAction
  2. backend infra (firestore)

```ts
// page.tsx
const fetchTodoList = async () => {
  const todos = await TodoController.getTodoList();
  setTodoList(todos);
};

// ToDoController.ts
const getTodoList = async () => {
  return await getTodoListAction();
};

// TodoActions.ts
("use server");
export const getTodoListAction = async () => {
  const todos = await databaseGetList("todos");
  return todos.map(mapToToItem);
};

// infra/batabase.ts
export const databaseGetList = async (ref: string) => {
  const collection = db.collection(ref);
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
```

### 5. Add storage

```ts
export const storageUploadFile = async (path: string, file: File) => {
  const storage = await getStorage();
  const bucket = storage.bucket();
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  const blob = bucket.file(`${path}/${file.name}`);
  await blob.save(fileBuffer, { public: true });
  const url = await getDownloadURL(blob);
  return url;
};
```

### 6. Add authentication

- use Firebase Auth REST API ([Reference](https://firebase.google.com/docs/reference/rest/auth))
- signup : signUp then update profile
- signin : signIn then lookup profile

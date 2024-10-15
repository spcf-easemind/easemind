# JUNO CHEAT SHEET

> **Important:** Must install wsl if using windows OS to run the project properly.

Here is the installation guide on installing WSL2 on windows: [WSL2 Installation Guide](https://www.linkedin.com/pulse/step-procedure-install-wsl2-windows-run-ubuntu-using-arun-kl)

### USEFUL COMMANDS

```
npm i
npm ci
sudo npm i -g @junobuild/cli
npm run build
sudo juno dev start
npm run dev
sudo juno dev stop
sudo juno whoami
```

> **Note:** use **_sudo_** if your ubunto account doesn't have super admin permissions. You must have docker installed in your ubuntu to run the **_sudo juno dev start_**.

Link for docker installation guide in ubuntu: [Docker Installation Guide](https://docs.docker.com/engine/install/ubuntu/)

## CONFIGURING JUNO LOCAL DEVELOPMENT DATABASE

> Open the file name **_juno.dev.config.mjs_** on the root directory of your project.

```typescript
satellite: {
    collections: {
      datastore: [
        // Add another object inside the datastore array
        {
          collection: 'testDataset',
          read: 'managed',
          write: 'managed',
          memory: 'heap',
          mutablePermissions: true,
        },
      ],
      storage: [
        // Add another object inside the storage array
        {
          collection: 'testStorage',
          read: 'managed',
          write: 'managed',
          memory: 'heap',
          mutablePermission: true,
        },
      ],
    },
    controllers: [
      {
        // To get the your terminal id, run the command "juno whoami"

        // Copy and paste the controller id here.
        id: 'comzm-mod5y-zekdz-eebxq-g6bzi-l2yrr-kpqyh-7ofqe-s3vlq-ycnts-cae',
        scope: 'admin',
      },
    ],
  },
```

---

## JUNO AUTHENTICATION

### Sign-in

> You can authorize an existing or new user with the identity provider using **_signIn_**.

```typescript
import { signIn } from '@junobuild/core';

await signIn();
```

OR

```typescript
import { signIn } from '@junobuild/core';
import { Button } from './Button';

export const Login = () => {
  const signInOptions = {
    windowed: true,
    maxTimeToLive: BigInt(4 * 60 * 60 * 1000 * 1000 * 1000),
    allowPin: false,
  };

  const handleSignIn = () => {
    signIn(signInOptions).catch((error) => {
      console.error('Sign-in failed:', error);
    });
  };

  return <Button onClick={handleSignIn}>Sign in</Button>;
};
```

**The sign-in feature offers customization options for authentication:**

- **maxTimeToLive:** Specifies the duration for the session (defaults to 4 hours, represented as **_BigInt(4 _ 60 _ 60 _ 1000 _ 1000 _ 1000))\***. It's important to note that this duration remains constant, whether the users are active or inactive.
- **windowed:** By default, the authentication flow is presented in a popup window on desktop that is automatically centered on the browser. This behavior can be turned off by setting the option to **_false_**, causing the authentication flow to happen in a separate tab instead.
- **derivationOrigin:** The main domain to be used to ensure your users are identified with the same public ID, regardless of which of your satellite’s URLs they use to access your application.
- **allowPin:** We consider the specific PIN authentication method of **Internet Identity** as "insecure" because users can easily lose their login information if they do not register a passphrase, particularly as Safari clears the browser cache every two weeks in cases of inactivity. This is why we disable it by default.

### Sign-out

> You can end a user's session by logging them out.

```typescript
import { signOut } from '@junobuild/core';

await signOut();
```

> **Note:** This will clear the sign-in information stored in IndexedDB.

### Subscription

> You can subscribe to the user state (signed-in or out) by using the subscriber function. This function provides a technical user and will trigger whenever the user's state changes.

```typescript
import { authSubscribe } from '@junobuild/core';

authSubscribe((user: User | null) => {
  console.log('User:', user);
});
```

If you register the subscriber at the top of your application, it will propagate the user's state accordingly (e.g. **_null_** when a new user opens the app, the new user's entry when they sign in, the existing user when they refresh the browser within the valid duration, and **_null_** again when they sign out).

> Subscribing returns a callback that can be executed to unsubscribe:

```typescript
import { authSubscribe } from '@junobuild/core';

const unsubscribe = authSubscribe((user: User | null) => {
  console.log('User:', user);
});

// Above subscriber ends now
unsubscribe();
```

---

## JUNO DATABASE QUERIES

> To add a document, use the setDoc function:

### Add a document

```typescript
import { setDoc } from '@junobuild/core';
import { nanoid } from 'nanoid';

const key = nanoid();

await setDoc({
  collection: 'my_collection_key',
  doc: {
    key,
    data: myExample,
  },
});
```

> **Note:** The **_key_** can be any **_string_**, but it's recommended to generate IDs using the ==nanoid library.

---

### Get a document

> To retrieve data, use the **_getDoc_** function and provide the **_collection_** and the **_key_** of the document:

```typescript
import { getDoc } from '@junobuild/core';

const myDoc = await getDoc({
  collection: 'my_collection_key',
  key: myId,
});
```

---

### Get multiple documents

> Obtaining multiple documents at once can improve performance compared to making multiple individual **_getDoc_** calls depending on the use case. You can achieve this by using the **_getManyDocs_** function:

```typescript
import { getManyDocs } from '@junobuild/core';

const docPair1 = {
  collection: 'my_collection',
  key: 'my_document_key_1',
};

const docPair2 = {
  collection: 'my_other_collection',
  key: 'my_document_key_2',
};

const docs = await getManyDocs({ docs: [docPair1, docPair2] });
```

---

### Update a document

> To update a document, use the **_setDoc_** function with its current version to validate that the most recent entry is being updated:

```typescript
import { setDoc } from '@junobuild/core';

await setDoc({
  collection: 'my_collection_key',
  doc: {
    key: myId,
    data: myExample,
    version: 3n,
  },
});
```

> **Note:** The **_version_** must match the current version of the last document within the satellite; otherwise, the call will fail. This prevents unexpected concurrent overwrites, which is useful, for example, if your users use your projects simultaneously on multiple devices.

---

### Set multiple documents

> You might need to set multiple documents, whether within the same collection or across collections, all at once in an atomic manner. This ensures that if any of the creations or deletions fail, the entire batch will be automatically reverted. You can achieve this using the **_setManyDocs_** function:

```typescript
import { setManyDocs } from '@junobuild/core';

const update1 = {
  collection: 'my_collection',
  doc: {
    key: 'my_document_key_1',
    data: {
      hello: 'world',
    },
  },
};

const update2 = {
  collection: 'my_other_collection',
  doc: {
    key: 'my_document_key_2',
    data: {
      count: 123,
    },
  },
};

const docs = await setManyDocs({ docs: [update1, update2] });
```

---

### List documents

> The **_listDocs_** function is used to retrieve documents from a specified collection.

```typescript
import { listDocs } from '@junobuild/core';

const myList = await listDocs({
  collection: 'my_collection_key',
});
```

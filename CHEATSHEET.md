# JUNO CHEET SHEET

### USEFUL COMMANDS

```
npm i
npm ci
juno dev start
npm run dev
juno dev stop
juno whoami
```

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

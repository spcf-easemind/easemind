# Basic Usage

```javascript
import { useUsersStore } from "../store/users.js";

const user = useUsersStore((state) => state.user);

console.log(user);
```

# UseShallow

Used for situations like calling multiple variables and instances from a single store.

```javascript
import { useShallow } from "zustand/shallow";
import { useUsersStore } from "../store/users.js";

const { user, storeFn } = useUsersStore(
  useShallow((state) => ({ user: state.user, storeFn: state.storeUser }))
);

function handleSubmit(formData) {
  storeFn(formData);
}
```

# Store Configuration

```javascript
import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  user: null,

  storeUser: async (formData) => {
    const key = nanoid();
    const response = await setDoc({
      collection: 'userCredentials',
      doc: {
        key,
        data: {
          text: formData,
        },
      },
    });
    console.log(response);
  },

  getUserInfo: async () => {
    const { items } = await listDocs({
      collection: 'userCredentials',
    });
    console.log(items);
     set(() => ({
      user: items
    }));
  },
}));
```

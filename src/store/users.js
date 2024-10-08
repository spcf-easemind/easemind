import { create } from 'zustand';
import { setDoc, uploadFile, listDocs } from '@junobuild/core';
import { nanoid } from 'nanoid';

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

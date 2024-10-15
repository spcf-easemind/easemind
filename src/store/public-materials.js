import { create } from 'zustand';
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
} from '@junobuild/core';
import { nanoid } from 'nanoid';

export const usePublicMaterials = create((set) => ({
  data: null,
  message: null,
  loading: false,

  createPublicMaterials: async (fetchedData, file) => {
    set(() => ({ loading: true }));

    try {
      if (!fetchedData || !fetchedData.userCredentails) {
        if (
          fetchedData.role === 'super-admin' ||
          fetchedData.role === 'volunteer'
        ) {
          const userData = fetchedData.user.data;
          const userKey = fetchedData.userCredentials.key;
          const userVersion = fetchedData.userCredentials.version;

          if (file) {
            const filename = `${userKey}-profile`;
            const { downloadUrl } = await uploadFile({
              collection: 'userProfilePicture',
              data: file,
              filename,
            });
            materialImageUrl = downloadUrl;
          } else {
            materialImageUrl = null;
          }

          const testObject = {
            owner: userData,
            title: 'test-material',
            content: '',
            categories: '',
          };
        }
      }
    } catch (error) {}
  },
}));

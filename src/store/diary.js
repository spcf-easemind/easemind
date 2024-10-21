import { create } from "zustand";
import {
  setDoc,
  getDoc,
  listDocs,
  deleteDoc,
  uploadFile,
  listAssets,
  deleteAsset,
} from "@junobuild/core";
import { nanoid } from "nanoid";

export const useDiariesStore = create((set) => ({
  diaryData: null,
  diaryMessage: null,
  diaryLoading: false,

  createThoughts: async (formData, files) => {
    set(() => ({
      diaryData: null,
      diaryMessage: "Loading...",
      diaryLoading: true,
    }));

    try {
      let thoughtDiaryImages = [];
      const key = nanoid();

      if (files) {
        for (const file of files) {
          const filename = `${key}-thoughts-${file.name}`;
          const { downloadUrl, fullPath } = await uploadFile({
            collection: "userDiaryImages",
            data: file,
            filename,
          });
          const data = {
            thoughtDiaryFullPath: fullPath,
            thoughtDiaryImagePath: downloadUrl,
            fileName: filename,
          };
          thoughtDiaryImages.push(data);
        }
      }

      if (formData) {
        const userDiary = await getDoc({
          collection: "userDiaries",
          key: formData.userKey,
        });

        if (userDiary) {
          const currentDate = new Date();
          const thoughtDiaryData = {
            key,
            title: formData.thoughtDiaryInfo.title,
            description: formData.thoughtDiaryInfo.description,
            date: currentDate,
            thoughtDiaryImages,
          };

          userDiary.data.thoughts.push(thoughtDiaryData);

          await setDoc({
            collection: "userDiaries",
            doc: {
              key: userDiary.key,
              data: userDiary.data,
              version: userDiary.version,
            },
          });
        }
      }

      set(() => ({
        diaryData: null,
        diaryMessage: "User thought diary created successfully!",
        diaryLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error creating user thought diary:", error);
      set(() => ({
        diaryData: null,
        diaryMessage:
          error.message ||
          "An error occurred while creating user thought diary",
        diaryLoading: false,
      }));
      return false;
    }
  },

  getAllUserThoughtDiaries: async (formData) => {
    set(() => ({
      diaryData: null,
      diaryMessage: "Loading...",
      diaryLoading: true,
    }));

    try {
      const userDiary = await getDoc({
        collection: "userDiaries",
        key: formData.userKey,
      });

      set(() => ({
        diaryData: userDiary.data.thoughts,
        diaryMessage: "Loaded",
        diaryLoading: false,
      }));
      return true;
    } catch (error) {
      console.error("Error getting user thought diary:", error);
      set(() => ({
        diaryData: null,
        diaryMessage:
          error.message || "An error occurred while getting user thought diary",
        diaryLoading: false,
      }));
      return false;
    }
  },

  getUserThoughtDiary: async (formData) => {
    set(() => ({
      diaryData: null,
      diaryMessage: "Loading...",
      diaryLoading: true,
    }));

    try {
      const userDiary = await getDoc({
        collection: "userDiaries",
        key: formData.userKey,
      });

      // console.log(userDiary);

      for (const thought of userDiary.data.thoughts) {
        if (thought.key === formData.thoughtKey) {
          set(() => ({
            diaryData: thought,
            diaryMessage: "Loaded",
            diaryLoading: false,
          }));
          return true;
        }
      }

      set(() => ({
        diaryData: null,
        diaryMessage: "User thought diary not found!",
        diaryLoading: false,
      }));
      return false;
    } catch (error) {
      console.error("Error getting user thought diary:", error);
      set(() => ({
        diaryData: null,
        diaryMessage:
          error.message || "An error occurred while getting user thought diary",
        diaryLoading: false,
      }));
      return false;
    }
  },

  deleteUserThoughtDiary: async (formData) => {
    set(() => ({
      diaryData: null,
      diaryMessage: "Loading...",
      diaryLoading: true,
    }));

    try {
      const userDiary = await getDoc({
        collection: "userDiaries",
        key: formData.userKey,
      });

      if (userDiary) {
        set(() => ({
          diaryData: null,
          diaryMessage: "User thought diary deleted successfully!",
          diaryLoading: false,
        }));
        return true;
      } else {
        set(() => ({
          diaryData: null,
          diaryMessage: "User thought diary not found!",
          diaryLoading: false,
        }));
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error deleting user thought diary:", error);
      set(() => ({
        diaryData: null,
        diaryMessage:
          error.message ||
          "An error occurred while deleting user thought diary",
        diaryLoading: false,
      }));
      return false;
    }
  },
}));

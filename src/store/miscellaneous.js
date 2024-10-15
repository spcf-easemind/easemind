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

  // This is all for Categories related purposes
  createCategories: async () => {
    set(() => ({ loading: true }));

    try {
      const thoughtCategories = [
        'Negative Self-Talk',
        'Catastrophizing',
        'Desire for Change',
        'Seeking Validation',
        'Fear of Judgement',
        'Feeling Trapped',
        'Questioning Reality',
        'Fear of Failure',
        'Feeling Unworthy',
        'Questioning Reality',
        'Self-Sabotage',
        'Lack of Purpose',
        'Victim Mentality',
        'Fear of Intimacy',
        'Inability to Move On',
        'Fear of Rejection',
        'Decision Avoidance',
        'Comparisons',
        'Ruminating',
        'Existential Questions',
        'Distrust of Others',
      ];

      const emotionCategories = [
        'Sadness',
        'Anxiety',
        'Depression',
        'Loneliness',
        'Confusion',
        'Frustration',
        'Anger',
        'Overthinking',
        'Fear',
        'Guilt',
        'Shame',
        'Hopelessness',
        'Fatigue',
        'Numbness',
        'Despair',
        'Regret',
        'Desperation',
        'Insecurity',
        'Self-Doubt',
        'Disappointment',
        'Panic',
        'Boredom',
        'Vulnerability',
        'Future Anxiety',
        'Jealousy',
        'Disgust',
        'Embarrassment',
        'Longing',
      ];

      const memberCategories = ['Ease Companion', 'Ease Buddy'];

      for (const category of thoughtCategories) {
        const key = nanoid();
        await setDoc({
          collection: 'thoughtCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'thoughts',
              name: 'category',
            },
          },
        });
        console.log(`Category ${category} created successfully!`);
      }

      for (const category of emotionCategories) {
        const key = nanoid();

        await setDoc({
          collection: 'emotionCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'emotions',
              name: category,
            },
          },
        });
        console.log(`Category ${category} created successfully!`);
      }

      for (const category of memberCategories) {
        await setDoc({
          collection: 'memberCategories',
          doc: {
            key,
            data: {
              name: category,
            },
          },
        });

        await setDoc({
          collection: 'categories',
          doc: {
            key,
            data: {
              key,
              category: 'members',
              name: category,
            },
          },
        });

        console.log(`Category ${category} created successfully!`);
      }
      set(() => ({ loading: false }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
      return false
    }
  },
  getAllCategories: async () => {
    set(() => ({ loading: true }));
    try {
      const categories = await listDocs({
        collection: 'categories',
      });

      const thoughtCategories = await listDocs({
        collection: 'thoughtCategories',
      });

      const emotionCategories = await listDocs({
        collection: 'emotionCategories',
      });

      const memberCategories = await listDocs({
        collection: 'memberCategories',
      });

      const categoriesArray = [];
      const thoughtCategoriesArray = [];
      const emotionCategoriesArray = [];
      const memberCategoriesArray = [];

      for (const category of categories.items) {
        categoriesArray.push(category);
      }
      for (const thoughtCategory of thoughtCategories.items) {
        thoughtCategoriesArray.push(thoughtCategory);
      }
      for (const emotionCategory of emotionCategories.items) {
        emotionCategoriesArray.push(emotionCategory);
      }
      for (const memberCategory of memberCategories.items) {
        memberCategoriesArray.push(memberCategory);
      }
      
      const allCategoryInfo = {
        categories: categoriesArray,
        thoughtCategory: thoughtCategoriesArray,
        emotionCategory: emotionCategoriesArray,
        memberCategory: memberCategoriesArray,
      };

      set(() => ({
        data: allCategoryInfo,
        message: 'All users fetched successfully!',
        loading: false
      }));

      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
      return false;
    }
  },
  deleteCategories: async () => {
    set(() => ({ loading: true }));

    try {
      //Deleting Categories Related
      const categories = await listDocs({
        collection: 'categories',
      });

      const thoughtCategories = await listDocs({
        collection: 'thoughtCategories',
      });

      const emotionCategories = await listDocs({
        collection: 'emotionCategories',
      });

      const memberCategories = await listDocs({
        collection: 'memberCategories',
      });

      if (categories) {
        for (const category of categories.items) {
          await deleteDoc({
            collection: 'categories',
            doc: category,
          });

          console.log(
            `Category ${category} on categories deleted successfully!`
          );
        }
      }

      if (thoughtCategories) {
        for (const thoughtCategory of thoughtCategories.items) {
          await deleteDoc({
            collection: 'thoughtCategories',
            doc: thoughtCategory,
          });

          console.log(
            `Category ${thoughtCategory} on thoughtCategories deleted successfully!`
          );
        }
      }

      if (emotionCategories) {
        for (const emotionCategory of emotionCategories.items) {
          await deleteDoc({
            collection: 'emotionCategories',
            doc: emotionCategory,
          });

          console.log(
            `Category ${emotionCategory} on thoughtCategories deleted successfully!`
          );
        }
      }

      if (emotionCategories) {
        for (const memberCategory of memberCategories.items) {
          await deleteDoc({
            collection: 'memberCategories',
            doc: memberCategory,
          });

          console.log(
            `Category ${memberCategory} on thoughtCategories deleted successfully!`
          );
        }
      }
      set(() => ({
        data: null,
        message: "All Categories Deleted Successfully!", 
        loading: false 
      }));
      return true;
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
      return false;
    }
  },

  // This is all for Anonymous Profile purposes
  createAnonymousNickames: async () => {
    set(() => ({ loading: true }));
    try {
      const publicAnonymousNicknames = ['', '', '', '', '', '', '', '', '', ''];

      for (const publicAnonymousNickname of publicAnonymousNicknames.items) {
        const key = nanoid();
        await setDoc({
          collection: 'publicAnonymousNicknames',
          doc: {
            key,
            doc: {
              nickname: publicAnonymousNickname,
            },
          },
        });
      }
      set(() => ({ loading: false }));
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
    }
  },

  createAnonymousProfile: async (file) => {
    set(() => ({ loading: true }));

    try {
      if (file) {
        const filename = `${userKey}-profile`;
        await uploadFile({
          collection: 'userProfilePicture',
          data: file,
          filename,
        });
        console.log(`User pOr
            `);
      }
      set(() => ({ loading: false }));
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
    }
  },

  deleteAnonymous: async () => {
    set(() => ({ loading: true }));

    try {
      const publicAnonymousNicknames = await listDocs({
        collection: 'publicAnonymousNicknames',
      });

      const publicAnonymousProfiles = await listAssets({
        collection: 'publicAnonymousNicknames',
      });

      if (publicAnonymousNicknames) {
        for (const publicAnonymousNickname of publicAnonymousNicknames.items) {
          await deleteDoc({
            collection: 'publicAnonymousNicknames',
            doc: publicAnonymousNickname,
          });
          console.log(
            `Anonymous ${publicAnonymousNickname} on anonymousNicnames deleted successfully!`
          );
        }
      }

      if (publicAnonymousProfiles) {
        for (const publicAnonymousProfile of publicAnonymousProfiles.items) {
          await deleteDoc({
            collection: 'publicAnonymousProfiles',
            doc: publicAnonymousProfile,
          });
          console.log(
            `Anonymous ${publicAnonymousProfile} on anonymousNicnames deleted successfully!`
          );
        }
      }
      set(() => ({ loading: false }));
    } catch (error) {
      console.error('Error during creating categories:', error);
      set({ message: error.message, data: null });
      // Loading is False
      set(() => ({ loading: false }));
    }
  },

  
}));
